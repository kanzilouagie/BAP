import {
  PlaneBufferGeometry,
  Mesh,
  BoxGeometry,
  HemisphereLight,
  MeshLambertMaterial,
  ShadowMaterial,
  PointLight,
  Fog,
  AnimationMixer,
  LoopOnce,
  Box3,
  Vector3
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { getScene, getCamera, addToObjects } from './store';
import runnersData from './store/dataExample.json';
import gltfModel from '../assets/models/character.gltf';

const loader = new GLTFLoader();

export const loadRunnersWorld = () => {
  const scene = getScene();
  addLights(scene);
  drawFloor(scene);
  const runners = runnersData.runners;
  runners.forEach((runner, key) => {
    // drawRunner(scene, key * 2, runner);
    drawRunner(scene, key * 2, runner);
  });

  //fog
  scene.fog = new Fog('#ffffff', 5, 10);
};

const addLights = scene => {
  // global light
  const hemiLight = new HemisphereLight();
  hemiLight.intensity = 0.2;
  scene.add(hemiLight);

  // SPOTLIGHT
  const camera = getCamera();
  const pointLight = new PointLight(0xffffff, 1);
  pointLight.position.set(5, 5, 6);

  pointLight.castShadow = true;

  // HELPER
  // const pointLightHelper = new CameraHelper(pointLight.shadow.camera);
  // scene.add(pointLightHelper);

  // pointLight.target.position.set(-1, 0, 1);
  console.log(pointLight);
  pointLight.update = () => {
    pointLight.position.x = -4 + camera.position.x;
  };
  scene.add(pointLight);
};

const drawFloor = scene => {
  const camera = getCamera();
  const planeGeometry = new PlaneBufferGeometry(20, 20, 32, 32);
  const planeMaterial = new ShadowMaterial();
  // const planeMaterial = new MeshLambertMaterial({
  //   color: '#0000',
  //   wireframe: false
  // });

  planeMaterial.opacity = 0.2;
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.name = 'floor';
  // make sure plane moves along with camera.
  plane.update = () => {
    plane.position.x = camera.position.x;
  };
  scene.add(plane);
  plane.rotation.x -= Math.PI / 2;
  plane.position.y = -0.51;
};

export const objectIsClicked = (obj, history) => {
  history.push(`/detail/${obj.id}`);
};

const drawRunner = (scene, xpos, runnerData) => {
  loader.load(gltfModel, model => {
    repositionModel(model.scene);
    // model.scene.position.set(0, 0, 0);
    model.scene.position.x = xpos;
    model.scene.position.y = 0.2;
    model.scene.update = () => {
      // model.scene.rotation.y += 0.01;
    };
    model.scene.traverse(node => {
      if (node instanceof Mesh) {
        node.castShadow = true;
        // node.position.set(0, 290, 0);
      }
    });
    model.scene.message = runnerData.message;
    scene.add(model.scene);
    addToObjects(model.scene);
  });
};

const repositionModel = mroot => {
  const bbox = new Box3().setFromObject(mroot);
  const cent = bbox.getCenter(new Vector3());
  const size = bbox.getSize(new Vector3());

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
