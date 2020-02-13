import globals from '../globals';
import Participant from './Participant';
import firebase from '../../authentication/base';

class WorldManager {
  constructor(gameObjectManager, model) {
    this.gameObjectManager = gameObjectManager;
    this.model = model;
    this.allParticipants = [];
    this.aliveParticipants = [];
    this.loadedParticipants = 0;

    const getParticipants = async () => {
      const participants = await firebase
        .firestore()
        .collection('users')
        .get();
      participants.forEach(participant => {
        this.allParticipants.push(participant.id);
      });
    };
    getParticipants();
  }

  isClose(obj1, obj1Radius, obj2, obj2Radius) {
    const minDist = obj1Radius + obj2Radius;
    const dist = obj1.position.distanceTo(obj2.position);
    return dist < minDist;
  }

  update() {
    // check if stored participants are still alive
    this.aliveParticipants.forEach(alive => {
      if (!this.gameObjectManager.gameObjects.array.includes(alive)) {
        this.aliveParticipants.splice(this.aliveParticipants.indexOf(alive), 1);
      }
    });

    if (this.aliveParticipants.length < 12 && this.allParticipants.length > 0) {
      if (this.loadedParticipants === this.allParticipants.length)
        this.loadedParticipants = 0;
      const gameObject = this.gameObjectManager.createGameObject(
        globals.scene,
        this.allParticipants[this.loadedParticipants]
      );
      gameObject.addComponent(
        Participant,
        this.model,
        globals.inputManager,
        this.gameObjectManager
      );
      const giveRandomPos = () => {
        gameObject.transform.position.x = (Math.random() - 0.5) * 20;
        gameObject.transform.position.x += globals.camera.position.x;
        gameObject.transform.position.z = (Math.random() - 0.5) * 20;
        gameObject.transform.position.z += globals.camera.position.z - 5;
        gameObject.transform.rotation.y = (Math.random() - 0.5) * 2;
        this.aliveParticipants.forEach(otherObject => {
          const hitradius = this.model.size / 2;
          if (
            this.isClose(
              gameObject.transform,
              hitradius,
              otherObject.transform,
              hitradius
            )
          )
            giveRandomPos();
        });
      };
      giveRandomPos();
      this.loadedParticipants += 1;
      this.aliveParticipants.push(gameObject);
    }
    // console.log(globals.camera.position.x);
  }
}

export default WorldManager;
