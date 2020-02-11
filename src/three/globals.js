import * as THREE from 'three';

const globals = {
  /*  camera,
  canvas,
*/

  debug: false,
  time: 0,
  moveSpeed: 4,
  deltaTime: 0,
  player: null,
  labelContainerElem: '#labels', // document.querySelector("#labels")
  kForward: new THREE.Vector3(0, 0, 1),
  congaLine: [],
  closeCharacter: []
};
export default globals;
