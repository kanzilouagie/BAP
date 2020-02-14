import Component from './Component';
import SkinInstance from './SkinInstance';
import gsap from 'gsap';

class User extends Component {
  constructor(gameObject, model) {
    super(gameObject);

    this.skinInstance = gameObject.addComponent(SkinInstance, model);
    this.gameObject.transform.position.y = 0.55;
    this.gameObject.transform.position.x = 0.5;
    this.gameObject.transform.scale.x = 0.1;
    this.gameObject.transform.scale.y = 0.1;
    this.gameObject.transform.scale.z = 0.1;
    gsap.to(this.gameObject.transform.scale, 0.5, { x: 1, y: 1, z: 1 });
  }

  update() {}
}

export default User;
