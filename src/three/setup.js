import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  sRGBEncoding,
  Raycaster,
  Vector2,
  Object3D
} from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  setScene,
  setCamera,
  setIntersects,
  setCameraDefaultPos,
  getObjects
} from './store';
import { setSelectedObject } from '../store';

let renderer;
let scene;
let camera;
let intersects = [];
let raycaster = new Raycaster();
const mouse = new Vector2();

export const loadThree = threeCanvas => {
  scene = new Scene();
  camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  // initial camera position
  camera.position.set(5, 1, 5);
  setCameraDefaultPos({ x: 5, y: 1, z: 5 });

  camera.rotation.y = 0.5;
  initializeRenderer(threeCanvas);
  setScene(scene);
  setCamera(camera);
  // OrbitControls
  // const controls = new OrbitControls(camera, renderer.domElement);
  // console.log(controls);
  // controls.update();
  render();
};

export const clickedCanvas = (event, canvas) => {
  mouse.x = (event.clientX / canvas.current.offsetWidth) * 2 - 1;
  mouse.y = -(event.clientY / canvas.current.offsetHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const tmpobjects = getObjects();
  let selectedScene;
  tmpobjects.forEach(objScene => {
    const tmpIntersects = raycaster.intersectObjects(objScene.children, true);
    if (tmpIntersects.length > 0) {
      selectedScene = objScene;
    }
    setSelectedObject(selectedScene);
  });
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
