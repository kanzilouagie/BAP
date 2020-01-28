import {
  PlaneBufferGeometry,
  Mesh,
  BoxGeometry,
  SpotLight,
  HemisphereLight,
  CameraHelper,
  MeshLambertMaterial,
  ShadowMaterial
} from 'three';
import { getScene } from './store';

export const loadRunnersWorld = () => {
  const scene = getScene();
  addLights(scene);
  drawFloor(scene);
  drawCube(scene);
};

const addLights = scene => {
  // global light
  const hemiLight = new HemisphereLight();
  hemiLight.intensity = 0.2;
  scene.add(hemiLight);

  // SPOTLIGHT
  const spotLight = new SpotLight(0xffffff, 1);
  spotLight.position.set(5, 5, 6);

  spotLight.castShadow = true;

  // HELPER
  const spotLightHelper = new CameraHelper(spotLight.shadow.camera);
  scene.add(spotLightHelper);

  spotLight.target.position.set(-1, 0, 1);

  scene.add(spotLight);
};

const drawFloor = scene => {
  const planeGeometry = new PlaneBufferGeometry(20, 20, 32, 32);
  const planeMaterial = new ShadowMaterial();
  planeMaterial.opacity = 0.2;
  const plane = new Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  scene.add(plane);
  plane.rotation.x -= Math.PI / 2;
  plane.position.y = -1.2;
};

const drawCube = scene => {
  const geometry = new BoxGeometry(1, 1, 1);
  const material = new MeshLambertMaterial({
    color: 0x11aaff,
    wireframe: false
  });
  const cube = new Mesh(geometry, material);
  cube.castShadow = true;
  cube.rotation.x += 0.5;

  cube.update = () => {
    cube.rotation.y += 0.01;
  };

  scene.add(cube);
};
