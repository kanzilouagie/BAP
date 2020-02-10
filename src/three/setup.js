import * as THREE from 'three';
import globals from './globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils.js';
import Player from './objects/Player';
import breast from '../assets/models/character.gltf';
import GameObjectManager from './objects/GameObjectManager';
import InputManager from './objects/InputManager';
import CameraInfo from './objects/CameraInfo';

const main = () => {
  // SETUP THREEJS //

  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  globals.canvas = canvas;
  globals.camera = camera;

  camera.position.set(0, 2, 10);

  const controls = new OrbitControls(camera, canvas);
  controls.enableKeys = false;
  //   controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#ffdde1');

  // ADD LIGHTS //

  const addLight = (...pos) => {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...pos);
    scene.add(light);
    scene.add(light.target);
  };

  addLight(5, 5, 2);
  addLight(-5, 5, 5);

  // LOAD MODELS //

  const manager = new THREE.LoadingManager();

  manager.onProgress = (url, itemsLoaded, itemsTotal) => {
    const percent = ((itemsLoaded / itemsTotal) * 100) | 0;
    console.log('loading:', `${percent}%`);
  };
  const models = {
    breast: { file: breast }
  };

  const gltfLoader = new GLTFLoader(manager);
  for (const model of Object.values(models)) {
    gltfLoader.load(model.file, gltf => {
      repositionModel(gltf.scene);
      model.gltf = gltf;
    });
  }
  const repositionModel = mroot => {
    const bbox = new THREE.Box3().setFromObject(mroot);
    const cent = bbox.getCenter(new THREE.Vector3());
    const size = bbox.getSize(new THREE.Vector3());

    //Rescale the object to normalized space
    // const maxAxis = Math.max(size.x, size.y, size.z);
    mroot.scale.multiplyScalar(1.0 / 200);
    bbox.setFromObject(mroot);
    bbox.getCenter(cent);
    bbox.getSize(size);

    //Reposition to 0,halfY,0
    mroot.position.copy(cent).multiplyScalar(-1);
    mroot.position.y -= size.y * 0.5;
  };

  // ADD FLOOR //

  const planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32);
  const planeMaterial = new THREE.MeshLambertMaterial({
    color: '#ffdde1',
    wireframe: true
  });

  planeMaterial.opacity = 0.2;
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.name = 'floor';
  // make sure plane moves along with camera.
  plane.update = () => {
    plane.position.x = camera.position.x;
  };
  scene.add(plane);
  plane.rotation.x -= Math.PI / 2;
  plane.position.y = -1.25;

  const gameObjectManager = new GameObjectManager();
  const inputManager = new InputManager();

  const init = () => {
    console.log('init');
    {
      const gameObject = gameObjectManager.createGameObject(
        camera,
        'camera',
        globals
      );
      globals.cameraInfo = gameObject.addComponent(CameraInfo);
    }

    {
      const gameObject = gameObjectManager.createGameObject(
        scene,
        'player',
        globals
      );
      globals.player = gameObject.addComponent(Player, models);
      globals.player.inputManager = inputManager;
    }
    // Object.values(models).forEach(model => {
    //   const clonedScene = SkeletonUtils.clone(model.gltf.scene);
    //   const root = new THREE.Object3D();
    //   root.add(clonedScene);
    //   console.log(root);
    //   scene.add(root);
    // });
  };
  manager.onLoad = init;

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
  let then = 0;
  const render = now => {
    // convert to seconds
    globals.time = now * 0.001;
    // make sure delta time isn't too big.
    globals.deltaTime = Math.min(globals.time - then, 1 / 20);
    then = globals.time;
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }
    gameObjectManager.update();
    inputManager.update();

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

export default main;
