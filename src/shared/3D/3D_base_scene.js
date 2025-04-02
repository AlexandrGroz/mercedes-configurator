import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { ColorGUIHelper, makeXYZGUI} from '~shared/3D/helpers.js';
import { venvTextures } from '../models/index.ts'
import shadow from './shadow.jpg'
import { loadModel, setLoadHandlers } from './load_models.js';

export function CreateScene(blockRef, wrapperRef, carModel, colorBody, setProgress){
    if (!blockRef){
        alert("Canvas for vizualisation didn't founded.")
        return;
    }

    /**Base variables**/
    let canvas = blockRef;
    const width = blockRef.clientWidth;
    const height = blockRef.clientHeight;


    /**Scene**/
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe9e9e9);
    scene.fog = new THREE.Fog(0xcacaca, 5, 35); 


    /**Enviroment**/
    const envLoader = new THREE.CubeTextureLoader();
    const envTexture = envLoader.load([
        venvTextures.px,
        venvTextures.nx,
        venvTextures.py,
        venvTextures.ny,
        venvTextures.pz,
        venvTextures.nz,
    ]);
    envTexture.mapping = THREE.CubeReflectionMapping;


    /**Camera**/
    const camera = new THREE.PerspectiveCamera(50, width/height, 0.1, 1000);
    camera.position.set(1, 0.5, 5);


    /**Additional settings for camera**/
    const controls = new OrbitControls(camera, canvas);
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.rotateSpeed = 0.45;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.update();
    

    /**Render**/
    const renderer = new THREE.WebGLRenderer({antialias: true, alpha: true, canvas});
    renderer.setSize(width, height, false);


    /**Main object**/
    const sceneData = {
        scene,
        camera,
        renderer,
        bodyMaterials: [],
    };


    /**Loader handlers**/
    setLoadHandlers(setProgress, () => setProgress(100));

    /**Loader**/
    loadModel(carModel, sceneData, colorBody, envTexture);


    /**Mercedes Shadow**/
    const textureLoader = new THREE.TextureLoader();
    const shadowTexture = textureLoader.load(shadow, () => {
        shadowTexture.minFilter = THREE.LinearFilter;
        shadowTexture.magFilter = THREE.LinearFilter;
        shadowTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        shadowTexture.colorSpace = THREE.SRGBColorSpace;
    });

    const shadowGeometry = new THREE.PlaneGeometry(8.5, 8.5); 
    const shadowMaterial = new THREE.MeshBasicMaterial({
        map: shadowTexture,
        transparent: true, 
        opacity: 0.6,
    });
    
    const shadowPlane = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.495;
    scene.add(shadowPlane);


    /*Circle*/
    const plane = new THREE.CircleGeometry( 20, 40 );
    const planeRed = new THREE.MeshBasicMaterial({
        color: 0xffffff,
    });
    const mesh = new THREE.Mesh(plane, planeRed);
    mesh.rotation.x = Math.PI * -0.5;
    mesh.position.y = -0.5;
    scene.add( mesh )

    
    /**Lights**/
    /*Hemi Light*/
    const skyColor = 0xffffff 
    const groundColor = 0xffffff;
    const hemiIntensity = 1.5;
    const hemiLight = new THREE.HemisphereLight(skyColor, groundColor, hemiIntensity);
    scene.add(hemiLight);

    /*Directional Light*/
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-10, 5, 7);
    light.target.position.set(0, 0, -2);
    scene.add(light);
    scene.add(light.target);
    

    /**Size adaptation**/
    function resizeRendererToDisplaySize(renderer) {
        const canvas = renderer.domElement;
        const pixelRatio = window.devicePixelRatio;
        const width = Math.floor(wrapperRef.clientWidth * pixelRatio);
        const height = Math.floor(wrapperRef.clientHeight * pixelRatio);
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        return needResize;
    }


    const observer = new ResizeObserver(() => {
        resizeRendererToDisplaySize(renderer);
    });

    observer.observe(wrapperRef);


    /**Executive function**/
    function animate() {
        if (resizeRendererToDisplaySize(renderer)) {
            const canvas = renderer.domElement;
            camera.aspect = canvas.clientWidth / canvas.clientHeight;
            camera.updateProjectionMatrix();
        }
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    return sceneData;
}