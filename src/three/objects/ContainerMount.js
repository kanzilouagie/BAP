import * as THREE from 'three';
import globals from '../globals';

class ContainerMount {
  constructor(gameObject, id) {
    this.id = id;
    this.gameObject = gameObject;
    this.pos = new THREE.Vector3();
    this.container = false;
  }

  updateElement = () => {
    this.container = document.querySelector(this.id);
  };

  update() {
    const { pos } = this;
    const { canvas } = globals;
    pos.copy(this.gameObject.position);

    // get the normalized screen coordinate of that position
    pos.project(globals.camera);

    // convert the normalized position to CSS coordinates
    const x = (pos.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (pos.y * -0.5 + 0.5) * canvas.clientHeight;

    // move container to that position
    if (!this.container) {
      this.container = document.querySelector(this.id);
    } else {
      this.container.style.transform = `translate(-50rem, -65rem) translate(${x /
        10}rem,${y / 10}rem)`;
    }
  }
}

export default ContainerMount;
