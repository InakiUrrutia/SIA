var wallGeometry, material;
var topwall, leftwall, rightwall;
var walls;

walls = new THREE.Group();

// left and rightwall
wallGeometry = new THREE.CubeGeometry( 0.2, 26, 10.4 );
material = new THREE.MeshPhongMaterial({color: 0xffffff, transparent: true, opacity: 0.1});
leftwall = new THREE.Mesh( wallGeometry, material, );
rightwall = new THREE.Mesh( wallGeometry, material, );
leftwall.position.x = 10.2;
leftwall.position.z = 2;
rightwall.position.x = -10.2;
rightwall.position.z = 2;

// top wall
wallGeometry = new THREE.CubeGeometry( 20.4, 26, 0.2 );
topwall = new THREE.Mesh( wallGeometry, material, );
topwall.position.z = 7.2;

walls.add(leftwall,rightwall, topwall);

export {walls};
