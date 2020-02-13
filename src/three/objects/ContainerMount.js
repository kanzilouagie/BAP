import * as THREE from 'three';
import globals from '../globals';

class ContainerMount {
  constructor(gameObject) {
    this.gameObject = gameObject;
    this.container = document.querySelector('#inhoud');
    this.pos = new THREE.Vector3();
  }

  update() {
    const { pos } = this;
    const { canvas } = globals;
    pos.copy(this.gameObject.position);
    // get the normalized screen coordinate of that position
    // x and y will be in the -1 to +1 range with x = -1 being
    // on the left and y = -1 being on the bottom
    pos.project(globals.camera);
    // convert the normalized position to CSS coordinates
    const x = (pos.x * 0.5 + 0.5) * canvas.clientWidth;
    const y = (pos.y * -0.5 + 0.5) * canvas.clientHeight;
    // move the elem to that position
    this.container.style.transform = `translate(38%, -85%) translate(${x /
      10}rem,${y / 10}rem)`;
  }
}

export default ContainerMount;