import * as THREE from 'three';
import globals from '../globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import GameObjectManager from '../objects/GameObjectManager';
import InputManager from '../objects/InputManager';
import WorldManager from '../objects/WorldManager';
import CameraInfo from '../objects/CameraInfo';
import Player from '../objects/Player';
import gsap from 'gsap';

class OverviewScene {
  constructor() {
    console.log('loadScene');
    this.name = 'overview';
    this.scene = new THREE.Scene();
    globals.scene = this.scene;
    this.scene.background = new THREE.Color('#ffdde1');

    const addLight = (...pos) => {
      const color = 0xffffff;
      const intensity = 0.8;
      const light = new THREE.PointLight(color, intensity);
      light.position.set(...pos);
      light.castShadow = true;
      this.scene.add(light);
      // scene.add(light.target);
      globals.light = light;
    };
    addLight(2, 3, 2);

    const hemiLight = new THREE.HemisphereLight();
    hemiLight.intensity = 0.4;
    this.scene.add(hemiLight);

    const addFloor = () => {
      const planeGeometry = new THREE.PlaneBufferGeometry(20, 20, 32, 32);
      const planeMaterial = new THREE.ShadowMaterial({
        color: '#111111',
        wireframe: false
      });

      planeMaterial.opacity = 0.2;
      const plane = new THREE.Mesh(planeGeometry, planeMaterial);
      plane.receiveShadow = true;
      plane.name = 'floor';
      this.scene.add(plane);
      plane.rotation.x -= Math.PI / 2;
      plane.position.y = -1.25;
      globals.floor = plane;
    };
    addFloor();

    // Load models
    const manager = new THREE.LoadingManager();
    console.log('testjes');
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const percent = ((itemsLoaded / itemsTotal) * 100) | 0;
      console.log('loading:', `${percent}%`);
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

    const gltfLoader = new GLTFLoader(manager);
    for (const model of Object.values(globals.models)) {
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

    this.gameObjectManager = new GameObjectManager();
    this.inputManager = new InputManager();
    this.world = new WorldManager(
      this.gameObjectManager,
      globals.models.stretcher
    );
    globals.inputManager = this.inputManager;

    const prepModelsAndAnimations = () => {
      const box = new THREE.Box3();
      const size = new THREE.Vector3();
      Object.values(globals.models).forEach(model => {
        box.setFromObject(model.gltf.scene);
        box.getSize(size);
        model.size = size.length();
        const animsByName = {};
        model.gltf.animations.forEach(clip => {
          animsByName[clip.name] = clip;
        });
        model.animations = animsByName;
      });
    };

    const init = () => {
      // add camera object
      prepModelsAndAnimations();
      globals.camera.rotation.x = 0;
      gsap.to(globals.camera.rotation, 0.25, { x: -0.5 });
      {
        const gameObject = this.gameObjectManager.createGameObject(
          globals.camera,
          'camera',
          globals
        );
        globals.cameraInfo = gameObject.addComponent(CameraInfo);
      }
      // add player object
      {
        const gameObject = this.gameObjectManager.createGameObject(
          this.scene,
          'player',
          globals
        );
        globals.player = gameObject.addComponent(Player, globals.models);
        globals.player.inputManager = this.inputManager;
      }
    };
    manager.onLoad = init;
  }

  update() {
    this.gameObjectManager.update();
    this.inputManager.update();
    this.world.update();
  }
}

export default OverviewScene;
