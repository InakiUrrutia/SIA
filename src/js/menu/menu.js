import {poke} from '../pokemons/pokemon.js';
//import {changeTerrain} from '../game/pong3D.js';

// Player 1 & 2 pokemons (you can change pokemon here)
var p1 = poke.pikachu;
var p2 = poke.carapuce;

var two_players = false;

let loop = {};

let node_id, poke_id;
let pokeball;
let text, angle;
let size;
let big = true;
let selected_div = 1, poke_div = 1;

let main_menu = true;
let one_player_menu = false;
let two_players_menu = false;
let pokemons_menu = false;
let options_menu = false;

let poke_choices_created = false;

let p1_has_chosen = false, p1_index;
let p2_has_chosen = false, p2_index;

let menuSound = new Audio('src/medias/sounds/pokemon1g-pallet-town.mp3');
let musicplay = false, delay = 0;

let big_opt = true, size_opt;
let selected_terrain = 3, terrain = 'sky', show_fps = false, show_dev_menu = false, sound_volume = 1.0, selected_option;
let volume_listener_created = false, terrain_listener_created = false;

window.onload = go;

function go(){
  init();
}

function init(){
  const fps  = 30;
  const slow = 1; // slow motion! 1: normal speed, 2: half speed...
  loop.fps      = fps;
  loop.step     = 1/loop.fps;
  node_id = "one_player";
  poke_id = "choice_Pichu";
  pokeball = document.getElementById(node_id).childNodes[1];
  text = document.getElementById(node_id).childNodes[3];
  angle = 0;
  size = 1;
  hideBorders();
  showMenu();
  menuChoice();
  createPokeChoices();
  hide_PokeChoices();
  keyboardEvents();
  document.getElementById("SIApp").style.borderWidth = "0px";
  document.getElementById("SIApp").style.borderLeftColor = "transparent";
  document.getElementById("SIApp").style.borderRightColor = "transparent";
  document.getElementById("SIApp").style.borderTopColor = "transparent";
  document.getElementById("SIApp").style.borderBottomColor = "transparent";
  document.getElementById("SIApp").style.height = "100%";
  document.getElementById("SIApp").style.width = "100%";
  document.getElementById("jouer").style.visibility = "hidden";
  document.getElementById("retour").style.visibility = "hidden";
  document.getElementById("screen_title").style.visibility = "hidden";
  document.getElementById("screen_desc").style.visibility = "hidden";
  document.getElementById("poke_desc").style.visibility = "hidden";
  document.getElementById("options_menu").style.visibility = "hidden";
  document.getElementById("game_message").style.visibility = "hidden";
  document.getElementById("player1_power").style.visibility ="hidden";
  document.getElementById("player2_power").style.visibility ="hidden";
  document.getElementById("player1_shield").style.visibility ="hidden";
  document.getElementById("player2_shield").style.visibility ="hidden";
}

function menu_loop(step){
  if(menu){
    if(main_menu){
      menu_selected(selected_div);
      pokeball = document.getElementById(node_id).childNodes[1];
      text = document.getElementById(node_id).childNodes[3];
    }
    else if(one_player_menu){
      document.getElementById(poke_id).style.border = "0px";
      poke_selected(poke_div);
      if(poke_div>21){
        menu_selected(selected_div);
        pokeball = document.getElementById(node_id).childNodes[1];
        text = document.getElementById(node_id).childNodes[3];
      }
    }
    else if(two_players_menu){
      document.getElementById(poke_id).style.border = "0px";
      poke_selected(poke_div);
      if(poke_div>21){
        menu_selected(selected_div);
        pokeball = document.getElementById(node_id).childNodes[1];
        text = document.getElementById(node_id).childNodes[3];
      }
    }
    else if(pokemons_menu){
      document.getElementById(poke_id).style.border = "0px";
      poke_selected(poke_div);
      if(poke_div>21){
        menu_selected(selected_div);
        pokeball = document.getElementById(node_id).childNodes[1];
        text = document.getElementById(node_id).childNodes[3];
      }
    }
    else{
      if(selected_option <= 4){
        option_selected(selected_option);
        text = document.getElementById(node_id).children[0];
        text.style.transform = 'scale(1.25)';
      }
      else{
        menu_selected(selected_div);
        pokeball = document.getElementById(node_id).childNodes[1];
        text = document.getElementById(node_id).childNodes[3];
      }
    }
    updateMenu(step); // déplace les objets d'une fraction de seconde
  }
}

function updateMenu(step){
  delay += step;
  if(!musicplay && loop.fps*step*1.5 < delay){
    playMusic();
    delay = 0;
  }
  if(main_menu){
    animateMenu(node_id, step);
  }
  else if(one_player_menu){
    if(!p1_has_chosen){
      document.getElementById(poke_id).style.border = "2px solid red";
    }
    else if(!p2_has_chosen){
      document.getElementById(poke_id).style.border = "2px solid blue";
    }
    if(poke_div>21){
      document.getElementById(poke_id).style.border = "0px";
      animateMenu(node_id, step);
    }
  }
  else if(two_players_menu){
    if(!p1_has_chosen){
      document.getElementById(poke_id).style.border = "2px solid red";
    }
    else if(!p2_has_chosen){
      document.getElementById(poke_id).style.border = "2px solid blue";
    }
    if(poke_div>21){
      document.getElementById(poke_id).style.border = "0px";
      animateMenu(node_id, step);
    }
  }
  else if(pokemons_menu){
    if(poke_div > 21){
      selected_div = 6;
      document.getElementById(poke_id).style.border = "0px";
      animateMenu(node_id, step);
    }
    else{
      pokeball.style.transform = 'rotateZ(0deg)';
      text.style.transform = 'scale(1.0)';
      document.getElementById(poke_id).style.border = "2px solid red";
    }
  }
  if(options_menu){
    if(selected_option <= 4){
      pokeball.style.transform = 'rotateZ(0deg)';
    }
    else{
      selected_div = 6;
      animateMenu(node_id, step);
    }
  }
}

function animateMenu(node_id, step){
  angle += step*50
  pokeball.style.transform = 'rotateZ('+angle+'deg)';
  if(big){
    size += (loop.fps*loop.step)/150;
  }
  else{
    size -= (loop.fps*loop.step)/150;
  }
  if(size > 1.25 && big){
    big = false;
    size = 1.25;
  }
  if(size < 1 && !big){
    big = true;
    size = 1.0;
  }
  text.style.transform = 'scale('+size+')';
}

function playMusic(){
  if(!musicplay){
    menuSound.volume = sound_volume/10.0;
    menuSound.play();
    musicplay = true;
  }
  menuSound.addEventListener("ended", function(){
    musicplay = false;
  });
}

function hideMenu(){
  document.getElementById("Title_menu").style.visibility = "hidden";
  document.getElementById("one_player").style.visibility = "hidden";
  document.getElementById("two_players").style.visibility = "hidden";
  document.getElementById("pokemons").style.visibility = "hidden";
  document.getElementById("options").style.visibility = "hidden";
}
function showMenu(){
  hideBorders();
  document.getElementById("Title_menu").style.visibility = "visible";
  document.getElementById("one_player").style.visibility = "visible";
  document.getElementById("two_players").style.visibility = "visible";
  document.getElementById("pokemons").style.visibility = "visible";
  document.getElementById("options").style.visibility = "visible";
}
function hideBorders(){
  document.getElementById("SIApp").style.borderWidth = "0px";
  document.getElementById("SIApp").style.borderLeftColor = "transparent";
  document.getElementById("SIApp").style.borderRightColor = "transparent";
  document.getElementById("SIApp").style.borderTopColor = "transparent";
  document.getElementById("SIApp").style.borderBottomColor = "transparent";
  document.getElementById("SIApp").style.height = "100%";
  document.getElementById("SIApp").style.width = "100%";
}
function showBorders(){
  document.getElementById("SIApp").style.borderWidth = "5px";
  document.getElementById("SIApp").style.borderLeftColor = p1.html_color;
  document.getElementById("SIApp").style.borderRightColor = p2.html_color;
  document.getElementById("SIApp").style.borderTopColor = p2.html_color;
  document.getElementById("SIApp").style.borderBottomColor = p1.html_color;
  document.getElementById("SIApp").style.height = "99%";
  document.getElementById("SIApp").style.width = "99.5%";
}
function menuChoice(){
  document.getElementById("one_player").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 1;
    node_id = "one_player";
    angle = 0;
    size = 1;
  }
  document.getElementById("one_player").onclick = function(){
    main_menu = false;
    one_player_menu = true;
    document.getElementById("player2_choice").children[0].innerHTML = "IA";
    document.getElementById("screen_title").innerHTML = "1 Joueur";
    document.getElementById("screen_desc").innerHTML = "Choisis ton PoKéMoN";
    showPlayMenu();
  }
  document.getElementById("two_players").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 2;
    node_id = "two_players";
    angle = 0;
    size = 1;
  }
  document.getElementById("two_players").onclick = function(){
    main_menu = false;
    two_players_menu = true;
    document.getElementById("player2_choice").children[0].innerHTML = "Joueur 2";
    document.getElementById("screen_title").innerHTML = "2 Joueurs";
    document.getElementById("screen_desc").innerHTML = "Choisissez votre PoKéMoN";
    showPlayMenu();
  }
  document.getElementById("pokemons").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 3;
    node_id = "pokemons";
    angle = 0;
    size = 1;
  }
  document.getElementById("pokemons").onclick = function(){
    main_menu = false;
    pokemons_menu = true;
    document.getElementById("screen_title").innerHTML = "PoKéMoNs";
    document.getElementById("screen_desc").innerHTML = "Choisissez un PoKéMoN pour lire sa description";
    showPokemonsMenu();
  }
  document.getElementById("options").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 4;
    node_id = "options";
    angle = 0;
    size = 1;
  }
  document.getElementById("options").onclick = function(){
    main_menu = false;
    options_menu = true;
    document.getElementById("screen_title").innerHTML = "Options";
    showOptionsMenu();
  }
}
function mainMenuHandler(event){
  if(event.key == 'ArrowDown'){
    if(selected_div < 4){
      pokeball.style.transform = 'rotateZ(0deg)';
      text.style.transform = 'scale(1.0)';
      selected_div++;
      angle = 0;
      size = 1;
    }
    else if(selected_div == 4){
      pokeball.style.transform = 'rotateZ(0deg)';
      text.style.transform = 'scale(1.0)';
      selected_div = 1;
      angle = 0;
      size = 1;
    }
  }
  if(event.key == 'ArrowUp'){
    if(selected_div > 1){
      pokeball.style.transform = 'rotateZ(0deg)';
      text.style.transform = 'scale(1.0)';
      selected_div--;
      angle = 0;
      size = 1;
    }
    else if(selected_div == 1){
      pokeball.style.transform = 'rotateZ(0deg)';
      text.style.transform = 'scale(1.0)';
      selected_div = 4;
      angle = 0;
      size = 1;
    }
  }
  if(event.key == 'Enter'){
    if(selected_div == 1){
      main_menu = false;
      one_player_menu = true;
      document.getElementById("player2_choice").children[0].innerHTML = "IA";
      document.getElementById("screen_title").innerHTML = "1 Joueur";
      document.getElementById("screen_desc").innerHTML = "Choisis ton PoKéMoN";
      showPlayMenu();
    }
    else if(selected_div == 2){
      main_menu = false;
      two_players_menu = true;
      document.getElementById("player2_choice").children[0].innerHTML = "Joueur 2";
      document.getElementById("screen_title").innerHTML = "2 Joueurs";
      document.getElementById("screen_desc").innerHTML = "Choisissez votre PoKéMoN";
      showPlayMenu();
    }
    else if(selected_div == 3){
      main_menu = false;
      pokemons_menu = true;
      document.getElementById("screen_title").innerHTML = "PoKéMoNs";
      document.getElementById("screen_desc").innerHTML = "Choisissez un PoKéMoN pour lire sa description";
      showPokemonsMenu();
    }
    else{
      main_menu = false;
      options_menu = true;
      document.getElementById("screen_title").innerHTML = "Options";
      showOptionsMenu();
    }
  }
}
function menu_selected(selected_div){
  switch (selected_div){
    case 1:
      node_id = "one_player";
      break;
    case 2:
      node_id = "two_players";
      break;
    case 3:
      node_id = "pokemons";
      break;
    case 4:
      node_id = "options";
      break;
    case 5:
      node_id = "jouer";
      break;
    case 6:
      node_id = "retour";
      break;
    default:
      break;
  }
}

function keyboardEvents(){
  document.body.addEventListener('keydown', function(event){
    if(menu){
      if(main_menu){
        mainMenuHandler(event);
      }
      else if(one_player_menu){
        onePlayerMenuHandler(event);
      }
      else if(two_players_menu){
        twoPlayersMenuHandler(event)
      }
      else if(pokemons_menu){
        pokemonsMenuHandler(event);
      }
      else if(options_menu){
        optionsMenuHandler(event);
      }
    }
  });
}

function poke_selected(selected_poke){
  switch (selected_poke){
    case 1:
      poke_id = "choice_Pichu";
      break;
    case 2:
      poke_id = "choice_Salameche";
      break;
    case 3:
      poke_id = "choice_Carapuce";
      break;
    case 4:
      poke_id = "choice_Bulbizarre";
      break;
    case 5:
      poke_id = "choice_Roucool";
      break;
    case 6:
      poke_id = "choice_Stalgamin";
      break;
    case 7:
      poke_id = "choice_Abra";
      break;
    case 8:
      poke_id = "choice_Pikachu";
      break;
    case 9:
      poke_id = "choice_Reptincel";
      break;
    case 10:
      poke_id = "choice_Carabaffe";
      break;
    case 11:
      poke_id = "choice_Herbizarre";
      break;
    case 12:
      poke_id = "choice_Roucoups";
      break;
    case 13:
      poke_id = "choice_Oniglali";
      break;
    case 14:
      poke_id = "choice_Kadabra";
      break;
    case 15:
      poke_id = "choice_Raichu";
      break;
    case 16:
      poke_id = "choice_Dracaufeu";
      break;
    case 17:
      poke_id = "choice_Tortank";
      break;
    case 18:
      poke_id = "choice_Florizarre";
      break;
    case 19:
      poke_id = "choice_Roucarnage";
      break;
    case 20:
      poke_id = "choice_Momartik";
      break;
    case 21:
      poke_id = "choice_Alakazam";
      break;
    default:
      break;
  }
}

function createPokeChoices(){
  let newDiv;
  let top,left;
  let nbpoke = Object.keys(poke);
  for(let i=0; i<nbpoke.length; i++){
    newDiv = document.createElement("div");
    newDiv.id = "choice_"+poke[nbpoke[i]].name;
    newDiv.style.backgroundImage = "url('src/medias/menu/choice_"+poke[nbpoke[i]].name+".png')";
    newDiv.style.width = "100px";
    newDiv.style.height = "100px";
    newDiv.style.backgroundSize = "100px";
    newDiv.style.backgroundRepeat = "no-repeat";
    newDiv.style.position = "absolute";
    top = 25 + 12*(Math.trunc(i/(nbpoke.length/3)));
    left = 50-((nbpoke.length/3)*3) + 6.5*(i%(nbpoke.length/3));
    newDiv.style.top = top+"%";
    newDiv.style.left = left+"%";
    newDiv.style.border = "0px solid black";
    document.getElementsByTagName('body')[0].appendChild(newDiv);
  }
}
function hide_PokeChoices(){
  let nbpoke = Object.keys(poke);
  for(let i=0; i<nbpoke.length; i++){
    document.getElementById("choice_"+poke[nbpoke[i]].name).style.visibility = "hidden";
  }
}
function show_PokeChoices(){
  let nbpoke = Object.keys(poke);
  for(let i=0; i<nbpoke.length; i++){
    document.getElementById("choice_"+poke[nbpoke[i]].name).style.visibility = "visible";
  }
}


function showPlayMenu(){
  hideMenu();
  show_PokeChoices();
  document.getElementById("jouer").style.visibility = "visible";
  document.getElementById("retour").style.visibility = "visible";
  document.getElementById("screen_title").style.visibility = "visible";
  document.getElementById("screen_desc").style.visibility = "visible";
  document.getElementById("players").style.visibility = "visible";
  document.getElementById("player1_choice").children[0].innerHTML = "Joueur 1";
  document.getElementById("player1_choice").children[1].style.backgroundImage = "url('src/medias/menu/interrogation.png')";
  document.getElementById("player1_choice").children[2].innerHTML = "";
  document.getElementById("player2_choice").children[1].style.backgroundImage = "url('src/medias/menu/interrogation.png')";
  document.getElementById("player2_choice").children[2].innerHTML = "";
  poke_div = 1;
  p1_has_chosen = false;
  p2_has_chosen = false;
  play_menuChoice();
}
function hidePlayMenu(){
  hide_PokeChoices();
  showMenu();
  document.getElementById("jouer").style.visibility = "hidden";
  document.getElementById("retour").style.visibility = "hidden";
  document.getElementById("screen_title").style.visibility = "hidden";
  document.getElementById("screen_desc").style.visibility = "hidden";
  document.getElementById("players").style.visibility = "hidden";
  menuChoice();
  selected_div = 1;
}
function onePlayerMenuHandler(event){
  playMenuHandler(event);
}
function twoPlayersMenuHandler(event){
  playMenuHandler(event);
}
function play_menuChoice(){
  document.getElementById("jouer").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 5;
    node_id = "jouer";
    angle = 0;
    size = 1;
    poke_div = 50;
  }
  document.getElementById("jouer").onclick = function(){ // Play game
    main_menu = true;
    if(one_player_menu){
        one_player_menu = false;
        two_players = false;
    }
    else if(two_players_menu){
      two_players_menu = false;
      two_players = true;
    }
    menu = false;
    hidePlayMenu();
    hideMenu();
    showBorders();
    selected_div = 1;
    musicplay = false;
    menuSound.pause();
  }
  document.getElementById("retour").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 6;
    node_id = "retour";
    angle = 0;
    size = 1;
    poke_div = 50;
  }
  document.getElementById("retour").onclick = function(){
    main_menu = true;
    if(one_player_menu){
      one_player_menu = false;
      two_players = false;
    }
    else if(two_players_menu){
      two_players_menu = false;
      two_players = false;
    }
    hidePlayMenu();
    selected_div = 1;
  }
  if(!poke_choices_created){
    let nbpoke = Object.keys(poke);
    for(let i=0; i<nbpoke.length; i++){
      document.getElementById("choice_"+poke[nbpoke[i]].name).addEventListener("mouseover", function(event){
        if((!p1_has_chosen||!p2_has_chosen)){
          poke_div = i+1;
          if(!p1_has_chosen){
            event.target.style.border="2px solid red";
            for(let j=0; j<nbpoke.length; j++){
              if(j != i){
                document.getElementById("choice_"+poke[nbpoke[j]].name).style.border = "0px";
              }
            }
          }
          else if(!p2_has_chosen){
            event.target.style.border="2px solid grey";
            for(let j=0; j<nbpoke.length; j++){
              if(j != i && j != p1_index){
                document.getElementById("choice_"+poke[nbpoke[j]].name).style.border = "0px";
              }
            }
          }
        }
      });
      document.getElementById("choice_"+poke[nbpoke[i]].name).addEventListener("mouseleave", function(event){
        event.target.style.border="0px";
      });
      document.getElementById("choice_"+poke[nbpoke[i]].name).addEventListener("click", function(event){
        if(!p1_has_chosen){
          event.target.style.border="0px";
          document.getElementById("player1_choice").children[1].style.backgroundImage = "url('src/medias/menu/choice_"+poke[nbpoke[i]].name+".png')";
          document.getElementById("player1_choice").children[2].innerHTML = poke[nbpoke[i]].name;
          p1 = poke[nbpoke[i]];
          p1_has_chosen = true;
          p1_index = i;
        }
        else if(!p2_has_chosen){
          event.target.style.border="0px";
          document.getElementById("player2_choice").children[1].style.backgroundImage = "url('src/medias/menu/choice_"+poke[nbpoke[i]].name+".png')";
          document.getElementById("player2_choice").children[2].innerHTML = poke[nbpoke[i]].name;
          p2 = poke[nbpoke[i]];
          p2_has_chosen = true;
          p2_index = i;
          poke_div = 50;
          selected_div = 5;
        }
      });
    }
  }
  poke_choices_created = true;
}
function playMenuHandler(event){
  if(event.key == 'ArrowLeft'){
    if(poke_div <= 21){
      if(poke_div > 1){
        poke_div--;
      }
      else if(poke_div == 1){
        poke_div = 21;
      }
    }
    else{
      if(selected_div == 5){
        pokeball.style.transform = 'rotateZ(0deg)';
        text.style.transform = 'scale(1.0)';
        selected_div = 6;
        size = 1;
        angle = 0;
      }
      else{
        pokeball.style.transform = 'rotateZ(0deg)';
        text.style.transform = 'scale(1.0)';
        selected_div = 5;
        size = 1;
        angle = 0;
      }
    }
  }
  if(event.key == 'ArrowRight'){
    if(poke_div <= 21){
      if(poke_div < 21){
        poke_div++;
      }
      else if(poke_div == 21){
        poke_div = 1;
      }
    }
    else{
      if(selected_div == 5){
        pokeball.style.transform = 'rotateZ(0deg)';
        text.style.transform = 'scale(1.0)';
        selected_div = 6;
        size = 1;
        angle = 0;
      }
      else{
        pokeball.style.transform = 'rotateZ(0deg)';
        text.style.transform = 'scale(1.0)';
        selected_div = 5;
        size = 1;
        angle = 0;
      }
    }
  }
  if(event.key == 'ArrowUp'){
    if(poke_div <= 21 && (!p1_has_chosen||!p2_has_chosen)){
      if((poke_div/7) > 1){
        poke_div = poke_div - 7;
      }
      else poke_div = poke_div + 14;
    }
    else poke_div = poke_div - 7;
  }
  if(event.key == 'ArrowDown'){
    if(poke_div <= 21 && (!p1_has_chosen||!p2_has_chosen)){
      if(((poke_div+7)/7) <= 3){
        poke_div = poke_div + 7;
      }
      else poke_div = poke_div - 14;
    }
    else poke_div = poke_div - 14;
  }
  if(event.key == 'Enter'){
    let nbpoke = Object.keys(poke);
    if(selected_div == 6){ // Back
      main_menu = true;
      one_player_menu = false;
      two_players_menu = false;
      hidePlayMenu();
      selected_div = 1;
    }
    else if(!p1_has_chosen){
      document.getElementById("player1_choice").children[1].style.backgroundImage = "url('src/medias/menu/"+poke_id+".png')";
      document.getElementById("player1_choice").children[2].innerHTML = poke[poke_id.substring(7).toLowerCase()].name;
      p1 = poke[poke_id.substring(7).toLowerCase()];
      p1_has_chosen = true;
      p1_index = nbpoke.indexOf(poke_id.substring(7).toLowerCase());
    }
    else if(!p2_has_chosen){
      document.getElementById("player2_choice").children[1].style.backgroundImage = "url('src/medias/menu/"+poke_id+".png')";
      document.getElementById("player2_choice").children[2].innerHTML = poke[poke_id.substring(7).toLowerCase()].name;
      p2 = poke[poke_id.substring(7).toLowerCase()];
      p2_has_chosen = true;
      p2_index = nbpoke.indexOf(poke_id.substring(7).toLowerCase());
      poke_div = 50;
      selected_div = 5;
    }
    else if(p1_has_chosen && p2_has_chosen){ // Play game 1 player or 2 players
      if(selected_div == 5){
        main_menu = true;
        if(one_player_menu){
            one_player_menu = false;
            two_players = false;
        }
        else if(two_players_menu){
          two_players_menu = false;
          two_players = true;
        }
        menu = false;
        hidePlayMenu();
        hideMenu();
        showBorders();
        selected_div = 1;
        musicplay = false;
        menuSound.pause();
      }
    }
  }
  if(event.key == 'Escape'){
    if(!p1_has_chosen && !p2_has_chosen){
      main_menu = true;
      if(one_player_menu){
        one_player_menu = false;
        two_players = false;
      }
      else if(two_players_menu){
        two_players_menu = false;
        two_players = false;
      }
      hidePlayMenu();
      selected_div = 1;
    }
    if(p1_has_chosen && !p2_has_chosen){
      document.getElementById("player1_choice").children[1].style.backgroundImage = "url('src/medias/menu/interrogation.png')";
      document.getElementById("player1_choice").children[2].innerHTML = "";
      p1_has_chosen = false;
      poke_div = 1;
    }
    if(p1_has_chosen && p2_has_chosen){
      document.getElementById("player2_choice").children[1].style.backgroundImage = "url('src/medias/menu/interrogation.png')";
      document.getElementById("player2_choice").children[2].innerHTML = "";
      p2_has_chosen = false;
      poke_div = 1;
    }
  }
}
function poke_border(){
  for(let j=0; j<nbpoke.length; j++){
    document.getElementById("choice_"+poke[nbpoke[j]].name).style.border = "0px";
  }
}

function showPokemonsMenu(){
  hideMenu();
  show_PokeChoices();
  document.getElementById("retour").style.visibility = "visible";
  document.getElementById("screen_title").style.visibility = "visible";
  document.getElementById("screen_desc").style.visibility = "visible";
  document.getElementById("poke_desc").style.visibility = "visible";
  pokemons_menuChoice();
  poke_div = 1;
  pokemons_showDesc();
}
function hidePokemonsMenu(){
  showMenu();
  hide_PokeChoices();
  document.getElementById("retour").style.visibility = "hidden";
  document.getElementById("screen_title").style.visibility = "hidden";
  document.getElementById("screen_desc").style.visibility = "hidden";
  document.getElementById("poke_desc").style.visibility = "hidden";
  menuChoice();
  selected_div = 3;
}
function pokemonsMenuHandler(event){
  if(event.key == 'ArrowLeft'){
    if(poke_div <= 21){
      if(poke_div > 1){
        poke_div--;
      }
      else if(poke_div == 1){
        poke_div = 21;
      }
    }
  }
  if(event.key == 'ArrowRight'){
    if(poke_div <= 21){
      if(poke_div < 21){
        poke_div++;
      }
      else if(poke_div == 21){
        poke_div = 1;
      }
    }
  }
  if(event.key == 'ArrowUp'){
    if(poke_div <= 21){
      if((poke_div/7) > 1){
        poke_div = poke_div - 7;
      }
      else poke_div = poke_div + 14;
    }
    else poke_div = poke_div - 7;
  }
  if(event.key == 'ArrowDown'){
    if(poke_div <= 21){
      if((poke_div/7) <= 4){
        poke_div = poke_div + 7;
      }
    }
  }
  if(poke_div <= 21){
    pokemons_showDesc();
  }
  if(event.key == "Enter"){
    if(poke_div>21){
      main_menu = true;
      pokemons_menu = false;
      hidePokemonsMenu();
    }
  }
  if(event.key == "Escape"){
    hidePokemonsMenu();
  }
}
function pokemons_menuChoice(){
  document.getElementById("retour").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 6;
    node_id = "retour";
    angle = 0;
    size = 1;
    poke_div = 50;
  }
  document.getElementById("retour").onclick = function(){
    main_menu = true;
    pokemons_menu = false;
    hidePokemonsMenu();
  }
  let nbpoke = Object.keys(poke);
  for(let i=0; i<nbpoke.length; i++){
    document.getElementById("choice_"+poke[nbpoke[i]].name).addEventListener("mouseover", function(event){
      poke_div = i+1;
      event.target.style.border="2px solid red";
      pokemons_showDesc();
      for(let j=0; j<nbpoke.length; j++){
        if(j != i){
          document.getElementById("choice_"+poke[nbpoke[j]].name).style.border = "0px";
        }
      }
    });
    document.getElementById("choice_"+poke[nbpoke[i]].name).addEventListener("mouseleave", function(event){
      event.target.style.border="0px";
    });
  }
}
function pokemons_showDesc(){
  let nbpokes = Object.keys(poke);
  console.log(poke[nbpokes[poke_div-1]].name);
  document.getElementById("poke_image").style.backgroundImage = "url('src/medias/menu/choice_"+poke[nbpokes[poke_div-1]].name+".png')";
  document.getElementById("poke_name").innerHTML = poke[nbpokes[poke_div-1]].name;
  document.getElementById("desc").innerHTML = poke[nbpokes[poke_div-1]].desc;
  document.getElementById("power").innerHTML = "Pouvoir : "+poke[nbpokes[poke_div-1]].type.desc;
}

function showOptionsMenu(){
  hideMenu();
  document.getElementById("retour").style.visibility = "visible";
  document.getElementById("screen_title").style.visibility = "visible";
  document.getElementById("options_menu").style.visibility = "visible";
  if(show_fps){
    document.getElementById("options_showfps").children[1].style.backgroundImage = "url('src/medias/menu/valide.png')";
  }
  else document.getElementById("options_showfps").children[1].style.backgroundImage = "url('src/medias/menu/non_valide.png')";
  if(show_dev_menu){
    document.getElementById("options_showdev").children[1].style.backgroundImage = "url('src/medias/menu/valide.png')";
  }
  else document.getElementById("options_showdev").children[1].style.backgroundImage = "url('src/medias/menu/non_valide.png')";
  options_menuChoice();
  selected_option = 1;
  update_Volume(sound_volume);
  update_Terrain(selected_terrain);
}
function hideOptionsMenu(){
  showMenu();
  document.getElementById("retour").style.visibility = "hidden";
  document.getElementById("screen_title").style.visibility = "hidden";
  document.getElementById("options_menu").style.visibility = "hidden";
  selected_div = 4;
}
function optionsMenuHandler(event){
  if(event.key == 'ArrowLeft'){
    if(selected_option == 1){
      if(sound_volume > 0){
        sound_volume--;
        update_Volume(sound_volume);
      }
    }
    if(selected_option == 4){
      if(selected_terrain > 1){
        selected_terrain--;
        update_Terrain(selected_terrain);
      }
    }
  }
  if(event.key == 'ArrowRight'){
    if(selected_option == 1){
      if(sound_volume < 10){
        sound_volume++;
        update_Volume(sound_volume);
      }
    }
    if(selected_option == 4){
      if(selected_terrain < 3){
        selected_terrain++;
        update_Terrain(selected_terrain);
      }
    }
  }
  if(event.key == 'ArrowDown'){
    if(selected_option <= 4){
      text.style.transform = 'scale(1.0)';
      selected_option++;
      size_opt = 1;
    }
  }
  if(event.key == 'ArrowUp'){
    if(selected_option > 1 ){
      if(selected_option <= 4){
        text.style.transform = 'scale(1.0)';
        selected_option--;
        size_opt = 1;
      }
      else selected_option = 4;
    }
  }
  if(event.key == "Escape"){
    main_menu = true;
    options_menu = false;
    hideOptionsMenu();
  }
  if(event.key == "Enter"){
    if(selected_option > 4){
      main_menu = true;
      options_menu = false;
      hideOptionsMenu();
    }
    if(selected_option == 2){
      if(!show_fps){
        show_fps = true;
        document.getElementById("options_showfps").children[1].style.backgroundImage = "url('src/medias/menu/valide.png')";
      }
      else{
        show_fps = false;
        document.getElementById("options_showfps").children[1].style.backgroundImage = "url('src/medias/menu/non_valide.png')";
      }
    }
    if(selected_option == 3){
      if(!show_dev_menu){
        show_dev_menu = true;
        document.getElementById("options_showdev").children[1].style.backgroundImage = "url('src/medias/menu/valide.png')";
      }
      else{
        show_dev_menu = false;
        document.getElementById("options_showdev").children[1].style.backgroundImage = "url('src/medias/menu/non_valide.png')";
      }
    }
  }
}
function options_menuChoice(){
  document.getElementById("retour").onmouseover = function(){
    pokeball.style.transform = 'rotateZ(0deg)';
    text.style.transform = 'scale(1.0)';
    selected_div = 6;
    node_id = "retour";
    angle = 0;
    size = 1;
    selected_option = 50;
  }
  document.getElementById("retour").onclick = function(){
    main_menu = true;
    options_menu = false;
    hideOptionsMenu();
  }
  document.getElementById("options_volume").onmouseover = function(){
    text.style.transform = 'scale(1.0)';
    selected_option = 1;
  }
  document.getElementById("options_showfps").onmouseover = function(){
    text.style.transform = 'scale(1.0)';
    selected_option = 2;
  }
  document.getElementById("options_showfps").onclick = function(){
    if(!show_fps){
      show_fps = true;
      document.getElementById("options_showfps").children[1].style.backgroundImage = "url('src/medias/menu/valide.png')";
    }
    else{
      show_fps = false;
      document.getElementById("options_showfps").children[1].style.backgroundImage = "url('src/medias/menu/non_valide.png')";
    }
  }
  document.getElementById("options_showdev").onmouseover = function(){
    text.style.transform = 'scale(1.0)';
    selected_option = 3;
  }
  document.getElementById("options_showdev").onclick = function(){
    if(!show_dev_menu){
      show_dev_menu = true;
      document.getElementById("options_showdev").children[1].style.backgroundImage = "url('src/medias/menu/valide.png')";
    }
    else{
      show_dev_menu = false;
      document.getElementById("options_showdev").children[1].style.backgroundImage = "url('src/medias/menu/non_valide.png')";
    }
  }
  document.getElementById("options_terrain").onmouseover = function(){
    text.style.transform = 'scale(1.0)';
    selected_option = 4;
  }
  for(let i=1; i<=10; i++){
    if(i<=3){
      document.getElementById("terrain_"+i).onmouseover = function(){
        selected_terrain = i;
        update_Terrain(selected_terrain);
      }
    }
    document.getElementById("sound_"+i).onmouseover = function(){
      sound_volume = i;
      update_Volume(sound_volume);
    }
  }
}
function option_selected(selected_option){
  switch(selected_option){
    case 1:
      node_id = "options_volume";
      break;
    case 2:
      node_id = "options_showfps";
      break;
    case 3:
      node_id = "options_showdev";
      break;
    case 4:
      node_id = "options_terrain";
      break;
    default:
      break;
  }
}
function update_Volume(sound_volume){
  for(let i=1; i<=10; i++){
    if(i <= sound_volume){
      if(i <= 3){
        document.getElementById("sound_"+i).style.backgroundColor = "green";
      }
      else if(i <= 6){
        document.getElementById("sound_"+i).style.backgroundColor = "yellow";
      }
      else if(i <= 8){
        document.getElementById("sound_"+i).style.backgroundColor = "orange";
      }
      else{
        document.getElementById("sound_"+i).style.backgroundColor = "red";
      }
    }
    else{
      document.getElementById("sound_"+i).style.backgroundColor = "transparent";
    }
  }
  menuSound.volume = sound_volume/10.0;
}
function update_Terrain(selected_terrain){
  switch(selected_terrain){
    case 1:
      terrain = 'stadium';
      break;
    case 2:
      terrain = 'desert';
      break;
    case 3:
      terrain = 'sky';
      break;
    default:
      break;
  }
  document.getElementById("terrain_"+selected_terrain).style.color = "green";
  for(let i=1; i<=3; i++){
    if(i != selected_terrain){
      document.getElementById("terrain_"+i).style.color = "white";
    }
  }
}

export {two_players, p1, p2, showMenu, menu_loop, show_fps, show_dev_menu, terrain, sound_volume};
