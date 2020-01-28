import {
  PlaneBufferGeometry,
  Mesh,
  BoxGeometry,
  HemisphereLight,
  CameraHelper,
  MeshLambertMaterial,
  ShadowMaterial,
  PointLight
} from 'three';
import gsap from 'gsap';
import { getScene, getCamera } from './store';
import runnersData from './store/dataExample.json';

export const loadRunnersWorld = () => {
  const scene = getScene();
  addLights(scene);
  drawFloor(scene);
  const runners = runnersData.runners;
  runners.forEach((runner, key) => {
    drawRunner(scene, key * 2, runner);
  });
};

export const moveCamera = direction => {
  const camera = getCamera();
  const lastPosition = camera.position.x;
  const movingValue = 20;
  switch (direction) {
    case 'LEFT': {
      const val = lastPosition + movingValue;
      gsap.to(camera.position, 1, { x: val });
      break;
    }
    case 'RIGHT': {
      const val = lastPosition - movingValue;
      gsap.to(camera.position, 1, { x: val });
      break;
    }
    default:
      break;
  }
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

  // make sure plane moves along with camera.
  plane.update = () => {
    plane.position.x = camera.position.x;
  };
  scene.add(plane);
  plane.rotation.x -= Math.PI / 2;
  plane.position.y = -0.51;
};

const drawRunner = (scene, xpos, runner) => {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshLambertMaterial({
    color: runner.color,
    wireframe: false
  });
  const cube = new Mesh(geometry, material);
  cube.castShadow = true;
  // cube.rotation.x += 0.5;
  cube.position.x = xpos;
  cube.update = () => {
    cube.rotation.y += 0.01;
  };

  cube.message = runner.message;

  scene.add(cube);
};
