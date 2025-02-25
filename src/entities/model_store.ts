import { create } from "zustand";
import { W140Model } from "./W140";

export type ColorRGB = {
    r: number,
    g: number,
    b: number
}

export type GeneralColor = [ColorRGB, string]

export type CarModel = {
    fullName: string,
    shortName: string,
    model: string,
    format: string,
}

interface ModelStore {
    isColorBody: GeneralColor;
    isCarModel: CarModel;
    changeColorBody: (newColorRGB: GeneralColor) => void;
    changeCarModel: (newCarModel: CarModel) => void;
}

export const useModelStore = create<ModelStore>((set) => ({
    isColorBody: [{r: 18, g: 18, b: 18}, "121212"],
    isCarModel: W140Model,

    changeColorBody: (newColorRGB) =>
        set(() => ({ isColorBody: newColorRGB })),

    changeCarModel: (newCarModel) =>
        set(() => ({ isCarModel: newCarModel })),
}));