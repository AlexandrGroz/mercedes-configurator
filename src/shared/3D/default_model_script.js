import * as THREE from 'three';
import {OrbitControls} from "three/addons/controls/OrbitControls";
import {GLTFLoader} from "three/addons/loaders/GLTFLoader.js";
import {RectAreaLightUniformsLib} from "three/addons/lights/RectAreaLightUniformsLib";
import {DRACOLoader} from "three/addons/loaders/DRACOLoader";
import { venvTextures } from '../models/index.ts'


export function CreateScene(block, isReady, modelUrl, cameraValues, scaleValues, positionValues, animation =false, orbit =false, onLoadProgress, onLoadComplete) {
    if (!block) return;

    /**Переменные**/
    let canvas = block;
    const width = block.clientWidth;
    const height = block.clientHeight;
    let successGLTFLoad = false;

    /**Сцена**/
    const scene = new THREE.Scene();

    /**Камера**/
    const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
    camera.position.set(...cameraValues);

    /*Доп.настройки для камеры*/
    if (orbit){
        const controls = new OrbitControls(camera, canvas);
        controls.minPolarAngle = 1;
        controls.maxPolarAngle = Math.PI * 3 / 4;
        controls.enablePan = false;
        controls.rotateSpeed = 0.45;
        controls.enableZoom =false
        controls.update()
    }

    /**Рендер**/
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas});

    /**Материал**/
    const cube_loader = new THREE.CubeTextureLoader();
    const cube_texture = cube_loader.load([
        venvTextures.px,
        venvTextures.nx,
        venvTextures.py,
        venvTextures.ny,
        venvTextures.pz,
        venvTextures.nz,
    ]);
    cube_texture.mapping = THREE.CubeReflectionMapping;

    /**Свет**/
    RectAreaLightUniformsLib.init();
    /*Эмбиент лайт*/
    const aLight = new THREE.AmbientLight(0x404040)
    aLight.intensity = 2;
    aLight.position.set(0,2,0);
    scene.add(aLight);

    const Plight1 = new THREE.PointLight(0xFFFFFF, 100); /*Color, Intensity*/
    Plight1.position.set(12, 10, 0);
    scene.add(Plight1);

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF,1,0);
    directionalLight.position.set(0,100,0);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.top = 20;
    directionalLight.shadow.camera.bottom = -20;
    directionalLight.shadow.camera.right = 20;
    directionalLight.shadow.camera.left = -20;
    directionalLight.shadow.mapSize.set(4096,4096);
    scene.add(directionalLight);

    const skyColor = 0xB1E1FF;
    const groundColor = 0xB97A20;
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light)

    /**Loader**/
    const loadingManager = new THREE.LoadingManager();
    const gltf_loader = new GLTFLoader(loadingManager);
    let mixer;

    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
    dLoader.setDecoderConfig({type: 'js'});
    gltf_loader.setDRACOLoader(dLoader)

    loadingManager.onProgress = function (url, itemsLoaded, itemsTotal) {
        const progress = (itemsLoaded / itemsTotal) * 100;
        if (onLoadProgress) onLoadProgress(progress);
    };

    loadingManager.onLoad = function () {
        if (onLoadComplete) onLoadComplete();
    };

    gltf_loader.load(
        modelUrl,
        function (gltfModel) {
            if (!gltfModel || !gltfModel.scene) {
                return;
            }

            gltfModel.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    const gltf_material = child.material;

                    if (gltf_material) {
                        gltf_material.roughness = 0;
                        gltf_material.metalness = 1;
                        gltf_material.envMap = cube_texture;
                    }
                }
            });

            const model = gltfModel.scene;
            model.scale.set(...scaleValues);
            model.position.set(...positionValues);

            scene.add(model);

            // Настройка анимаций
            if (gltfModel.animations && gltfModel.animations.length) {
                mixer = new THREE.AnimationMixer(model);

                gltfModel.animations.forEach((clip) => {
                    const action = mixer.clipAction(clip);
                    action.setLoop(THREE.LoopRepeat, Infinity);
                    action.clampWhenFinished = false;
                    action.timeScale = 0.35;
                    action.play();
                });
            }
            successGLTFLoad = true;
        },
    );

    /**Исполняющая функция**/
    const clock = new THREE.Clock();

    /*Для адаптации изображения (Вроде работает и без этого)*/
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = Math.floor( canvas.clientWidth * pixelRatio );
        const height = Math.floor( canvas.clientHeight * pixelRatio );
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
        }
        return needResize;
    }


    function animate() {
        if (successGLTFLoad && modelUrl && block && width && width !== 0 && height && height !== 0 && isReady){
            if (resizeRendererToDisplaySize(renderer)) {
                const canvas = renderer.domElement;
                camera.aspect = canvas.clientWidth / canvas.clientHeight;
                camera.updateProjectionMatrix();
            }
            const delta = clock.getDelta();
            if (mixer) mixer.update(delta);
            if (animation) scene.rotation.y +=0.005;
            renderer.render(scene, camera);
        }
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    isReady();
}

export default CreateScene