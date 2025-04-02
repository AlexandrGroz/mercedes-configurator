import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import * as S from './model_canvas.styles.ts';
import { CreateScene } from '~shared/3D/3D_base_scene.js';
import { ColorRGB, useModelStore } from '~entities';
import gsap from 'gsap';
import { AnimatePresence } from 'motion/react';
import { useMobileCheckerStore } from '~shared/mobile_checker_store/mobile_checker_store.ts';

interface SceneData {
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    bodyMaterials: THREE.MeshStandardMaterial[];
    stop?: () => void;
}

export const ModelCanvas = () => {
    // State from store
    const isMobile = useMobileCheckerStore((state) => state.isMobile);
    const [selectedColor, defaultColor] = useModelStore((state) => state.isColorBody);
    const currentModel = useModelStore((state) => state.isCarModel);

    // Refs
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sceneDataRef = useRef<SceneData | null>(null);

    // UI
    const [progress, setProgress] = useState(0);
    const [showLoader, setShowLoader] = useState(true);

    /** Animate loader disappearance */
    useEffect(() => {
        if (progress === 100) {
            const timeout = setTimeout(() => setShowLoader(false), 500);
            return () => clearTimeout(timeout);
        }
    }, [progress]);

    /** Update body color */
    const updateBodyColor = (color: ColorRGB) => {
        if (!sceneDataRef.current) return;

        sceneDataRef.current.bodyMaterials.forEach((material) => {
            gsap.to(material.color, {
                r: color.r / 255,
                g: color.g / 255,
                b: color.b / 255,
                duration: 1,
                ease: 'power2.out',
            });
        });
    };

    /** Load or re-create scene when model changes */
    useEffect(() => {
        const canvas = canvasRef.current;
        const wrapper = wrapperRef.current;

        if (!canvas || !wrapper || !currentModel) return;

        // Reset UI
        setShowLoader(true);
        setProgress(0);

        // Create scene
        sceneDataRef.current = CreateScene(
            canvas,
            wrapper,
            currentModel,
            defaultColor,
            setProgress,
            isMobile
        );

        // Cleanup on unmount or model switch
        return () => {
            const data = sceneDataRef.current;
            if (data) {
                data.stop?.();
                data.scene.clear();
                sceneDataRef.current = null;

                // Forcefully destroy GL context
                const gl = canvas.getContext('webgl');
                gl?.getExtension('WEBGL_lose_context')?.loseContext();
            }
        };
    }, [currentModel, isMobile]);

    /** Animate color change on colorBody change */
    useEffect(() => {
        if (selectedColor && sceneDataRef.current) {
            updateBodyColor(selectedColor);
        }
    }, [selectedColor]);

    return (
        <S.CanvasWrapper ref={wrapperRef}>
            <AnimatePresence>
                {showLoader && (
                    <S.LoadModel
                        initial={{ opacity: '0%' }}
                        animate={{ opacity: '100%' }}
                        exit={{ opacity: '0%' }}
                    >
                        {progress}%
                    </S.LoadModel>
                )}
            </AnimatePresence>
            <S.MainCanvas ref={canvasRef} />
        </S.CanvasWrapper>
    );
};
