import Component from './Component';
import * as THREE from 'three';
import SkinInstance from './SkinInstance';
import globals from '../globals';

class User extends Component {
  constructor(gameObject, model) {
    super(gameObject);
    this.skinInstance = gameObject.addComponent(SkinInstance, model);
    // this.skinInstance.setAnimation('Run');
    this.gameObject.transform.position.y = 0.55;
    this.gameObject.transform.position.x = 0.5;
  }

  update() {
    // const { transform } = this.gameObject;
    // transform.rotation.y += 0.01;
  }
}

export default User;
