var velociteX_p1 = 0.0, velociteZ_p1 = 0.0;
var velociteX_p2 = 0.0, velociteZ_p2 = 0.0;
var velocite_max_p1 = 0.3, velocite_max_p2= 0.3;

var stop_up_p1=false, stop_down_p1=false, stop_left_p1=false, stop_right_p1=false;
var stop_up_p2=false, stop_down_p2=false, stop_left_p2=false, stop_right_p2=false;

function moveLeft(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){ // Player 1
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_right_p1 = false;
    stop_left_p1 = false;
    if(velociteX_p1 <= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p1 = velociteX_p1/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p1 = velociteX_p1/1.2 + 0.0075;
      }
      else velociteX_p1 = velociteX_p1/1.1 + 0.005;
    }
    else if(velociteX_p1 < velocite_max_p1){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p1 = velociteX_p1*poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p1 = velociteX_p1*1.2 + 0.0075;
      }
      else velociteX_p1 = velociteX_p1*1.1 + 0.005;
    }
    movePlayerX(1,object);
  }
  else{ // Player 2
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_right_p2 = false;
    stop_left_p2 = false;
    if(velociteX_p2 <= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p2 = velociteX_p2/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p2 = velociteX_p2/1.2 + 0.0075;
      }
      else velociteX_p2 = velociteX_p2/1.1 + 0.005;
    }
    else if(velociteX_p2 < velocite_max_p2){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p2 = velociteX_p2*poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p2 = velociteX_p2*1.2 + 0.0075;
      }
      else velociteX_p2 = velociteX_p2*1.1 + 0.005;
    }
    movePlayerX(2,object);
  }
}

function moveRight(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){ // Player 1
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_right_p1 = false;
    stop_left_p1 = false;
    if(velociteX_p1 >= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p1 = velociteX_p1/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p1 = velociteX_p1/1.2 - 0.0075;
      }
      else velociteX_p1 = velociteX_p1/1.1 - 0.005;
    }
    else if(velociteX_p1 > -velocite_max_p1){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p1 = velociteX_p1*poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p1 = velociteX_p1*1.2 - 0.0075;
      }
      else velociteX_p1 = velociteX_p1*1.1 - 0.005;
    }
    movePlayerX(1,object);
  }
  else{ // Player 2
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_right_p2 = false;
    stop_left_p2 = false;
    if(velociteX_p2 >= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p2 = velociteX_p2/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p2 = velociteX_p2/1.2 - 0.0075;
      }
      else velociteX_p2 = velociteX_p2/1.1 - 0.005;
    }
    else if(velociteX_p2 > -velocite_max_p2){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p2 = velociteX_p2*poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p2 = velociteX_p2*1.2 - 0.0075;
      }
      else velociteX_p2 = velociteX_p2*1.1 - 0.005;
    }
    movePlayerX(2,object);
  }
}

function moveUp(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){ // Player 1
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_up_p1 = false;
    stop_down_p1 = false;
    if(velociteZ_p1 <= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p1 = velociteZ_p1/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p1 = velociteZ_p1/1.1 + 0.0075;
      }
      else velociteZ_p1 = velociteZ_p1/1.05 + 0.005;
    }
    else if(velociteZ_p1 < velocite_max_p1){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p1 = velociteZ_p1*poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p1 = velociteZ_p1*1.1 + 0.0075;
      }
      else velociteZ_p1 = velociteZ_p1*1.05 + 0.005;
    }
    movePlayerZ(1,object);
  }
  else{ // Player 2
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_up_p2 = false;
    stop_down_p2 = false;
    if(velociteZ_p2 <= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p2 = velociteZ_p2/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p2 = velociteZ_p2/1.1 + 0.0075;
      }
      else velociteZ_p2 = velociteZ_p2/1.05 + 0.005;
    }
    else if(velociteZ_p2 < velocite_max_p2){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p2 = velociteZ_p2*poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p2 = velociteZ_p2*1.1 + 0.0075;
      }
      else velociteZ_p2 = velociteZ_p2*1.05 + 0.005;
    }
    movePlayerZ(2,object);
  }
}

function moveDown(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){ // Player 1
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_up_p1 = false;
    stop_down_p1 = false;
    if(velociteZ_p1 >= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p1 = velociteZ_p1/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p1 = velociteZ_p1/1.1 - 0.0075;
      }
      else velociteZ_p1 = velociteZ_p1/1.05 - 0.005;
    }
    else if(velociteZ_p1 > -velocite_max_p1){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p1 = velociteZ_p1*poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p1 = velociteZ_p1*1.1 - 0.0075;
      }
      else velociteZ_p1 = velociteZ_p1*1.05 - 0.005;
    }
    movePlayerZ(1,object);
  }
  else{ // Player 2
    setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power);
    stop_up_p2 = false;
    stop_down_p2 = false;
    if(velociteZ_p2 >= 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p2 = velociteZ_p2/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p2 = velociteZ_p2/1.1 - 0.0075;
      }
      else velociteZ_p2 = velociteZ_p2/1.05 - 0.005;
    }
    else if(velociteZ_p2 > -velocite_max_p2){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p2 = velociteZ_p2*poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p2 = velociteZ_p2*1.1 - 0.0075;
      }
      else velociteZ_p2 = velociteZ_p2*1.05 - 0.005;
    }
    movePlayerZ(2,object);
  }
}

function stop_moveLeft(n_player,object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){ // Player 1
    if(velociteX_p1 > 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p1 = velociteX_p1/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p1 = velociteX_p1/1.2 - 0.0075;
      }
      else velociteX_p1 = velociteX_p1/1.1 - 0.005;
      movePlayerX(1,object);
    }
    else{
      velociteX_p1 = 0.0;
      stop_left_p1 = false;
    }
  }
  else{ // Player 2
    if(velociteX_p2 > 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p2 = velociteX_p2/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p2 = velociteX_p2/1.2 - 0.0075;
      }
      else velociteX_p2 = velociteX_p2/1.1 - 0.005;
      movePlayerX(2,object);
    }
    else{
      velociteX_p2 = 0.0;
      stop_left_p2 = false;
    }
  }
}

function stop_moveRight(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){
    if(velociteX_p1 < 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p1 = velociteX_p1/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p1 = velociteX_p1/1.2 + 0.0075;
      }
      else velociteX_p1 = velociteX_p1/1.1 + 0.005;
      movePlayerX(1,object);
    }
    else{
      velociteX_p1 = 0.0;
      stop_right_p1 = false;
    }
  }
  else{
    if(velociteX_p2 < 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteX_p2 = velociteX_p2/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteX_p2 = velociteX_p2/1.2 - 0.0075;
      }
      else velociteX_p2 = velociteX_p2/1.1 + 0.005;
      movePlayerX(2,object);
    }
    else{
      velociteX_p2 = 0.0;
      stop_right_p2 = false;
    }
  }
}

function stop_moveUp(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){
    if(velociteZ_p1 > 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p1 = velociteZ_p1/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p1 = velociteZ_p1/1.2 - 0.0075;
      }
      else velociteZ_p1 = velociteZ_p1/1.05 - 0.005;
      movePlayerZ(1,object);
    }
    else{
      velociteZ_p1 = 0.0;
      stop_up_p1 = false;
    }
  }
  else{
    if(velociteZ_p2 > 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p2 = velociteZ_p2/poke2.type.start_power() - 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p2 = velociteZ_p2/1.2 - 0.0075;
      }
      else velociteZ_p2 = velociteZ_p2/1.05 - 0.005;
      movePlayerZ(2,object);
    }
    else{
      velociteZ_p2 = 0.0;
      stop_up_p2 = false;
    }
  }
}

function stop_moveDown(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){
    if(velociteZ_p1 < 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p1 = velociteZ_p1/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p1 = velociteZ_p1/1.2 + 0.0075;
      }
      else velociteZ_p1 = velociteZ_p1/1.05 + 0.005;
      movePlayerZ(1,object);
    }
    else{
      velociteZ_p1 = 0.0;
      stop_down_p1 = false;
    }
  }
  else{
    if(velociteZ_p2 < 0.0){
      if(p2_use_power && poke2.type.name == 'Eau'){
        velociteZ_p2 = velociteZ_p2/poke2.type.start_power() + 0.0025;
      }
      else if(p1_use_power && poke1.type.name == 'Vol'){
        velociteZ_p2 = velociteZ_p2/1.2 + 0.0075;
      }
      else velociteZ_p2 = velociteZ_p2/1.05 + 0.005;
      movePlayerZ(2,object);
    }
    else{
      velociteZ_p2 = 0.0;
      stop_down_p2 = false;
    }
  }
}

function movePlayerX(n_player, object){
  let boundingBox = new THREE.Box3().setFromObject(object);
  let object_size = boundingBox.getSize();
  if(n_player == 1){ // Player 1
    if(velociteX_p1 > 0.0){ // X+
      if(object.position.x + (object_size.x/2.0) + velociteX_p1 < 10){
        object.position.x += velociteX_p1;
      }
      else object.position.x = 10 - (object_size.x/2.0);
    }
    else{ // X-
      if(object.position.x - (object_size.x/2.0) + velociteX_p1 > -10){
        object.position.x += velociteX_p1;
      }
      else object.position.x = -10 + (object_size.x/2.0);
    }
  }
  else{ // Player 2
    if(velociteX_p2 > 0.0){ // X+
      if(object.position.x + (object_size.x/2.0) + velociteX_p2 < 10){
        object.position.x += velociteX_p2;
      }
      else object.position.x = 10 - (object_size.x/2.0);
    }
    else{ // X-
      if(object.position.x - (object_size.x/2.0) + velociteX_p2 > -10){
        object.position.x += velociteX_p2;
      }
      else object.position.x = -10 + (object_size.x/2.0);
    }
  }
}

function movePlayerZ(n_player,object){
  let boundingBox = new THREE.Box3().setFromObject(object);
  let object_size = boundingBox.getSize();
  if(n_player == 1){ // Player 1
    if(velociteZ_p1 > 0.0){ // Z+
      if(object.position.z + (object_size.z/2.0) + velociteZ_p1 < 7){
        object.position.z += velociteZ_p1/2.0;
      }
      else object.position.z = 7 - (object_size.z/2.0);
    }
    else{ // Z-
      if(object.position.z - (object_size.z/2.0) + velociteZ_p1 > -3){
        object.position.z += velociteZ_p1/2.0;
      }
      else object.position.z = -3 + (object_size.z/2.0);
    }
  }
  else{ // Player 2
    if(velociteZ_p2 > 0.0){ // Z+
      if(object.position.z + (object_size.z/2.0) + velociteZ_p2 < 7){
        object.position.z += velociteZ_p2/2.0;
      }
      else object.position.z = 7 - (object_size.z/2.0);
    }
    else{ // Z-
      if(object.position.z - (object_size.z/2.0) + velociteZ_p2 > -3){
        object.position.z += velociteZ_p2/2.0;
      }
      else object.position.z = -3 + (object_size.z/2.0);
    }
  }
}

function setVelociteMax(n_player, object, poke1, p1_use_power, poke2, p2_use_power){
  if(n_player == 1){
    if(p2_use_power && poke2.type.name == 'Electrique'){
      velocite_max_p1 -= poke2.type.start_power();
    }
    if(p1_use_power && poke1.type.name == 'Vol'){
      velocite_max_p1 += poke1.type.start_power();
    }
  }
  else{
    if(p2_use_power && poke2.type.name == 'Electrique'){
      velocite_max_p2 -= poke2.type.start_power();
    }
    if(p1_use_power && poke1.type.name == 'Vol'){
      velocite_max_p2 += poke1.type.start_power();
    }
  }
}
