import * as THREE from 'three';
import globals from './globals';

const main = () => {
  console.log('three loaded');

  // SETUP THREEJS //
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const fov = 50;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  globals.canvas = canvas;
  globals.camera = camera;
  camera.position.set(0, 2, 10);

  // CANVAS SETUP //

  const resizeRendererToDisplaySize = renderer => {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  };
  let emptyScene = new THREE.Scene();
  emptyScene.background = new THREE.Color('#ffdde1');
  let then = 0;
  const render = now => {
    // convert to seconds
    globals.time = now * 0.001;
    globals.deltaTime = Math.min(globals.time - then, 1 / 20);
    then = globals.time;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    if (globals.currentScene) {
      globals.currentScene.update();
      renderer.render(globals.currentScene.scene, camera);
    } else {
      renderer.render(emptyScene, camera);
    }

    // limit fps
    setTimeout(() => {
      requestAnimationFrame(render);
    }, 1000 / 110);
  };
  render();
};

export default main;
