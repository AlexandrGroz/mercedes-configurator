import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { venvTextures } from '../models/index.ts';
import shadow from './shadow.jpg';
import { loadModel, setLoadHandlers } from './load_models.js';

export function CreateScene(blockRef, wrapperRef, carModel, colorBody, setProgress, isMobile = false) {
    if (!blockRef) {
        alert("Canvas for visualization wasn't found.");
        return null;
    }

    /** Base variables **/
    const canvas = blockRef;
    const width = blockRef.clientWidth;
    const height = blockRef.clientHeight;

    /** Scene **/
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xe9e9e9);
    scene.fog = new THREE.Fog(0xcacaca, 5, 35);

    /** Environment **/
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

    /** Camera **/
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    const z = isMobile ? 8 : 5;
    camera.position.set(1, 0.4, z);

    /** Controls **/
    const controls = new OrbitControls(camera, canvas);
    controls.minPolarAngle = 0;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enablePan = false;
    controls.rotateSpeed = 0.45;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.update();

    /** Renderer **/
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });

    /** Scene data **/
    const sceneData = {
        scene,
        camera,
        renderer,
        bodyMaterials: [],
    };

    /** Loaders **/
    setLoadHandlers(setProgress, () => setProgress(100));
    loadModel(carModel, sceneData, colorBody, envTexture);

    /** Shadow **/
    const textureLoader = new THREE.TextureLoader();
    const shadowTexture = textureLoader.load(shadow, () => {
        shadowTexture.minFilter = THREE.LinearFilter;
        shadowTexture.magFilter = THREE.LinearFilter;
        shadowTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        shadowTexture.colorSpace = THREE.SRGBColorSpace;
    });

    const shadowPlane = new THREE.Mesh(
        new THREE.PlaneGeometry(8.5, 8.5),
        new THREE.MeshBasicMaterial({
            map: shadowTexture,
            transparent: true,
            opacity: 0.6,
        })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.495;
    scene.add(shadowPlane);

    /** Ground Circle **/
    const circle = new THREE.Mesh(
        new THREE.CircleGeometry(20, 40),
        new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    circle.rotation.x = -Math.PI / 2;
    circle.position.y = -0.5;
    scene.add(circle);

    /** Lights **/
    scene.add(new THREE.HemisphereLight(0xffffff, 0xffffff, 1.5));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(-10, 5, 7);
    dirLight.target.position.set(0, 0, -2);
    scene.add(dirLight, dirLight.target);

    /** Resize logic **/
    function resizeRendererToDisplaySize() {
        const pixelRatio = window.devicePixelRatio;
        const width = Math.floor(wrapperRef.clientWidth * pixelRatio);
        const height = Math.floor(wrapperRef.clientHeight * pixelRatio);
        const canvas = renderer.domElement;

        if (width === 0 || height === 0) return false;

        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            renderer.setSize(width, height, false);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }
        return needResize;
    }

    const resizeObserver = new ResizeObserver(() => resizeRendererToDisplaySize());
    resizeObserver.observe(wrapperRef);

    window.addEventListener('resize', resizeRendererToDisplaySize);

    /** Animation loop **/
    let isRunning = true;

    function animate() {
        if (!isRunning) return;
        resizeRendererToDisplaySize();
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    return {
        ...sceneData,
        stop: () => {
            isRunning = false;
            controls.dispose();
            renderer.dispose();
            resizeObserver.disconnect();
            window.removeEventListener('resize', resizeRendererToDisplaySize);
        },
    };
}
