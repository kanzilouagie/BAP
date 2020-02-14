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

    // dispose before removing
    removeObject.parent.dispose();
    globals.scene.remove(removeObject);
    globals.scene.remove(removeObject.parent);
  }

  update() {
    this.gameObjects.forEach(gameObject => gameObject.update());
  }
}

export default GameObjectManager;
