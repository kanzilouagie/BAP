import * as THREE from 'three';

class GameObject {
  constructor(parent, name, globals) {
    this.name = name;
    this.components = [];
    this.transform = new THREE.Object3D();
    this.transform.name = name;
    this.parent = parent;
    this.globals = globals;
    parent.add(this.transform);
  }

  addComponent(ComponentType, ...args) {
    const component = new ComponentType(this, ...args);
    this.components.push(component);
    return component;
  }

  getComponent(ComponentType) {
    return this.components.find(c => c instanceof ComponentType);
  }

  update() {
    for (const component of this.components) {
      component.update();
    }
  }
}

export default GameObject;
