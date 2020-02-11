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

  update() {
    // check if stored participants are still alive
    this.aliveParticipants.forEach(alive => {
      if (!this.gameObjectManager.gameObjects.array.includes(alive)) {
        this.aliveParticipants.splice(this.aliveParticipants.indexOf(alive), 1);
      }
    });

    if (this.aliveParticipants.length < 6 && this.allParticipants.length > 0) {
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
      gameObject.transform.position.x = (Math.random() - 0.5) * 20;
      gameObject.transform.position.x += globals.camera.position.x;
      gameObject.transform.position.z = (Math.random() - 0.5) * 20;
      gameObject.transform.position.z += globals.camera.position.z - 5;
      gameObject.transform.rotation.y = (Math.random() - 0.5) * 2;
      this.loadedParticipants += 1;
      this.aliveParticipants.push(gameObject);
    }
    // console.log(globals.camera.position.x);
  }
}

export default WorldManager;
