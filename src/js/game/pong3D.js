import {poke} from '../pokemons/pokemon.js';
import {xaxis, yaxis, zaxis} from '../axis.js';
import {stadium, public1, public2} from '../decor/stadium.js';
import {desert} from '../decor/desert.js';
import {sky} from '../decor/sky.js';
import {walls} from './gamewalls.js';
import {two_players, p1, p2, showMenu, menu_loop, show_fps, show_dev_menu, terrain, sound_volume} from '../menu/menu.js';

var container, w, h, scene, camera, controls, renderer, stats, geometry, material, loader, texture, ball;
var ballGeometry, ballTexture, ballsize;
var playerGeometry, playerMaterial, p1size, p2size, p1movestep = 0.3, p2movestep = 0.3;
var loop = {};
var gui;
var params = {// parameters for dat.GUI UI
    axis_visible : false,
    reset : function(){
      score_p1 = 0;
      score_p2 = 0;
      resetBall();
      resetPlayers();
      setScore(1,score_p1);
      setScore(2,score_p2);
    },
    changeSpeed: true,
    camera_control: false
};
var sphere, player1, player2;
var ball_lateral_speed = 0.0, ball_height_speed = 0.0, ball_speed = 0.1, ball_actual_speed, speed = true; // Ball speed
var down = true; // Ball goes down
var boundingBox;

var poke_player1 = p1, poke_player2 = p2;
var p1_use_power = false, p2_use_power = false, cooldownp1 = 0, cooldownp2 = 0, p1_incooldown = false, p2_incooldown = false, timerp1 = 0, timerp2 = 0;
var collisionp1 = false;
var player1_shield_health = 1, player2_shield_health = 1, shield_p1, shield_p2;
var ball_ready = true;

var scoreGeometry, scoreTexture, scoreMaterial, scoreObjectP1, scoreObjectP2, back_scorep1, back_scorep2;
var score_p1 = 0, score_p2 = 0;

var shadow, shadowp1, shadowp2;
var public_up = 1, public_up_finished = false, public_up_step = 0.02;

var multiPlayers = params.multi_players;
var player_invincible = false;
var game_ready = false;

var keyboard = new THREEx.KeyboardState();

var camera_angle = 0;
var mySound, gameSound = new Audio("src/medias/sounds/pokemon1g-wild-battle.mp3"), n_music = 2, music_changed = true;

var pause = false, node_id, selected_id, big = true, angle = 0, size = 1;

var oldTerrain = 'sky', newTerrain = terrain;

var help_buttons = true;

var ia_left = false, ia_right = false, ia_up = false, ia_down = false;

var bool_decompte = false, n_decompte = 3, decompte_timer = 0, bipSound;

window.addEventListener('load', go);
window.addEventListener('resize', resize);

function go() {
  init();
  gameLoop();
}

function init(){
  THREE.Object3D.DefaultUp.set(0.0, 0.0, 1.0);

  container = document.querySelector('#SIApp');
  w = container.clientWidth;
  h = container.clientHeight;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(60, w/h, 1, 200);
  camera.position.set(0, 30, 5);

  controls = new THREE.TrackballControls(camera, container);
  controls.target = new THREE.Vector3(0, 0, 0.75);
  controls.panSpeed = 0.4;
  controls.enabled = false;

  const renderConfig = {antialias: true, alpha: true, powerPreference: "high-performance"};
  renderer = new THREE.WebGLRenderer(renderConfig);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(w, h);
  renderer.sortObjects = false;
  container.appendChild(renderer.domElement);

  // Pokeball texture
  loader = new THREE.TextureLoader();
  ballTexture = loader.load('src/medias/textures/Texture_pokeball.png');

  keyUpEvents();
  powerEvents();
  pauseEvent();
  drawTerrain(oldTerrain);
  drawGame();
  showGUI();
  document.getElementById("dev_menu").style.visibility = "hidden";
  showStats();
  createInterface();
  document.getElementById("player1_help").style.visibility = "hidden";
  document.getElementById("player2_help").style.visibility = "hidden";

  // Get the size of the players and the ball
  boundingBox = new THREE.Box3().setFromObject(player1);
  p1size = boundingBox.getSize();
  boundingBox = new THREE.Box3().setFromObject(player2);
  p2size = boundingBox.getSize();
  boundingBox = new THREE.Box3().setFromObject(sphere);
  ballsize = boundingBox.getSize();

  const fps  = 60;
  const slow = 1; // slow motion! 1: normal speed, 2: half speed...
  loop.dt       = 0,
  loop.now      = timestamp();
  loop.last     = loop.now;
  loop.fps      = fps;
  loop.step     = 1/loop.fps;
  loop.slow     = slow;
  loop.slowStep = loop.slow * loop.step;
}

function gameLoop(){
  loop.now = timestamp(); // gestion de l'incrément du temps
  loop.dt = loop.dt + Math.min(1, (loop.now - loop.last) / 1000);
  while(loop.dt > loop.slowStep) {
    params.multi_players = two_players;
    multiPlayers = params.multi_players;
    if(menu){
      menu_loop(loop.step);
      cameraAnimation(loop.step);
      newTerrain = terrain;
      if(oldTerrain != newTerrain){
        changeTerrain();
      }
    }
    if(!menu && !game_ready){
        prepare_game();
    }
    if(!menu){
      if(show_fps){
        stats.update();
      }
    }
    loop.dt = loop.dt - loop.slowStep;
    update(loop.step); // déplace les objets d'une fraction de seconde
    if(!menu && !pause && !bool_decompte){
      updateCooldowns();
    }
  }
  renderer.render(scene, camera);  // rendu de la scène
  loop.last = loop.now;
  requestAnimationFrame(gameLoop); // relance la boucle du jeu
  controls.update();
}

function update(step) {
  if(sphere != undefined){
    if(pause){
      pauseSelected(selected_id);
      animatePause(node_id, step);
    }
    if(!menu && bool_decompte){
      document.getElementById("game_message").style.visibility = "visible";
      if(decompte_timer >= loop.step*loop.fps*1){
        decompte(n_decompte);
        decompte_timer = 0;
      }
      decompte_timer += step;
    }
    if(!menu && !pause && !bool_decompte){
      const angleIncr = Math.PI * 2 * step / 3 ; // une rotation complète en 3 secondes
      sphere.rotateY(angleIncr);
      movePlayers();
      stop_movePlayers();
      collision();
      if(down){
        sphere.position.y += ball_speed;
      }
      else{
        sphere.position.y -= ball_speed;
      }
      sphere.position.x += ball_lateral_speed;
      sphere.position.z += ball_height_speed;
      if(!multiPlayers){
        IA();
        moveIA();
      }
      else p2movestep = 0.3;
      ballReady();
      updateShadow();
      if(terrain == 'stadium'){
        animatePublic();
      }
    }
    changeMusic();
  }
}

function resize(){
  w = container.clientWidth;
  h = container.clientHeight;
  camera.aspect = w/h;
  camera.updateProjectionMatrix();
  renderer.setSize(w, h);
}

function changeMusic(){
  gameSound.addEventListener("ended", function(){
    music_changed = false;
  });
  if(n_music == 1 && !music_changed){
    music_changed = true;
    n_music = 2;
    gameSound = new Audio("src/medias/sounds/pokemon1g-gym-battle.mp3");
    gameSound.volume = sound_volume/10.0;
    gameSound.play();
  }
  else if(n_music == 2 && !music_changed){
    music_changed = true;
    n_music = 1;
    gameSound = new Audio("src/medias/sounds/pokemon1g-wild-battle.mp3");
    gameSound.volume = sound_volume/10.0;
    gameSound.play();
  }
}

function cameraAnimation(step){
  if(menu){
    camera_angle += (Math.PI * 2  * step) / 15;
    camera.position.set(Math.cos(camera_angle)*18,Math.sin(camera_angle)*18,8);
  }
}

function createInterface(){
  let newDiv;
  newDiv = document.createElement("div");
  newDiv.id = "p1_poke";
  newDiv.style.width = "100px";
  newDiv.style.height = "100px";
  newDiv.style.backgroundSize = "100px";
  newDiv.style.backgroundRepeat = "no-repeat";
  newDiv.style.position = "absolute";
  newDiv.style.marginBottom = "0";
  newDiv.style.marginTop = "auto";
  newDiv.style.marginLeft = "0";
  newDiv.style.marginRight = "auto";
  newDiv.style.visibility = "visible";
  newDiv.style.bottom = "0px";
  newDiv.style.left = "5px";
  document.getElementsByTagName('body')[0].appendChild(newDiv);
  newDiv = document.createElement("div");
  newDiv.id = "p2_poke";
  newDiv.style.width = "100px";
  newDiv.style.height = "100px";
  newDiv.style.backgroundSize = "100px";
  newDiv.style.backgroundRepeat = "no-repeat";
  newDiv.style.position = "absolute";
  newDiv.style.marginBottom = "auto";
  newDiv.style.marginTop = "0";
  newDiv.style.marginLeft = "auto";
  newDiv.style.marginRight = "0";
  newDiv.style.visibility = "visible";
  newDiv.style.top = "5px";
  newDiv.style.right = "5px";
  document.getElementsByTagName('body')[0].appendChild(newDiv);
  document.getElementById("player2_help").children[0].style.backgroundImage = "url('src/medias/help_buttons/p2/Z_noclick.png')";
  document.getElementById("player2_help").children[1].children[0].style.backgroundImage = "url('src/medias/help_buttons/p2/Q_noclick.png')";
  document.getElementById("player2_help").children[1].children[1].style.backgroundImage = "url('src/medias/help_buttons/p2/S_noclick.png')";
  document.getElementById("player2_help").children[1].children[2].style.backgroundImage = "url('src/medias/help_buttons/p2/D_noclick.png')";
  document.getElementById("player2_help").children[1].children[3].style.backgroundImage = "url('src/medias/help_buttons/p2/R_noclick.png')";

  document.getElementById("player1_help").children[0].style.backgroundImage = "url('src/medias/help_buttons/p1/up_arrow_noclick.png')";
  document.getElementById("player1_help").children[1].children[0].style.backgroundImage = "url('src/medias/help_buttons/p1/left_arrow_noclick.png')";
  document.getElementById("player1_help").children[1].children[1].style.backgroundImage = "url('src/medias/help_buttons/p1/down_arrow_noclick.png')";
  document.getElementById("player1_help").children[1].children[2].style.backgroundImage = "url('src/medias/help_buttons/p1/right_arrow_noclick.png')";
  document.getElementById("player1_help").children[1].children[3].style.backgroundImage = "url('src/medias/help_buttons/p1/0_noclick.png')";

  if(multiPlayers){
    document.getElementById("player1_help").style.visibility = "visible";
    document.getElementById("player2_help").style.visibility = "visible";
  }
  else{
    document.getElementById("player1_help").style.visibility = "visible";
    document.getElementById("player2_help").style.visibility = "hidden";
  }

}

function prepare_game(){
  let newDiv;
  poke_player1 = p1;
  poke_player2 = p2;
  document.getElementById("p1_poke").style.backgroundImage = "url('src/medias/menu/choice_"+poke_player1.name+".png')";
  document.getElementById("p1_poke").style.visibility = "visible";
  document.getElementById("p2_poke").style.backgroundImage = "url('src/medias/menu/choice_"+poke_player2.name+".png')";
  document.getElementById("p2_poke").style.visibility = "visible";
  document.getElementById("player1_power").style.backgroundImage = "url('"+poke_player1.type.icon+"')";
  document.getElementById("player2_power").style.backgroundImage = "url('"+poke_player2.type.icon+"')";
  camera.position.set(0,25,7);
  gameSound = new Audio("src/medias/sounds/pokemon1g-gym-battle.mp3");
  gameSound.volume = sound_volume/10.0;
  gameSound.pause();
  newTerrain = terrain;
  changeTerrain();
  if(show_fps){
    stats.domElement.style.visibility = 'visible';
  }
  if(show_dev_menu){
    document.getElementById("dev_menu").style.visibility = "visible";
  }
  document.getElementById("player1_help").style.visibility = "visible";
  document.getElementById("player2_help").style.visibility = "visible";
  document.getElementById("player1_power").style.visibility ="visible";
  document.getElementById("player2_power").style.visibility ="visible";
  document.getElementById("player1_shield").style.visibility ="visible";
  document.getElementById("player2_shield").style.visibility ="visible";
  ball_speed = 0.1;
  score_p1 = 0;
  score_p2 = 0;
  cooldownp1 = 0;
  cooldownp2 = 0;
  p1_use_power = false;
  p2_use_power = false;
  game_ready = true;
  bool_decompte = true;
}

// show FPS stats
function showStats(){
  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position	= 'absolute';
  stats.domElement.style.bottom	= '5px';
  stats.domElement.style.right = '5px';
  stats.domElement.style.visibility = 'hidden';
  document.body.appendChild( stats.domElement );
}

// Draw every elements of the game
function drawGame(){
    drawBall();
    drawBallShadow();
    drawPlayersShadow();
    drawPlayers();
    drawScores();
    drawWalls();
    drawShields();
    setScore(1,0);
    setScore(2,0);
    drawAxis();
}

// Draw the ball
function drawBall(){
  ballGeometry = new THREE.SphereGeometry( 0.5, 20, 20 );
  material = new THREE.MeshBasicMaterial({/*color: 0xFFFFFF,*/map:ballTexture, /*transparent:true, opacity: 0.5*/});
  sphere = new THREE.Mesh( ballGeometry, material, );
  scene.add( sphere );
  sphere.rotateX(THREE.Math.degToRad(90));
  sphere.position.z = 2;
}

// Draw ball shadow
function drawBallShadow(){
  geometry = new THREE.CircleGeometry(0.5,20);
  material = new THREE.MeshPhongMaterial({color: 0x000000, transparent:true, opacity: 0.5});
  shadow = new THREE.Mesh( geometry, material, );
  scene.add( shadow );
  shadow.position.z = -3;
}

// Update position and opacity of shadow
function updateShadow(){
  shadow.position.x = sphere.position.x;
  shadow.position.y = sphere.position.y;
  shadow.material.opacity = 1/(sphere.position.z+3);
  shadowp1.position.x = player1.position.x;
  shadowp1.material.opacity = 1/(player1.position.z+3);
  shadowp2.position.x = player2.position.x;
  shadowp2.material.opacity = 1/(player2.position.z+3);
}

// Reset ball position and speed
function resetBall(){
  sphere.position.x = 0;
  sphere.position.y = 0;
  sphere.position.z = 2;
  ball_speed = 0.1;
  ball_lateral_speed = 0.0;
  ball_height_speed = 0.0;
}

// Draw walls
function drawWalls(){
  scene.add(walls);
}

function changeTerrain(){
  removeTerrain(oldTerrain);
  drawTerrain(newTerrain);
  scene.remove(sphere, shadow, shadowp1, shadowp2, player1, player2, scoreObjectP1, scoreObjectP2, back_scorep1, back_scorep2, walls, shield_p1, shield_p2);
  scene.remove(xaxis, yaxis, zaxis);
  drawGame();
}

function drawTerrain(name){
  if(name == 'stadium'){
    let i=0, j=0;
    scene.add(stadium);
    for(i=0; i<public1.children.length; i++){
        for(j=0; j<public1.children[i].children.length; j++){
          public1.children[i].children[j].material.color.setHex( poke_player1.color );
        }
    }
    for(i=0; i<public2.children.length; i++){
        for(j=0; j<public2.children[i].children.length; j++){
          public2.children[i].children[j].material.color.setHex( poke_player2.color );
        }
    }
    scene.add(public1);
    scene.add(public2);
    oldTerrain = 'stadium';
  }
  if(name == 'desert'){
    scene.add(desert);
    oldTerrain = 'desert';
  }
  if(name == 'sky'){
    scene.add(sky);
    oldTerrain = 'sky';
  }
}

function removeTerrain(oldterrain){
  if(oldterrain == 'stadium'){
    scene.remove(stadium,public1,public2);
  }
  if(oldterrain == 'desert'){
    scene.remove(desert);
  }
  if(oldterrain == 'sky'){
    scene.remove(sky);
  }
}

function drawScores(){
  scoreGeometry = new THREE.CubeGeometry( 6.8, 0.1, 6.8 );
  material = new THREE.MeshBasicMaterial({color:poke_player1.color, transparent: true, opacity: 0.9});
  back_scorep1 = new THREE.Mesh(scoreGeometry, material);
  back_scorep1.position.z = 15;
  back_scorep1.position.y = -20;
  back_scorep1.position.x = 3.5;
  scene.add(back_scorep1);
  material = new THREE.MeshBasicMaterial({color:poke_player2.color, transparent: true, opacity: 0.9});
  back_scorep2 = new THREE.Mesh(scoreGeometry, material);
  back_scorep2.position.z = 15;
  back_scorep2.position.y = -20;
  back_scorep2.position.x = -3.5;
  scene.add(back_scorep2);
  scoreGeometry = new THREE.CubeGeometry( 7, 0.2, 7 );
  material = new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0});
  scoreObjectP1 = new THREE.Mesh( scoreGeometry, material );
  scoreObjectP1.position.z = 15;
  scoreObjectP1.position.y = -20;
  scoreObjectP1.position.x = 3.5;
  scoreObjectP2 = new THREE.Mesh( scoreGeometry, material );
  scoreObjectP2.position.z = 15;
  scoreObjectP2.position.y = -20;
  scoreObjectP2.position.x = -3.5;
  scene.add(scoreObjectP1);
  scene.add(scoreObjectP2);
}

function setScore(player, score){
  scoreTexture = 'src/medias/scores/'+score+'.png';
  scoreGeometry = new THREE.CubeGeometry( 7, 0.2, 7 );
  if(player == 1){
    scene.remove(scoreObjectP1);
    scoreMaterial = [
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// LEFT
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// RIGHT
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// BACK
      new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(scoreTexture), transparent: true, opacity: 1.0, side: THREE.FrontSide}),// FRONT
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// TOP
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0})// BOTTOM
    ];
    material = new THREE.MeshFaceMaterial(scoreMaterial);
    scoreObjectP1 = new THREE.Mesh( scoreGeometry, material );
    scoreObjectP1.rotateZ(THREE.Math.degToRad(180));
    scoreObjectP1.position.z = 15;
    scoreObjectP1.position.y = -20;
    scoreObjectP1.position.x = 3.5;
    scene.add(scoreObjectP1);
  }
  if(player == 2){
    scene.remove(scoreObjectP2);
    scoreMaterial = [
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// LEFT
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// RIGHT
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// BACK
      new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(scoreTexture), transparent: true, opacity: 1.0, side: THREE.FrontSide}),// FRONT
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0}),// TOP
      new THREE.MeshBasicMaterial({color:0xffffff, transparent: true, opacity: 0})// BOTTOM
    ];
    material = new THREE.MeshFaceMaterial(scoreMaterial);
    scoreObjectP2 = new THREE.Mesh( scoreGeometry, material );
    scoreObjectP2.rotateZ(THREE.Math.degToRad(180));
    scoreObjectP2.position.z = 15;
    scoreObjectP2.position.y = -20;
    scoreObjectP2.position.x = -3.5;
    scene.add(scoreObjectP2);
  }
  scene.remove(walls);
  scene.add(walls);
  scene.remove(shield_p2,shield_p1);
  scene.add(shield_p2, shield_p1);
}

// Draw shields
function drawShields(){
  geometry = new THREE.CubeGeometry( 20.4, 0.2, 10.4 );
  material = new THREE.MeshPhongMaterial({color: 0xFFFFFF, transparent: true, opacity: 0.1});
  shield_p2 = new THREE.Mesh( geometry, material, );
  scene.add(shield_p2);
  shield_p2.position.z = 2;
  shield_p2.position.y = -13;
  shield_p1 = new THREE.Mesh( geometry, material, );
  scene.add(shield_p1);
  shield_p1.position.z = 2;
  shield_p1.position.y = 13;
}

// Draw XYZ Axis
function drawAxis(){
  scene.add(xaxis);
  scene.add(yaxis);
  scene.add(zaxis);
  xaxis.position.x += xaxis.geometry.parameters.width / 2;
  yaxis.position.y += yaxis.geometry.parameters.height / 2;
  zaxis.position.z += zaxis.geometry.parameters.depth / 2;
  xaxis.visible=false;
  yaxis.visible=false;
  zaxis.visible=false;
}

// Draw 2 players
function drawPlayers(){
  playerGeometry = new THREE.CubeGeometry( 8, 0.2, 4 );
  // Apply texture on every faces of the mesh
  playerMaterial = [
    new THREE.MeshBasicMaterial({color:poke_player2.color, transparent: true, opacity: 0.6}),// LEFT
    new THREE.MeshBasicMaterial({color:poke_player2.color, transparent: true, opacity: 0.6}),// RIGHT
    new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(poke_player2.back), transparent: true, opacity: 0.6, side: THREE.FrontSide}),// BACK
    new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(poke_player2.front), transparent: true, opacity: 0.6, side: THREE.FrontSide}),// FRONT
    new THREE.MeshBasicMaterial({color:poke_player2.color, transparent: true, opacity: 0.6}),// TOP
    new THREE.MeshBasicMaterial({color:poke_player2.color, transparent: true, opacity: 0.6})// BOTTOM
  ];
  material = new THREE.MeshFaceMaterial(playerMaterial);
  player2 = new THREE.Mesh( playerGeometry, material, );
  playerMaterial = [
    new THREE.MeshBasicMaterial({color:poke_player1.color, transparent: true, opacity: 0.6}),// LEFT
    new THREE.MeshBasicMaterial({color:poke_player1.color, transparent: true, opacity: 0.6}),// RIGHT
    new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(poke_player1.back), transparent: true, opacity: 0.6, side: THREE.FrontSide}),// BACK
    new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load(poke_player1.front), transparent: true, opacity: 0.6, side: THREE.FrontSide}),// FRONT
    new THREE.MeshBasicMaterial({color:poke_player1.color, transparent: true, opacity: 0.6}),// TOP
    new THREE.MeshBasicMaterial({color:poke_player1.color, transparent: true, opacity: 0.6})// BOTTOM
  ];
  material = new THREE.MeshFaceMaterial(playerMaterial);
  player1 = new THREE.Mesh( playerGeometry, material, );
  scene.add(player2);
  scene.add(player1);
  player2.rotateZ(THREE.Math.degToRad(180));
  player1.position.y = 10;
  player1.position.z = 2;
  player2.position.y = -10;
  player2.position.z = 2;
}

function drawPlayersShadow(){
  geometry = new THREE.PlaneGeometry(8,0.2,1,1);
  material = new THREE.MeshPhongMaterial({color: 0x000000, transparent:true, opacity: 0.5});
  shadowp1 = new THREE.Mesh( geometry, material, );
  scene.add( shadowp1 );
  material = new THREE.MeshPhongMaterial({color: 0x000000, transparent:true, opacity: 0.5});
  shadowp2 = new THREE.Mesh( geometry, material, );
  scene.add( shadowp2 );
  shadowp1.position.y = 10;
  shadowp1.position.z = -3;
  shadowp2.position.y = -10;
  shadowp2.position.z = -3;
}

// Reset players position
function resetPlayers(){
  player1.position.x = 0;
  player1.position.z = 2;
  player2.position.x = 0;
  player2.position.z = 2;
  player1_shield_health = 1;
  player2_shield_health = 1;
  shield_p1.visible = true;
  shield_p2.visible = true;
}

// dat.GUI
function showGUI(){
  gui = new dat.GUI({ autoPlace: false });
  gui.add(params, 'axis_visible').onChange(function(){
    if(params.axis_visible){
      xaxis.visible = true;
      yaxis.visible = true;
      zaxis.visible = true;
    }
    else{
      xaxis.visible = false;
      yaxis.visible = false;
      zaxis.visible = false;
    }
  });
  gui.add(params, 'reset');
  gui.add(params, 'changeSpeed').onChange(function(){
    if(params.changeSpeed){
      speed = true;
    }
    else{
      speed = false;
    }
  });
  gui.add(params, 'camera_control').onChange(function(){
    if(params.camera_control){
      controls.enabled = true;
    }
    else{
      controls.enabled = false;
      controls.reset();
      camera.position.set(0,25,7);
    }
  });
  document.getElementById("dev_menu").appendChild(gui.domElement);
}

function collision(){
  if(!p1_use_power && !p2_use_power){
    ball_actual_speed = ball_speed;
  }

  function collisionX1(){ // Test collision X for player 1
    if( (sphere.position.x - (ballsize.x/2) < player1.position.x + (p1size.x/2)) && (sphere.position.x + (ballsize.x/2) > player1.position.x - (p1size.x/2)) ){ // Collision X player 1
      return true;
    }
    else return false; // No collision
  }
  function collisionX2(){ // Test collision X for player 2
    if( (sphere.position.x - (ballsize.x/2) < player2.position.x + (p2size.x/2)) && (sphere.position.x + (ballsize.x/2) > player2.position.x - (p2size.x/2)) ){ // Collision X player 2
      return true;
    }
    else return false; // No collision
  }
  function collisionZ1(){ // Test collision Z for player 1
    if( (sphere.position.z - (ballsize.z/2) < player1.position.z + (p1size.z/2)) && (sphere.position.z + (ballsize.z/2) > player1.position.z - (p1size.z/2)) ){ // Collision Z player 1
      return true;
    }
    else return false; // No collision
  }
  function collisionZ2(){ // Test collision Z for player 2
    if( (sphere.position.z - (ballsize.z/2) < player2.position.z + (p2size.z/2)) && (sphere.position.z + (ballsize.z/2) > player2.position.z - (p2size.z/2)) ){ // Collision Z player 2
      return true;
    }
    else return false; // No collision
  }

  if(sphere.position.x + (ballsize.x/2) >= 10){ // Left wall is hit by the ball
    if(ball_lateral_speed < 0){ // Natural behaviour -> ball changes direction
      sphere.position.x += ball_lateral_speed;
    }
    else { // Unnatural behaviour -> need to change lateral direction
      sphere.position.x -= ball_lateral_speed;
      ball_lateral_speed = -ball_lateral_speed; // Changes lateral direction
    }
  }
  else if(sphere.position.x - (ballsize.x/2) <= -10){ // Right wall is hit by the ball
    if(ball_lateral_speed > 0){ // Natural behaviour -> ball changes direction
      sphere.position.x += ball_lateral_speed;
    }
    else{ // Unnatural behaviour -> need to change lateral direction
      sphere.position.x -= ball_lateral_speed;
      ball_lateral_speed = -ball_lateral_speed; // Changes lateral direction
    }
  }

  if(sphere.position.z + (ballsize.z/2) >= 7){ // Top wall is hit
    if(ball_height_speed < 0){ // Natural behaviour -> ball changes direction
      sphere.position.z += ball_height_speed;
    }
    else { // Unnatural behaviour -> need to change height direction
      sphere.position.z -= ball_height_speed;
      ball_height_speed = -ball_height_speed; // Changes height direction
    }
  }
  else if(sphere.position.z - (ballsize.z/2) <= -3){ // Bottom wall is hit
    if(ball_height_speed > 0){ // Natural behaviour -> ball changes direction
      sphere.position.z += ball_height_speed;
    }
    else { // Unnatural behaviour -> need to change height direction
      sphere.position.z -= ball_height_speed;
      ball_height_speed = -ball_height_speed; // Changes height direction
    }
  }

  if(sphere.position.y < player1.position.y && sphere.position.y > player2.position.y && ball_ready){ // If ball is 'between' the 2 players
    if(p1_use_power){ // Player1 used his power
      if(poke_player1.type.name == 'Glace'){ // Ice power : Slow the ball
        ball_speed = poke_player1.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[0];
        ball_lateral_speed = poke_player1.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[1];
        ball_height_speed = poke_player1.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[2];
      }
    }
    if(p2_use_power){ // Player2 used his power
      if(poke_player2.type.name == 'Glace'){ // Ice power : Slow the ball
        ball_speed = poke_player2.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[0];
        ball_lateral_speed = poke_player2.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[1];
        ball_height_speed = poke_player2.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[2];
      }
    }
    if( (sphere.position.y + (ballsize.y/2) > player1.position.y - p1size.y - ball_speed ) && collisionX1() && collisionZ1()){ // Collision event for player 1
      down = false;
      ball_lateral_speed = (sphere.position.x - player1.position.x)/ (1/(ball_speed*2)*(p1size.x*(1.25)));
      ball_height_speed = (sphere.position.z - player1.position.z)/ (1/(ball_speed*2)*(p1size.z*(2.5)));
      sphere.position.y = player1.position.y - p1size.y - ballsize.y; // The ball cant pass through players
      mySound = new Audio("src/medias/sounds/ping.wav");
      mySound.volume = sound_volume/10.0;
      mySound.play();
      if(!p1_use_power && ball_speed < 0.3 && speed){ // Add speed every hit
        ball_speed = ball_actual_speed;
        ball_speed += 0.05;
      }
      if(p2_use_power && !collisionp1 ){
        if(poke_player2.type.name == 'Feu'){ // stop Fire power
          p2_use_power = false;
          ball_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
          ball_lateral_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
          ball_height_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
        }
      }
      collisionp1 = true;
      if(p1_use_power){
        if(poke_player1.type.name == 'Glace'){ // stop Ice power
          p1_use_power = false;
          ball_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
          ball_lateral_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
          ball_height_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
        }
        if(poke_player1.type.name == 'Feu'){ // start Fire power
          ball_speed = poke_player1.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[0];
          ball_lateral_speed = poke_player1.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[1];
          ball_height_speed = poke_player1.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[2];
        }
      }
    }
    else if( (sphere.position.y - (ballsize.y/2) < player2.position.y + p2size.y + ball_speed) && collisionX2() && collisionZ2()){ // Collision event for player 2
      down = true;
      ball_lateral_speed = (sphere.position.x - player2.position.x)/ (p2size.x*1.25);
      ball_height_speed = (sphere.position.z - player2.position.z)/ (p1size.z*2.5);
      sphere.position.y = player2.position.y + p2size.y + ballsize.y;
      mySound = new Audio("src/medias/sounds/pong.wav");
      mySound.volume = sound_volume/10.0;
      mySound.play();
      if(!p2_use_power && ball_speed < 0.3 && speed){ // Add speed every hit
        ball_speed = ball_actual_speed;
        ball_speed += 0.05;
      }
      if(p1_use_power && collisionp1 ){
        if(poke_player1.type.name == 'Feu'){ // stop Fire power
          p1_use_power = false;
          ball_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
          ball_lateral_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
          ball_height_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
        }
      }
      collisionp1 = false;
      if(p2_use_power){
        if(poke_player2.type.name == 'Ice'){ // stop Ice power
          p2_use_power = false;
          ball_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
          ball_lateral_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
          ball_height_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
        }
        if(poke_player2.type.name == 'Fire'){ // start Fire power
          ball_speed = poke_player2.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[0];
          ball_lateral_speed = poke_player2.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[1];
          ball_height_speed = poke_player2.type.start_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed)[2];
        }
      }
    }
  }
  else{ // Ball is behind of the 2 players
    if(sphere.position.y > player1.position.y + 3){ // Ball is behind player 1
      if(player1_shield_health == 0){
        console.log("But joueur 2");
        score_p2++;
        setScore(2,score_p2);
        document.getElementById("player1_shield").style.visibility ="visible";
        document.getElementById("player2_shield").style.visibility ="visible";
        resetBall();
        resetPlayers();
        scoreEvents();
      }
      else{
        if(p2_use_power){ // stop Ice and Fire power
          if(poke_player2.type.name == 'Ice'){ // stop Ice power
            p2_use_power = false;
            ball_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
            ball_lateral_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
            ball_height_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
          }
          if(poke_player2.type.name == 'Fire'){ // stop Fire power
            p2_use_power = false;
            ball_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
            ball_lateral_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
            ball_height_speed = poke_player2.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
          }
        }
        console.log("Bouclier joueur 1 abaissé");
        if(!player_invincible){
          player1_shield_health--;
        }
        if(player1_shield_health == 0){
          shield_p1.visible = false;
          document.getElementById("player1_shield").style.visibility ="hidden";
        }
        if(sphere.position.y + (ballsize.y/2) >= 13){
          sphere.position.y = 13 - (ballsize.y/2);
          down = false;
          ball_ready = false;
        }
      }
    }
    else if(sphere.position.y < player2.position.y - 3){  // Ball is behind player 2
      if(player2_shield_health == 0){
        console.log("But joueur 1");
        score_p1++;
        setScore(1,score_p1);
        document.getElementById("player1_shield").style.visibility ="visible";
        document.getElementById("player2_shield").style.visibility ="visible";
        resetBall();
        resetPlayers();
        scoreEvents();
      }
      else{
        if(p1_use_power){ // stop Ice and Fire power
          if(poke_player1.name == 'Ice'){ // stop Ice power
            p1_use_power = false;
            ball_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
            ball_lateral_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
            ball_height_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
          }
          if(poke_player1.name == 'Fire'){ // stop Fire power
            p1_use_power = false;
            ball_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[0];
            ball_lateral_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[1];
            ball_height_speed = poke_player1.type.stop_power(sphere, ball_speed, ball_lateral_speed, ball_height_speed, ball_actual_speed)[2];
          }
        }
        console.log("Bouclier joueur 2 abaissé");
        player2_shield_health--;
        if(player2_shield_health == 0){
          document.getElementById("player2_shield").style.visibility ="hidden";
          shield_p2.visible = false;
        }
        if(sphere.position.y - (ballsize.y/2) <= -13){
          sphere.position.y = -13 + (ballsize.y/2);
          down = true;
          ball_ready = false;
        }
      }
    }
  }
}

// keyboard listeners
function powerEvents(){
  document.body.addEventListener('keydown', function(event){
    if(event.key == "0" && !menu && !pause){ // Player 1 power
      document.getElementById("player1_help").children[1].children[3].style.backgroundImage = "url('src/medias/help_buttons/p1/0.png')";
      if(cooldownp1 == 0){
        console.log('P1 used his power');
        timerp1 = 0;
        p1_use_power = true;
        p1_incooldown = true;
        if(poke_player1.type.name == 'Plante'){ // Grass power : reduce opposite size
          poke_player1.type.start_power(player2, boundingBox, p2size);
        }
      }
      else console.log('Power player 1 in cooldown');
    }
    if((event.key == "r" || event.key == "R") && multiPlayers && !menu && !pause){ // Player 2 power
      document.getElementById("player2_help").children[1].children[3].style.backgroundImage = "url('src/medias/help_buttons/p2/R.png')";
      if(cooldownp2 == 0){
        console.log('P2 used his power');
        timerp2 = 0;
        p2_use_power = true;
        p2_incooldown = true;
        if(poke_player2.type.name == 'Plante'){ // Grass power : reduce opposite size
          poke_player2.type.start_power(player1, boundingBox, p1size);
        }
      }
      else console.log('Power player 2 in cooldown');
    }
    if((event.key == 'i' || event.key == 'I') && !multiPlayers && !menu && !pause){ // Cheat code 'i', player1 Invincible
      if(player_invincible){
        player_invincible = false;
      }
      else{
        console.log('Player1 Invincible');
        player_invincible = true;
      }
    }
    if((event.key == 'k' || event.key == 'K') && !multiPlayers && !menu && !pause){ // Cheat code 'k', player1 Score++
      console.log("But joueur 1");
      score_p1++;
      setScore(1,score_p1);
      resetBall();
      resetPlayers();
      scoreEvents();
    }
    if((event.key == 'h' || event.key == 'H') && !menu && !pause){
      if(help_buttons){
        document.getElementById("player1_help").style.visibility = "hidden";
        document.getElementById("player2_help").style.visibility = "hidden";
        help_buttons = false;
      }
      else{
        if(multiPlayers){
          document.getElementById("player1_help").style.visibility = "visible";
          document.getElementById("player2_help").style.visibility = "visible";
        }
        else{
          document.getElementById("player1_help").style.visibility = "visible";
          document.getElementById("player2_help").style.visibility = "hidden";
        }
        help_buttons = true;
      }
    }
  }, false);
  document.body.addEventListener('keyup', function(event){
    if(event.key == "0"){
      document.getElementById("player1_help").children[1].children[3].style.backgroundImage = "url('src/medias/help_buttons/p1/0_noclick.png')";
    }
    if((event.key == "r" || event.key == "R") && multiPlayers){
      document.getElementById("player2_help").children[1].children[3].style.backgroundImage = "url('src/medias/help_buttons/p2/R_noclick.png')";
    }
  });
}

function scoreEvents(){
  if(score_p1 == 3){
    console.log("Victoire P1");
    ball_speed = 0;
    menu = true;
    game_ready = false;
    gameSound.pause();
    showMenu();
    document.getElementById("p1_poke").style.visibility = "hidden";
    document.getElementById("p2_poke").style.visibility = "hidden";
    document.getElementById("dev_menu").style.visibility = "hidden";
    document.getElementById("player1_help").style.visibility = "hidden";
    document.getElementById("player2_help").style.visibility = "hidden";
    stats.domElement.style.visibility = 'hidden';
    document.getElementById("player1_power").style.visibility = "hidden";
    document.getElementById("player2_power").style.visibility = "hidden";
    document.getElementById("player1_shield").style.visibility = "hidden";
    document.getElementById("player2_shield").style.visibility = "hidden";
    controls.reset();
  }
  else{
    bool_decompte = true;
    gameSound.pause();
  }
  if(score_p2 == 3){
    console.log("Victoire P2");
    ball_speed = 0;
    menu = true;
    game_ready = false;
    gameSound.pause();
    showMenu();
    document.getElementById("p1_poke").style.visibility = "hidden";
    document.getElementById("p2_poke").style.visibility = "hidden";
    document.getElementById("dev_menu").style.visibility = "hidden";
    document.getElementById("player1_help").style.visibility = "hidden";
    document.getElementById("player2_help").style.visibility = "hidden";
    stats.domElement.style.visibility = 'hidden';
    document.getElementById("player1_power").style.visibility = "hidden";
    document.getElementById("player2_power").style.visibility = "hidden";
    document.getElementById("player1_shield").style.visibility = "hidden";
    document.getElementById("player2_shield").style.visibility = "hidden";
  }
  else{
    bool_decompte = true;
    gameSound.pause();
  }
}

function updateCooldowns(){
  if(p1_incooldown){
    if(p1_use_power){ // Timer update for thunder grass fly and water power
      timerp1 += loop.step;
    }
    cooldownp1 += loop.step;
    document.getElementById("player1_power").innerHTML = 10-Math.trunc(cooldownp1);
    if(timerp1 >= loop.fps*loop.step*3){ // 3s for grass and thunder power
      if(poke_player1.type.name == 'Plante'){
        poke_player1.type.stop_power(player2, boundingBox, p2size);
        p1_use_power = false;
        timerp1 = 0;
      }
      if(poke_player1.type.name == 'Electrique'){
        p1_use_power = false;
        timerp1 = 0;
      }
    }
    if(timerp1 >= loop.fps*loop.step*6){ // 6s for water fly and psy power
      if(poke_player1.type.name == 'Eau' || poke_player1.type.name == 'Psy' || poke_player1.type.name == 'Vol'){
        p1_use_power = false;
        timerp1 = 0;
      }
    }
    if(cooldownp1 >= loop.fps*loop.step*10){  // 10s cooldown of power
      if(p1_use_power){
        p1_use_power = false;
      }
      p1_incooldown = false;
      document.getElementById("player1_power").innerHTML = " ";
      console.log('Cooldown p1 over');
      cooldownp1 = 0; // cooldown reset
    }
  }
  if(p2_incooldown){
    if(p2_use_power){ // Timer update for thunder grass fly and water power
      timerp2 += loop.step;
    }
    cooldownp2 += loop.step;
    document.getElementById("player2_power").innerHTML = 10-Math.trunc(cooldownp2);
    if(timerp2 >= loop.fps*loop.step*3){ // 3s for grass and thunder power
      if(poke_player2.type.name == 'Plante'){
        poke_player2.type.stop_power(player1, boundingBox, p1size);
        p2_use_power = false;
        timerp2 = 0;
      }
      if(poke_player2.type.name == 'Electrique'){
        p2_use_power = false;
        timerp2 = 0;
      }
    }
    if(timerp2 >= loop.fps*loop.step*6){ // 6s for water fly and psy power
      if(poke_player2.type.name == 'Eau' || poke_player2.type.name == 'Psy' || poke_player2.type.name == 'Vol'){
        p2_use_power = false;
        timerp2 = 0;
      }
    }
    if(cooldownp2 >= loop.fps*loop.step*10){ // 10s cooldown of power
      if(p2_use_power){
        p2_use_power = false;
      }
      p2_incooldown = false;
      console.log('Cooldown p2 over');
      document.getElementById("player2_power").innerHTML = " ";
      cooldownp2 = 0; // cooldown reset
    }
  }
}

// Set the ball_ready variable
function ballReady(){
  if(!ball_ready){ // If the ball has hit one shield
    sphere.material.transparent = true;
    sphere.material.opacity = 0.2;
  }
  if(sphere.position.y < 10 - ballsize.y && sphere.position.y > -10 + ballsize.y){ // The ball is behind the 2 players
    ball_ready = true;
    sphere.material.opacity = 1.0;
  }
}

function animatePublic(){
  if(public_up == 1){
    if(!public_up_finished)
      if(public1.position.z < public2.position.z + 0.5){
        public1.position.z += public_up_step;
      }
      else public_up_finished = true;
    else{
      public1.position.z -= public_up_step;
      if(public1.position.z <= public2.position.z){
        public_up = 2;
        public_up_finished = false;
      }
    }
  }
  if(public_up == 2){
    if(!public_up_finished)
      if(public2.position.z < public1.position.z + 0.5){
        public2.position.z += public_up_step;
      }
      else public_up_finished = true;
    else{
      public2.position.z -= public_up_step;
      if(public2.position.z <= public1.position.z){
        public_up = 1;
        public_up_finished = false;
      }
    }
  }
}

function timestamp(){
  return window.performance.now();
}

function IA(){
  if(sphere.position.x > player2.position.x + 0.2){ // go left
    if(ia_right && !stop_right_p2){
      ia_right = false;
      stop_right_p2 = true;
    }
    else ia_left = true;
  }
  if(sphere.position.x < player2.position.x - 0.2){ // go right
    if(ia_left && !stop_left_p2){
      ia_left = false;
      stop_left_p2 = true;
    }
    else ia_right = true;
  }
  if(sphere.position.z > player2.position.z + 0.2){ // go up
    if(ia_down && !stop_down_p2){
      ia_down = false;
      stop_down_p2 = true;
    }
    else ia_up = true;
  }
  if(sphere.position.z < player2.position.z - 0.2){ // go down
    if(ia_up && !stop_up_p2){
      ia_up = false;
      stop_up_p2 = true;
    }
    else ia_down = true;
  }
}

function moveIA(){
  velocite_max_p2 = 0.15+(0.05*(poke_player2.niveau));
  if(ia_left){
    moveLeft(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(ia_right){
    moveRight(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(ia_up){
    moveUp(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(ia_down){
    moveDown(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_left_p2){
    stop_moveLeft(2, player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_right_p2){
    stop_moveRight(2, player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_up_p2){
    stop_moveUp(2, player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_down_p2){
    stop_moveDown(2, player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
}

function movePlayers(){
  if(keyboard.pressed("right")){
    document.getElementById("player1_help").children[1].children[2].style.backgroundImage = "url('src/medias/help_buttons/p1/right_arrow.png')";
    velocite_max_p1 = 0.15+(0.05*(poke_player1.niveau));
    if(p2_use_power && poke_player2.type.name == 'Psy'){
      moveLeft(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
    }
    else moveRight(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(keyboard.pressed("left")){
    document.getElementById("player1_help").children[1].children[0].style.backgroundImage = "url('src/medias/help_buttons/p1/left_arrow.png')";
    velocite_max_p1 = 0.15+(0.05*(poke_player1.niveau));
    if(p2_use_power && poke_player2.type.name == 'Psy'){
      moveRight(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
    }
    else moveLeft(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(keyboard.pressed("up")){
    document.getElementById("player1_help").children[0].style.backgroundImage = "url('src/medias/help_buttons/p1/up_arrow.png')";
    velocite_max_p1 = 0.15+(0.05*(poke_player1.niveau));
    if(p2_use_power && poke_player2.type.name == 'Psy'){
      moveDown(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
    }
    else moveUp(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(keyboard.pressed("down")){
    document.getElementById("player1_help").children[1].children[1].style.backgroundImage = "url('src/medias/help_buttons/p1/down_arrow.png')";
    velocite_max_p1 = 0.15+(0.05*(poke_player1.niveau));
    if(p2_use_power && poke_player2.type.name == 'Psy'){
      moveUp(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
    }
    else moveDown(1, player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(keyboard.pressed("D") && multiPlayers){
    document.getElementById("player2_help").children[1].children[2].style.backgroundImage = "url('src/medias/help_buttons/p2/D.png')";
    velocite_max_p2 = 0.15+(0.05*(poke_player2.niveau));
    if(p1_use_power && poke_player1.type.name == 'Psy'){
      moveLeft(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
    }
    else moveRight(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(keyboard.pressed("Q") && multiPlayers){
    document.getElementById("player2_help").children[1].children[0].style.backgroundImage = "url('src/medias/help_buttons/p2/Q.png')";
    velocite_max_p2 = 0.15+(0.05*(poke_player2.niveau));
    if(p1_use_power && poke_player1.type.name == 'Psy'){
      moveRight(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
    }
    else moveLeft(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(keyboard.pressed("Z") && multiPlayers){
    document.getElementById("player2_help").children[0].style.backgroundImage = "url('src/medias/help_buttons/p2/Z.png')";
    velocite_max_p2 = 0.15+(0.05*(poke_player2.niveau));
    if(p1_use_power && poke_player1.type.name == 'Psy'){
      moveDown(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
    }
    else moveUp(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(keyboard.pressed("S") && multiPlayers){
    document.getElementById("player2_help").children[1].children[1].style.backgroundImage = "url('src/medias/help_buttons/p2/S.png')";
    velocite_max_p2 = 0.15+(0.05*(poke_player2.niveau));
    if(p1_use_power && poke_player1.type.name == 'Psy'){
      moveUp(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
    }
    else moveDown(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
}

function stop_movePlayers(){
  if(stop_left_p1){
    stop_moveLeft(1,player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(stop_right_p1){
    stop_moveRight(1,player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(stop_up_p1){
    stop_moveUp(1,player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(stop_down_p1){
    stop_moveDown(1,player1, poke_player1, p1_use_power, poke_player2, p2_use_power);
  }
  if(stop_left_p2){
    stop_moveLeft(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_right_p2){
    stop_moveRight(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_up_p2){
    stop_moveUp(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
  if(stop_down_p2){
    stop_moveDown(2,player2, poke_player2, p2_use_power, poke_player1, p1_use_power);
  }
}

function keyUpEvents(){
  document.body.addEventListener('keyup', function(event){
    if(event.key == 'ArrowLeft'){
      document.getElementById("player1_help").children[1].children[0].style.backgroundImage = "url('src/medias/help_buttons/p1/left_arrow_noclick.png')";
      if(p2_use_power && poke_player2.type.name == 'Psy'){
        stop_right_p1 = true;
      }
      else stop_left_p1 = true;
    }
    if(event.key == 'ArrowRight'){
      document.getElementById("player1_help").children[1].children[2].style.backgroundImage = "url('src/medias/help_buttons/p1/right_arrow_noclick.png')";
      if(p2_use_power && poke_player2.type.name == 'Psy'){
        stop_left_p1 = true;
      }
      else stop_right_p1 = true;
    }
    if(event.key == 'ArrowUp'){
      document.getElementById("player1_help").children[0].style.backgroundImage = "url('src/medias/help_buttons/p1/up_arrow_noclick.png')";
      if(p2_use_power && poke_player2.type.name == 'Psy'){
        stop_down_p1 = true;
      }
      else stop_up_p1 = true;
    }
    if(event.key == 'ArrowDown'){
      document.getElementById("player1_help").children[1].children[1].style.backgroundImage = "url('src/medias/help_buttons/p1/down_arrow_noclick.png')";
      if(p2_use_power && poke_player2.type.name == 'Psy'){
        stop_up_p1 = true;
      }
      else stop_down_p1 = true;
    }
    if((event.key == 'q' || event.key == 'Q') && multiPlayers){
      document.getElementById("player2_help").children[1].children[0].style.backgroundImage = "url('src/medias/help_buttons/p2/Q_noclick.png')";
      if(p1_use_power && poke_player1.type.name == 'Psy'){
        stop_right_p2 = true;
      }
      else stop_left_p2 = true;
    }
    if((event.key == 'd' || event.key == 'D') && multiPlayers){
      document.getElementById("player2_help").children[1].children[2].style.backgroundImage = "url('src/medias/help_buttons/p2/D_noclick.png')";
      if(p1_use_power && poke_player1.type.name == 'Psy'){
        stop_left_p2 = true;
      }
      else stop_right_p2 = true;
    }
    if((event.key == 'z' || event.key == 'Z') && multiPlayers){
      document.getElementById("player2_help").children[0].style.backgroundImage = "url('src/medias/help_buttons/p2/Z_noclick.png')";
      if(p1_use_power && poke_player1.type.name == 'Psy'){
        stop_down_p2 = true;
      }
      else stop_up_p2 = true;
    }
    if((event.key == 's' || event.key == 'S') && multiPlayers){
      document.getElementById("player2_help").children[1].children[1].style.backgroundImage = "url('src/medias/help_buttons/p2/S_noclick.png')";
      if(p1_use_power && poke_player1.type.name == 'Psy'){
        stop_up_p2 = true;
      }
      else stop_down_p2 = true;
    }
  });
}

function pauseEvent(){
  document.body.addEventListener('keydown', function(event){
    if(event.key == "Escape" && !menu){
      if(!pause){
        pause = true;
        pauseMouse();
        gameSound.pause();
        selected_id = 1;
        document.getElementById("pause").style.visibility = "visible";
      }
    }
    if(event.key == "ArrowRight" && pause){
      if(selected_id == 1){
        document.getElementById(node_id).children[0].style.transform = 'rotateZ(0deg)';
        document.getElementById(node_id).children[1].style.transform = 'scale(1.0)';
        selected_id = 2;
        angle = 0;
        size = 1;
      }
      else{
        document.getElementById(node_id).children[0].style.transform = 'rotateZ(0deg)';
        document.getElementById(node_id).children[1].style.transform = 'scale(1.0)';
        selected_id = 1;
        angle = 0;
        size = 1;
      }
    }
    if(event.key == "ArrowLeft" && pause){
      if(selected_id == 1){
        document.getElementById(node_id).children[0].style.transform = 'rotateZ(0deg)';
        document.getElementById(node_id).children[1].style.transform = 'scale(1.0)';
        selected_id = 2;
        angle = 0;
        size = 1;
      }
      else{
        document.getElementById(node_id).children[0].style.transform = 'rotateZ(0deg)';
        document.getElementById(node_id).children[1].style.transform = 'scale(1.0)';
        selected_id = 1;
        angle = 0;
        size = 1;
      }
    }
    if(event.key == 'Enter' && pause){
      if(selected_id == 1){
        pause = false;
        gameSound.play();
        document.getElementById("pause").style.visibility = "hidden";
      }
      else{
        document.getElementById("pause").style.visibility = "hidden";
        document.getElementById("p1_poke").style.visibility = "hidden";
        document.getElementById("p2_poke").style.visibility = "hidden";
        document.getElementById("dev_menu").style.visibility = "hidden";
        stats.domElement.style.visibility = 'hidden';
        document.getElementById("player1_help").style.visibility = "hidden";
        document.getElementById("player2_help").style.visibility = "hidden";
        document.getElementById("player1_power").style.visibility = "hidden";
        document.getElementById("player2_power").style.visibility = "hidden";
        document.getElementById("player1_shield").style.visibility = "hidden";
        document.getElementById("player2_shield").style.visibility = "hidden";
        menu = true;
        pause = false;
        game_ready = false;
        gameSound.pause();
        controls.reset();
        showMenu();
      }
    }
  });
}

function pauseMouse(){
  document.getElementById("Quitter").onmouseover = function(){
    document.getElementById(node_id).children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById(node_id).children[1].style.transform = 'scale(1.0)';
    selected_id = 2;
    angle = 0;
    size = 1
  }
  document.getElementById("Quitter").onclick = function(){
    document.getElementById("pause").style.visibility = "hidden";
    document.getElementById("p1_poke").style.visibility = "hidden";
    document.getElementById("p2_poke").style.visibility = "hidden";
    document.getElementById("dev_menu").style.visibility = "hidden";
    stats.domElement.style.visibility = 'hidden';
    document.getElementById("player1_help").style.visibility = "hidden";
    document.getElementById("player2_help").style.visibility = "hidden";
    document.getElementById("player1_power").style.visibility = "hidden";
    document.getElementById("player2_power").style.visibility = "hidden";
    document.getElementById("player1_shield").style.visibility = "hidden";
    document.getElementById("player2_shield").style.visibility = "hidden";
    menu = true;
    pause = false;
    game_ready = false;
    gameSound.pause();
    controls.reset();
    showMenu();
  }
  document.getElementById("Reprendre").onmouseover = function(){
    document.getElementById(node_id).children[0].style.transform = 'rotateZ(0deg)';
    document.getElementById(node_id).children[1].style.transform = 'scale(1.0)';
    selected_id = 1;
    angle = 0;
    size = 1
  }
  document.getElementById("Reprendre").onclick = function(){
    pause = false;
    gameSound.play();
    document.getElementById("pause").style.visibility = "hidden";
  }
}

function pauseSelected(selected_id){
  switch(selected_id){
    case 1:
      node_id = "Reprendre";
      break;
    case 2:
      node_id = "Quitter";
      break;
    default:
      break;
  }
}

function animatePause(node_id, step){
  angle += step*50
  document.getElementById(node_id).children[0].style.transform = 'rotateZ('+angle+'deg)';
  if(big){
    size += (loop.fps*loop.step)/100;
  }
  else{
    size -= (loop.fps*loop.step)/100;
  }
  if(size > 1.25 && big){
    big = false;
    size = 1.25;
  }
  if(size < 1 && !big){
    big = true;
    size = 1.0;
  }
  document.getElementById(node_id).children[1].style.transform = 'scale('+size+')';
}

function decompte(number){
  if(number == 0){
    console.log("Go!");
    bool_decompte = false;
    n_decompte = 3;
    bipSound = new Audio("src/medias/sounds/go.mp3");
    bipSound.volume = sound_volume/10.0;
    bipSound.play();
    document.getElementById("game_message").style.visibility = "hidden";
    document.getElementById("game_message").innerHTML = " ";
    gameSound.play();
  }
  else{
    console.log(number+"!");
    gameSound.pause();
    bipSound = new Audio("src/medias/sounds/bip.mp3");
    bipSound.volume = sound_volume/10.0;
    bipSound.play();
    document.getElementById("game_message").innerHTML = number;
    n_decompte--;
  }
}
