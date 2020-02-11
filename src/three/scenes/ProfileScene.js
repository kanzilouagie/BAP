import * as THREE from 'three';
import globals from '../globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import GameObjectManager from '../objects/GameObjectManager';
import InputManager from '../objects/InputManager';
import WorldManager from '../objects/WorldManager';
import CameraInfo from '../objects/CameraInfo';
import Player from '../objects/Player';

class ProfileScene {
  constructor() {
    this.name = 'overview';
    this.scene = new THREE.Scene();
    globals.scene = this.scene;
    this.scene.background = new THREE.Color('#ccc');
  }

  update() {}
}

export default ProfileScene;
