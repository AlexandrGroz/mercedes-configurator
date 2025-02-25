import * as THREE from 'three'
import { useEffect, useRef, useState } from "react";
import * as S from "./model_canvas.styles.ts";
import { CreateScene } from "~shared/3D tests/3D_base_scene.js";
import { ColorRGB, useModelStore } from "~entities";
import gsap from 'gsap';
import { AnimatePresence } from 'motion/react';

interface SceneData {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    bodyMaterials: THREE.MeshStandardMaterial[];
}

export const ModelCanvas = () => {
    const isColorBody = useModelStore((state)=> state.isColorBody);
    const isCarModel = useModelStore((state)=> state.isCarModel);

    const canvas = useRef(null);
    const wrapper = useRef(null);
    const sceneData = useRef<SceneData | null>(null);

    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);

    useEffect(() => {
        if (progress === 100) {
            setTimeout(() => setShowLoader(false), 500);
        }
    }, [progress]);


    useEffect(()=>{
        // @ts-expect-error js-file
        sceneData.current = CreateScene(canvas.current, wrapper.current, isCarModel, isColorBody[1], setProgress)

        return () => {
            if (sceneData.current) {
                setShowLoader(true)
                setProgress(0);
                sceneData.current.scene.clear();
                sceneData.current = null;
            }
        };
    },[isCarModel])


    const updateBodyColor = (color: ColorRGB) => {
        if (!sceneData.current) return;

        sceneData.current.bodyMaterials.forEach((material) => {
            gsap.to(material.color, {
                r: color.r / 255,
                g: color.g / 255,
                b: color.b / 255,
                duration: 1,
                ease: "power2.out",
            });
        });
    };

    useEffect(() => {
        if (isColorBody) {
            updateBodyColor(isColorBody[0]);
        }
    }, [isColorBody]);


    return (
        <S.CanvasWrapper ref={wrapper}>
            <AnimatePresence>
                {showLoader && (
                    <S.LoadModel
                        initial={{opacity: "0%"}}
                        animate={{opacity: "100%"}}
                        exit={{opacity: "0%"}}
                    >
                        {progress}%
                    </S.LoadModel>)
                }   
            </AnimatePresence>
            <S.MainCanvas ref={canvas}></S.MainCanvas>
        </S.CanvasWrapper>
    );
};
