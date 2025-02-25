import { create } from "zustand";

interface MobileCheckerStoreType {
    isMobile: boolean;
}

export const useMobileCheckerStore = create<MobileCheckerStoreType>((set) => {
    const checkScreenSize = () => {
        set({ isMobile: window.innerWidth < 900 });
    };
    
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize);

    return {
        isMobile: window.innerWidth < 900,
    };
});
