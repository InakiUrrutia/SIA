var geometry, faceMaterial, material, object;
var sky, tower;

sky = new THREE.Group();
geometry = new THREE.BoxBufferGeometry( 60, 60, 60);
tower = new THREE.Group();
faceMaterial = [
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox3/skybox3_lf.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// RIGHT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox3/skybox3_rt.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// LEFT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox3/skybox3_bk.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// BACK
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox3/skybox3_ft.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// FRONT
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox3/skybox3_up.png'), transparent: true, opacity: 1.0, side: THREE.BackSide}),// TOP
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/skybox3/skybox3_dn.png'), transparent: true, opacity: 1.0, side: THREE.BackSide})// BOTTOM
];
material = new THREE.MeshFaceMaterial(faceMaterial);
object = new THREE.Mesh(geometry, material);
object.position.y = -6;
object.position.z = -7;
sky.add(object);
geometry = new THREE.CylinderGeometry( 17, 20, 35, 50 );
faceMaterial = [
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/tower_texture.jpg'), transparent: true, opacity: 1.0, side: THREE.FrontSide}),
  new THREE.MeshBasicMaterial({map:new THREE.TextureLoader().load('src/medias/textures/Roof.jpg'), transparent: true, opacity: 1.0, side: THREE.FrontSide}),
  new THREE.MeshBasicMaterial({color:0x888888}),
];
material = new THREE.MeshFaceMaterial(faceMaterial);
object = new THREE.Mesh(geometry, material);
object.rotateX(THREE.Math.degToRad(90));
object.position.z = -20.6;
tower.add(object);
sky.add(tower);

export {sky};
