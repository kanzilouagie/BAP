import GameObject from './GameObject';
import SafeArray from './SafeArray';
import globals from '../globals';

class GameObjectManager {
  constructor() {
    this.gameObjects = new SafeArray();
  }

  createGameObject(parent, name, globals) {
    const gameObject = new GameObject(parent, name, globals);
    this.gameObjects.add(gameObject);
    return gameObject;
  }

  removeGameObject(gameObject) {
    this.gameObjects.remove(gameObject);
    const removeObject = globals.scene.getObjectByName(gameObject.name);
    globals.scene.remove(removeObject);
  }

  update() {
    this.gameObjects.forEach(gameObject => gameObject.update());
  }
}

export default GameObjectManager;
