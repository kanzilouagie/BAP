let scene;
let camera;
let intersects;
let cameraDefaultPos;

export const setCameraDefaultPos = pos => (cameraDefaultPos = pos);
export const getCameraDefaultPos = () => cameraDefaultPos;

export const setCamera = val => (camera = val);
export const getCamera = () => camera;

export const setIntersects = array => (intersects = array);
export const getIntersects = () => intersects;

export const setScene = val => (scene = val);
export const getScene = () => scene;
