var wallGeometry, faceMaterial, material, object, sphereGeometry;
var desert, cactus;

desert = new THREE.Group();
wallGeometry = new THREE.BoxBufferGeometry( 60, 60, 60);
faceMaterial = [
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox2/skybox2_rt.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// LEFT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox2/skybox2_lf.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// RIGHT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox2/skybox2_bk.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// BACK
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox2/skybox2_ft.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// FRONT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox2/skybox2_up.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// TOP
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox2/skybox2_dn.png'), transparent: true, opacity: 1.0, side: THREE.BackSide})// BOTTOM
];
material = new THREE.MeshFaceMaterial(faceMaterial);
object = new THREE.Mesh(wallGeometry, material);
object.position.z = 26.8;
desert.add(object);


material = new THREE.MeshBasicMaterial({color: 0x17731a});
drawCactus(15,7,-1); // x,y,z position of cactus
drawCactus(23,-10,-1);
drawCactus(3,-21,-1);
drawCactus(-18,-5,-1);
drawCactus(-27,9,-1);
drawCactus(-2,25,-1);
function drawCactus(x,y,z){
  cactus = new THREE.Group();
  sphereGeometry = new THREE.SphereBufferGeometry(0.6, 20, 10);
  object = new THREE.Mesh(sphereGeometry, material);
  object.scale.set(1,1,5);
  object.position.x = x;
  object.position.y = y;
  object.position.z = z;
  cactus.add(object);
  sphereGeometry = new THREE.SphereBufferGeometry(0.5, 20, 10);
  object = new THREE.Mesh(sphereGeometry, material);
  object.scale.set(2,1,1);
  object.position.x = x+1;
  object.position.y = y;
  object.position.z = z-0.5;
  cactus.add(object);
  sphereGeometry = new THREE.SphereBufferGeometry(0.5, 20, 10);
  object = new THREE.Mesh(sphereGeometry, material);
  object.scale.set(2,1,1);
  object.position.x = x-1;
  object.position.y = y;
  object.position.z = z+1;
  cactus.add(object);
  sphereGeometry = new THREE.SphereBufferGeometry(0.4, 20, 10);
  object = new THREE.Mesh(sphereGeometry, material);
  object.scale.set(1,1,2);
  object.position.x = (x-1)-0.8;
  object.position.y = y;
  object.position.z = (z+1)+0.6;
  cactus.add(object);
  sphereGeometry = new THREE.SphereBufferGeometry(0.4, 20, 10);
  object = new THREE.Mesh(sphereGeometry, material);
  object.scale.set(1,1,2);
  object.position.x = (x+1)+0.8;
  object.position.y = y;
  object.position.z = (z-0.5)+0.6;
  cactus.add(object);
  desert.add(cactus);
}

export {desert};
