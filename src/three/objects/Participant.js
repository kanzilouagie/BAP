import Component from './Component';
import SkinInstance from './SkinInstance';
import globals from '../globals';
import gsap from 'gsap';
import firebase from '../../authentication/base';

class Participant extends Component {
  constructor(gameObject, model, inputManager, gameObjectManager) {
    super(gameObject);
    this.modelScene = model.gltf.scene;
    this.modelScene.getObjectByName('bril', true).visible = true;
    // skinInstance.setAnimation('Idle');
    this.offscreenTimer = 0;
    this.maxTimeOffScreen = 1;
    this.maxDistanceFromCamera = 15;
    this.hitRadius = model.size / 2;
    this.transform = gameObject.transform;
    this.playerTranform = globals.player.gameObject.transform;
    this.name = gameObject.name;
    this.inputManager = inputManager;
    this.gameObjectManager = gameObjectManager;
    this.gameObject = gameObject;
    this.transform.scale.x = 0.1;
    this.transform.scale.y = 0.1;
    gsap.to(this.transform.scale, 0.5, { x: 1, y: 1 });

    const clearObjectLook = characterData => {
      const character = characterData.character || {};
      Object.keys(globals.looks).forEach(lookCat => {
        const wearedItemKey = character[lookCat] || 0;
        globals.looks[lookCat].forEach((itemName, key) => {
          if (key !== wearedItemKey) {
            const object = this.modelScene.getObjectByName(itemName, true);
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
          .doc(this.name)
          .get()
      ).data();
      clearObjectLook(characterData);

      if (characterData.character) {
        const character = characterData.character;
        Object.keys(globals.looks).forEach(lookCat => {
          globals.looks[lookCat].forEach(lookName => {
            const currentName = globals.looks[lookCat][character[lookCat]];
            if (lookName !== currentName) {
              const object = this.modelScene.getObjectByName(lookName, true);
              if (object) {
                object.visible = false;
              }
            } else {
              const object = this.modelScene.getObjectByName(lookName, true);
              if (object) {
                object.visible = true;
              }
            }
          });
        });
      }
      const skinInstance = gameObject.addComponent(SkinInstance, model);
      skinInstance.mixer.timeScale = globals.moveSpeed / 4;
    };
    dressUp();
  }

  isClose(obj1, obj1Radius, obj2, obj2Radius) {
    const minDist = obj1Radius + obj2Radius;
    const dist = obj1.position.distanceTo(obj2.position);
    return dist < minDist;
  }

  update() {
    const { camera } = globals;
    const { transform } = this.gameObject;

    // If object is too far from camera;
    const zPos = transform.position.z;
    const xPos = transform.position.x;
    const zPosCam = camera.position.z;
    const xPosCam = camera.position.x;
    const distanceCameraZ = zPos - zPosCam;
    const distanceCameraX = xPos - xPosCam;

    if (
      distanceCameraZ > this.maxDistanceFromCamera - 5 ||
      distanceCameraZ < -this.maxDistanceFromCamera - 5 ||
      distanceCameraX < -this.maxDistanceFromCamera ||
      distanceCameraX > this.maxDistanceFromCamera
    ) {
      this.gameObjectManager.removeGameObject(this.gameObject);
    }

    if (
      this.isClose(
        this.transform,
        this.hitRadius,
        this.playerTranform,
        globals.playerRadius
      )
    ) {
      gsap.to(this.transform.position, 1, { y: 1 });
    } else {
      gsap.to(this.transform.position, 1, { y: 0.4 });
    }

    //check if player is close
    if (this.inputManager.keys.spacebar.justPressed) {
      if (
        this.isClose(
          this.transform,
          this.hitRadius,
          this.playerTranform,
          globals.playerRadius
        ) &&
        !globals.closeCharacter.includes(this.name)
      ) {
        globals.closeCharacter.push(this.name);
        console.log(globals.closeCharacter);
        globals.history.push(`/detail/${this.name}`);
      } else if (
        !this.isClose(
          this.transform,
          this.hitRadius,
          this.playerTranform,
          globals.playerRadius
        )
      ) {
        globals.closeCharacter.splice(
          globals.closeCharacter.indexOf(this.name),
          1
        );
      }
    }
  }
}

export default Participant;
