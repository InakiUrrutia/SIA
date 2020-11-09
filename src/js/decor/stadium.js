var wallGeometry, sphereGeometry, material, faceMaterial, light, object, terrain;
var person, body, head;
var i=0, j=0, random;

var public1, public2;
var stadium;

stadium = new THREE.Group();
public1 = new THREE.Group();
public2 = new THREE.Group();

// stadium
// darkgrey walls
wallGeometry = new THREE.BoxBufferGeometry( 0.5, 40, 4);
material = new THREE.MeshPhongMaterial({color: 0x444444});
object = new THREE.Mesh( wallGeometry, material, );
object.position.z = -1.2;
object.position.x = -15;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.z = -1.2;
object.position.x = 15;
stadium.add(object);
wallGeometry = new THREE.BoxBufferGeometry( 30, 0.5, 4);
object = new THREE.Mesh( wallGeometry, material, );
object.position.z = -1.2;
object.position.y = -20;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.z = -1.2;
object.position.y = 20;
stadium.add(object);
// light grey walls
wallGeometry = new THREE.BoxBufferGeometry( 0.5, 40, 20);
material = new THREE.MeshPhongMaterial({color: 0xbbbbbb});
object = new THREE.Mesh( wallGeometry, material, );
object.rotateY(THREE.Math.degToRad(45));
object.position.x = 22.5;
object.position.z = 7.5;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.rotateY(THREE.Math.degToRad(-45));
object.position.x = -22.5;
object.position.z = 7.5;
stadium.add(object);
// dark red walls posts
wallGeometry = new THREE.BoxBufferGeometry( 0.5, 0.5, 20);
material = new THREE.MeshPhongMaterial({color: 0x5e0600});
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = 29;
object.position.y = 20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = 18;
object.position.y = 20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = -18;
object.position.y = 20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = -29;
object.position.y = 20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = 29;
object.position.y = -20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = 18;
object.position.y = -20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = -18;
object.position.y = -20.25;
object.position.z = 6.75;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = -29;
object.position.y = -20.25;
object.position.z = 6.75;
stadium.add(object);
//dark red roofs
wallGeometry = new THREE.BoxBufferGeometry( 12, 41, 1);
material = new THREE.MeshPhongMaterial({color: 0x5e0600});
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = 23.5;
object.position.y = 0;
object.position.z = 17;
stadium.add(object);
object = new THREE.Mesh( wallGeometry, material, );
object.position.x = -23.5;
object.position.y = 0;
object.position.z = 17;
stadium.add(object);
//add lights to stadium
light = new THREE.DirectionalLight( 0xFFFFFF, 0.6 );
light.position.set( 18,20,18 ).normalize();
light.target.position.set( -20,0, 0 );
stadium.add(light);
light = new THREE.DirectionalLight( 0xFFFFFF, 0.6 );
light.position.set( -18,20,18 ).normalize();
light.target.position.set( -20,0, 0 );
stadium.add(light);
//public
wallGeometry = new THREE.BoxBufferGeometry( 0.8, 0.8, 3);
sphereGeometry = new THREE.SphereBufferGeometry(0.6, 10, 10);
//public on the left
for(i=0;i<5;i++){
  for(j=0; j<18; j++){
    random = Math.random();
    material = new THREE.MeshPhongMaterial({color: 0x000000});
    body = new THREE.Mesh( wallGeometry, material, );
    head = new THREE.Mesh( sphereGeometry, material );
    body.position.x = 17 + (2*i);
    body.position.y = ((30/15.0) * j)-17;
    body.position.z = 4 + (2*i);
    head.position.x = body.position.x;
    head.position.y = body.position.y;
    head.position.z = body.position.z + 2;
    person = new THREE.Group();
    person.add(body,head);
    if(random <= 0.5){
      public1.add(person);
    }
    else{
      public2.add(person);
    }
  }
}
//public on the right
for(i=0;i<5;i++){
  for(j=0; j<18; j++){
    random = Math.random();
    material = new THREE.MeshPhongMaterial({color: 0x000000});
    body = new THREE.Mesh( wallGeometry, material, );
    head = new THREE.Mesh( sphereGeometry, material );
    body.position.x = -17 - (2*i);
    body.position.y = ((30/15.0) * j)-17;
    body.position.z = 4 + (2*i);
    head.position.x = body.position.x;
    head.position.y = body.position.y;
    head.position.z = body.position.z + 2;
    person = new THREE.Group();
    person.add(body,head);
    if(random <= 0.5){
      public1.add(person);
    }
    else{
      public2.add(person);
    }
  }
}
//skybox
wallGeometry = new THREE.BoxBufferGeometry( 60, 60, 60);
faceMaterial = [
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox1/skybox1_rt.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// LEFT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox1/skybox1_lf.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// RIGHT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox1/skybox1_bk.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// BACK
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox1/skybox1_ft.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// FRONT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox1/skybox1_up.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// TOP
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox1/skybox1_dn.png'), transparent: true, opacity: 1.0, side: THREE.BackSide})// BOTTOM
];
material = new THREE.MeshFaceMaterial(faceMaterial);
object = new THREE.Mesh(wallGeometry, material);
object.position.z = 26.8;
stadium.add(object);

export {stadium, public1, public2};
