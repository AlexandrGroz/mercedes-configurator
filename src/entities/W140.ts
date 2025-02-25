import W140 from "./W140.glb";
import W140Pic from "./W140_pic.png";


// @ts-expect-error material-type
function _140Material(name, material, sceneData, color){
    const bodyArray = ["body_1", "body_19", "body_6"]

    if(bodyArray.includes(name)){
        material.roughness = 0.3;
        material.metalness = 0.9;
        material.color.set(`#${color}`);
        material.clearcoat = 0;
        material.clearcoatRoughness = 0.2;
        sceneData.bodyMaterials.push(material);
    }
    else if (name === "body_8") {
        material.color.set(0x181818);
    }
    else if (name === "w140_headlightglass_L") {
        material.transparent = true; 
        material.opacity = 0.1; 
    }
    else if (name ==="w140_windshield_ton"){
        material.roughness = 0.2; 
        material.metalness = 0.5; 
        material.transparent = true; 
        material.opacity = 0.1; 
    }
}


export const W140Model = {
    fullName: "Mercedes W140",
    shortName: "W140",
    model: W140,
    format: "glb",
    buttonImage: W140Pic,
    materialProccessFunction: _140Material,
}