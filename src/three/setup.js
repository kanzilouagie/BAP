import * as THREE from 'three';
import globals from './globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
// import { SkeletonUtils } from 'three/examples/jsm/utils/SkeletonUtils.js';
import Player from './objects/Player';
import breast from '../assets/models/character.gltf';
import GameObjectManager from './objects/GameObjectManager';
import InputManager from './objects/InputManager';
import CameraInfo from './objects/CameraInfo';
import WorldManager from './objects/WorldManager';
import Stats from 'stats.js';

const main = () => {
  console.log('three loaded');
  const stats = new Stats();
  stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
  document.body.appendChild(stats.dom);

  // SETUP THREEJS //
  const canvas = document.querySelector('#three-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas });
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const fov = 75;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  globals.canvas = canvas;
  globals.camera = camera;

  camera.position.set(0, 2, 10);

  const scene = new THREE.Scene();
  globals.scene = scene;
  scene.background = new THREE.Color('#ffdde1');

  // ADD LIGHTS //

  const addLight = (...pos) => {
    const color = 0xffffff;
    const intensity = 0.8;
    const light = new THREE.PointLight(color, intensity);
    light.position.set(...pos);
    light.castShadow = true;
    scene.add(light);
    // scene.add(light.target);
    globals.light = light;
  };
  // global light
  const hemiLight = new THREE.HemisphereLight();
  hemiLight.intensity = 0.4;
  scene.add(hemiLight);
  addLight(2, 3, 2);

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

      gltf.scene.traverse(node => {
        if (node instanceof THREE.Mesh) {
          node.castShadow = true;
        }
      });
      model.gltf = gltf;
    });
  }

  const prepModelsAndAnimations = () => {
    const box = new THREE.Box3();
    const size = new THREE.Vector3();
    Object.values(models).forEach(model => {
      box.setFromObject(model.gltf.scene);
      box.getSize(size);
      model.size = size.length();
      const animsByName = {};
      model.gltf.animations.forEach(clip => {
        animsByName[clip.name] = clip;
        // Should really fix this in .blend file
        if (clip.name === 'Walk') {
          clip.duration /= 2;
        }
      });
      model.animations = animsByName;
    });
  };

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
  const planeMaterial = new THREE.ShadowMaterial({
    color: '#111111',
    wireframe: false
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
  globals.floor = plane;

  let modelsLoaded = false;
  const gameObjectManager = new GameObjectManager();
  const inputManager = new InputManager();
  const World = new WorldManager(gameObjectManager, models.breast);
  globals.inputManager = inputManager;

  const init = () => {
    modelsLoaded = true;
    prepModelsAndAnimations();
    // add camera object
    {
      const gameObject = gameObjectManager.createGameObject(
        globals.camera,
        'camera',
        globals
      );
      globals.cameraInfo = gameObject.addComponent(CameraInfo);
    }
    // add player object
    {
      const gameObject = gameObjectManager.createGameObject(
        scene,
        'player',
        globals
      );
      globals.player = gameObject.addComponent(Player, models);
      globals.player.inputManager = inputManager;
    }
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
    stats.begin();

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
    if (modelsLoaded) {
      World.update();
    }

    renderer.render(scene, camera);

    stats.end();

    // limit fps
    setTimeout(() => {
      requestAnimationFrame(render);
    }, 1000 / 110);
  };
  render();
};

export default main;
