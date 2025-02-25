import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';


const loadingManager = new THREE.LoadingManager();

let onLoadProgress = null;
let onLoadComplete = null;

loadingManager.onProgress = function (_url, itemsLoaded, itemsTotal) {
    const progress = Math.round((itemsLoaded / itemsTotal) * 100);
    if (onLoadProgress) onLoadProgress(progress);
};

loadingManager.onLoad = function () {
    if (onLoadComplete) onLoadComplete();
};

const loaders = {
    glb: new GLTFLoader(loadingManager),
    gltf: new GLTFLoader(loadingManager),
    obj: new OBJLoader(loadingManager),
    fbx: new FBXLoader(loadingManager),
    stl: new STLLoader(loadingManager)
};

export function setLoadHandlers(progressCallback, completeCallback) {
    onLoadProgress = progressCallback;
    onLoadComplete = completeCallback;
}

export function loadModel(carModel, sceneData, colorBody, envTexture) {
    const loader = loaders[carModel.format.toLowerCase()];
    if (!loader) {
        alert(`Unsupported format: ${carModel.format}`);
        return;
    }

    loader.load(carModel.model, 
        function (obj){
            if (!obj || !obj.scene) {
                return;
            };

            obj.scene.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    console.log(child.name)
                    const name = child.name;
                    const material = child.material;
                    
                    material.envMap = envTexture;
                    
                    if(carModel.shortName === "G63" && name === "Body" || carModel.shortName === "C63" && name ===  "Body001"){
                        material.roughness = 0.3;
                        material.metalness = 0.9;
                        material.color.set(`#${colorBody}`);
                        material.clearcoat = 0;
                        material.clearcoatRoughness = 0.2;
                        sceneData.bodyMaterials.push(material);
                    }

                    if (carModel.shortName === "W140"){
                        carModel.materialProccessFunction(name, material, sceneData, colorBody)
                    }
                    
                }
            });

            const model = obj.scene;
            model.scale.set(1,1,1);
            model.position.set(0,-0.45,0);
            sceneData.scene.add(model);
        }
    );
}