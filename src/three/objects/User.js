import Component from './Component';
import * as THREE from 'three';
import SkinInstance from './SkinInstance';
import globals from '../globals';

class User extends Component {
  constructor(gameObject, model) {
    super(gameObject);
    this.skinInstance = gameObject.addComponent(SkinInstance, model);
    // this.skinInstance.setAnimation('Run');
  }

  update() {
    const { transform } = this.gameObject;
    transform.rotation.y += 1;
  }
}

export default User;
