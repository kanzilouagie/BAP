import * as THREE from 'three';
import player from '../assets/models/character.gltf';
import idle from '../assets/models/idle.gltf';
import walker from '../assets/models/walking.gltf';

const globals = {
  /*  camera,
  canvas,
*/

  debug: false,
  time: 0,
  moveSpeed: 4,
  deltaTime: 0,
  player: null,
  kForward: new THREE.Vector3(0, 0, 1),
  closeCharacter: [],
  models: {
    runner: { file: player },
    stretcher: { file: idle },
    walker: { file: walker }
  },
  character: {
    head: 0,
    body: 0,
    foot: 0
  },
  looks: {
    head: ['none', 'piercing', 'hoofdbandje'],
    body: ['none', 'zwembandjes', 'bril', 'zweetbandjes'],
    foot: ['none', 'SOCKS']
  }
};
export default globals;
