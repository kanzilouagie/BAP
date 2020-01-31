import { getScene, getCamera, getCameraDefaultPos } from './store';
import gsap from 'gsap';

export const loadDetailView = object => {
  if (object) {
    const scene = getScene();
    const camera = getCamera();

    // change camera position relative to object
    const posZ = object.position.z + 2.5;
    const posX = object.position.x + 0.2;
    gsap.to(camera.position, 0.5, {
      z: posZ,
      x: posX,
      y: object.position.y
    });

    // add more fog to the scene
    gsap.to(scene.fog, 0.5, { near: 2, far: 3 });
  }
};

export const exitDetailView = () => {
  const scene = getScene();
  const camera = getCamera();
  const defaultPos = getCameraDefaultPos();

  // set position back to default
  gsap.to(camera.position, 0.5, {
    z: defaultPos.z,
    x: defaultPos.x,
    y: defaultPos.y
  });

  //set fog back to default
  gsap.to(scene.fog, 0.5, { near: 5, far: 10 });
};
