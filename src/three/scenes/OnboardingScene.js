import * as THREE from 'three';
import stageModel from '../../assets/models/stage.gltf';
import globals from '../globals';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import GameObjectManager from '../objects/GameObjectManager';
import CameraInfo from '../objects/CameraInfo';
import User from '../objects/User';
import gsap from 'gsap';
import ContainerMount from '../objects/ContainerMount';
import { Power1 } from 'gsap/gsap-core';

class OnboardingScene {
  constructor() {
    this.name = 'overview';
    this.scene = new THREE.Scene();
    globals.scene = this.scene;
    this.scene.background = new THREE.Color('#ffdde1');
    console.log(globals);

    const addLight = (...pos) => {
      const color = 0xffffff;
      const intensity = 0.4;
      const light = new THREE.PointLight(color, intensity);
      light.position.set(...pos);
      light.castShadow = true;
      light.shadow.radius = 10;
      console.log(light.shadow);
      this.scene.add(light);
      // scene.add(light.target);
      globals.light = light;
    };
    addLight(1, 3, 2);
    const light = new THREE.PointLight(0xffffff, 0.4);
    light.position.set(-1, 2, 5);
    this.scene.add(light);

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

    const hemiLight = new THREE.HemisphereLight();
    hemiLight.intensity = 0.4;
    this.scene.add(hemiLight);

    const repositionModel = mroot => {
      const bbox = new THREE.Box3().setFromObject(mroot);
      const cent = bbox.getCenter(new THREE.Vector3());
      const size = bbox.getSize(new THREE.Vector3());

      // Rescale the object to normalized space
      // const maxAxis = Math.max(size.x, size.y, size.z);
      mroot.scale.multiplyScalar(1.0 / 200);
      bbox.setFromObject(mroot);
      bbox.getCenter(cent);
      bbox.getSize(size);

      //Reposition to 0,halfY,0
      mroot.position.copy(cent).multiplyScalar(-1);
      mroot.position.y -= size.y * 0.5;
    };
    // var geometry = new THREE.BoxGeometry(2.5, 2, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x555555 });
    // var cube = new THREE.Mesh(geometry, material);
    // cube.position.set(2.5, -0.3, 0);
    // cube.castShadow = true;
    // cube.receiveShadow = true;
    // globals.scene.add(cube);

    // load model

    let loadingManager;
    if (!globals.models.stretcher.gltf) {
      loadingManager = new THREE.LoadingManager();

      loadingManager.onProgress = (url, itemsLoaded, itemsTotal) => {
        const percent = ((itemsLoaded / itemsTotal) * 100) | 0;
        console.log('loading:', `${percent}%`);
      };

      const gltfLoader = new GLTFLoader(loadingManager);

      gltfLoader.load(globals.models.stretcher.file, gltf => {
        repositionModel(gltf.scene);

        gltf.scene.traverse(node => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
          }
        });
        globals.models.stretcher.gltf = gltf;
      });
    }

    const prepModelsAndAnimations = () => {
      const box = new THREE.Box3();
      const size = new THREE.Vector3();
      const model = globals.models.stretcher;
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
    };

    const clearObjectLook = () => {
      Object.keys(globals.looks).forEach(lookCat => {
        const wearedItemKey = globals.character[lookCat];
        globals.looks[lookCat].forEach((itemName, key) => {
          if (key !== wearedItemKey) {
            const object = this.scene.getObjectByName(itemName, true);
            if (object) {
              object.visible = false;
            }
          }
        });
      });
    };

    // add model to scene
    this.gameObjectManager = new GameObjectManager();

    const init = () => {
      // add camera object
      prepModelsAndAnimations();
      globals.camera.rotation.x = 0;
      globals.camera.position.set(1.7, -2.5, 5);
      {
        const gameObject = this.gameObjectManager.createGameObject(
          globals.camera,
          'camera',
          globals
        );
        globals.cameraInfo = gameObject.addComponent(CameraInfo);
      }
      gsap.set(globals.camera.position, { y: 2, z: 7, x: 1.8 });
      gsap.set(globals.camera.rotation, { x: 1 });
      // add user object
      {
        const gameObject = this.gameObjectManager.createGameObject(
          this.scene,
          'user',
          globals
        );
        globals.user = gameObject.addComponent(User, globals.models.stretcher);
        globals.user.inputManager = this.inputManager;
      }
      let stage;
      const gltfLoader = new GLTFLoader();
      gltfLoader.load(stageModel, gltf => {
        repositionModel(gltf.scene);

        gltf.scene.traverse(node => {
          if (node instanceof THREE.Mesh) {
            node.castShadow = true;
            node.receiveShadow = true;
          }
        });
        stage = gltf.scene;
        stage.scale.x = 0.01;
        stage.scale.y = 0.01;
        stage.scale.z = 0.01;
        stage.position.x = 0.5;
        stage.position.y = -1.2;
        stage.position.z = -0.5;
        console.log(stage);
        globals.scene.add(gltf.scene);
        this.containerMount = new ContainerMount(stage, '#vast');
      });
      clearObjectLook();
      gsap.to(globals.camera.rotation, { x: 0 });
      gsap.to(globals.camera.position, 1, { ease: Power1.easeOut, y: 0.6 });
    };
    if (loadingManager) {
      loadingManager.onLoad = init;
    } else {
      init();
    }
  }

  historyUpdate() {
    this.containerMount.updateElement();
  }

  changeLook() {
    Object.keys(globals.looks).forEach(lookCat => {
      globals.looks[lookCat].forEach(lookName => {
        const currentName = globals.looks[lookCat][globals.character[lookCat]];
        if (lookName !== currentName) {
          const object = this.scene.getObjectByName(lookName, true);
          if (object) {
            object.visible = false;
          }
        } else {
          const object = this.scene.getObjectByName(lookName, true);
          if (object) {
            object.visible = true;
          }
        }
      });
    });
  }

  update() {
    if (this.containerMount) {
      this.containerMount.update();
    }
    if (globals.user) {
      globals.user.update();
    }
  }
}

export default OnboardingScene;
