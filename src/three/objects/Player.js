import Component from './Component';
import * as THREE from 'three';
import SkinInstance from './SkinInstance';
import globals from '../globals';
import firebase from '../../authentication/base';

const kForward = new THREE.Vector3(0, 0, 0);

class Player extends Component {
  constructor(gameObject, models) {
    super(gameObject);
    const model = models.stretcher;
    this.isRunning = false;
    this.turnSpeed = globals.moveSpeed;
    this.offscreenTimer = 0;
    this.maxTimeOffScreen = 1;
    this.maxDistanceFromCamera = -20;
    globals.playerRadius = model.size / 2;

    const clearObjectLook = characterData => {
      const character = characterData.character || {};
      Object.keys(globals.looks).forEach(lookCat => {
        const wearedItemKey = character[lookCat] || 0;
        globals.looks[lookCat].forEach((itemName, key) => {
          if (key !== wearedItemKey) {
            const object = model.gltf.scene.getObjectByName(itemName, true);
            if (object) {
              object.visible = false;
            }
          }
        });
      });
    };

    const dressUp = async () => {
      const characterData = await (
        await firebase
          .firestore()
          .collection('users')
          .doc(firebase.auth().currentUser.uid)
          .get()
      ).data();
      clearObjectLook(characterData);

      if (characterData.character) {
        const character = characterData.character;
        Object.keys(globals.looks).forEach(lookCat => {
          globals.looks[lookCat].forEach(lookName => {
            const currentName = globals.looks[lookCat][character[lookCat]];
            if (lookName !== currentName) {
              const object = model.gltf.scene.getObjectByName(lookName, true);
              if (object) {
                object.visible = false;
              }
            } else {
              const object = model.gltf.scene.getObjectByName(lookName, true);
              if (object) {
                object.visible = true;
              }
            }
          });
        });
      }
      this.skinInstance = gameObject.addComponent(SkinInstance, model);
      // this.skinInstance.setAnimation('animation_0');
    };
    dressUp();
  }

  update() {
    // this.skinInstance.update();
    const { deltaTime, moveSpeed, camera, cameraInfo, floor } = globals;
    const { transform } = this.gameObject;
    const { inputManager } = this;
    const delta =
      (inputManager.keys.left.down ? 1 : 0) +
      (inputManager.keys.right.down ? -1 : 0);
    transform.rotation.y += this.turnSpeed * delta * deltaTime;

    if (inputManager.keys.up.down ? kForward.setZ(1) : kForward.setZ(0))
      transform.translateOnAxis(kForward, moveSpeed * deltaTime);

    // move camera with player
    camera.position.x = transform.position.x;
    camera.position.y = transform.position.y + 5;
    camera.position.z = transform.position.z + 10;

    globals.light.position.x = transform.position.x + 2;
    globals.light.position.y = transform.position.y + 3;
    globals.light.position.z = transform.position.z + 3;
    // move floor with player
    floor.position.x = transform.position.x;
    floor.position.z = transform.position.z;

    // If object is too far from camera;
    const zPos = transform.position.z;
    const zPosCam = camera.position.z;
    const distanceCamera = zPos - zPosCam;

    if (distanceCamera < this.maxDistanceFromCamera) {
      transform.position.set(0, 0, 0);
    }

    // if object is out of camera view
    const { frustum } = cameraInfo;
    if (frustum.containsPoint(transform.position)) {
      this.offscreenTimer = 0;
    } else {
      this.offscreenTimer += deltaTime;
      if (this.offscreenTimer >= this.maxTimeOffScreen) {
        transform.position.set(0, 0, 0);
      }
    }
  }
}

export default Player;
