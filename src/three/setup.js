import { Scene, PerspectiveCamera, WebGLRenderer, sRGBEncoding } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { setScene, setCamera } from './store';

let renderer;
let scene;
let camera;

export const loadThree = threeCanvas => {
  scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  // initial camera position
  camera.position.set(0, 0, 5);
  initializeRenderer(threeCanvas);
  setScene(scene);
  setCamera(camera);
  // OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  console.log(controls);
  controls.update();
  render();
};

const initializeRenderer = canvas => {
  renderer = new WebGLRenderer({ antialias: true });
  renderer.outputEncoding = sRGBEncoding;
  renderer.setClearColor(0xffffff, 1); // background-color transparent
  renderer.setSize(canvas.current.offsetWidth, canvas.current.offsetHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMapSoft = true;
  canvas.current.appendChild(renderer.domElement);
};

// deze func wordt geupdate aan 60fps
const render = () => {
  requestAnimationFrame(render);
  // run update function if an object has one
  scene.traverse(obj => {
    if (typeof obj.update === 'function') {
      obj.update();
    }
  });
  renderer.render(scene, camera);
};
