var geometry, material;

var xaxis, yaxis, zaxis;

// X-Axis
geometry = new THREE.CubeGeometry( 10, 0.1, 0.1 );
material = new THREE.MeshBasicMaterial({color: 0x00FF00}); // Green color
xaxis = new THREE.Mesh( geometry, material, );

// Y-Axis
geometry = new THREE.CubeGeometry( 0.1, 10, 0.1 );
material = new THREE.MeshBasicMaterial({color: 0xFF0000}); // Red color
yaxis = new THREE.Mesh( geometry, material, );

// Z-Axis
geometry = new THREE.CubeGeometry( 0.1, 0.1, 10 );
material = new THREE.MeshBasicMaterial({color: 0x0000FF}); // Blue color
zaxis = new THREE.Mesh( geometry, material, );

export {xaxis, yaxis, zaxis};
