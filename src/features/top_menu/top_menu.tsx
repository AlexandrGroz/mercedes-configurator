import * as S from "./top_menu.styles";
import { AutoButton } from "~features/auto_button";
import { useMobileCheckerStore } from "~shared/mobile_checker_store";
import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { C63Model, G63Model, useModelStore, W140Model } from "~entities";

export const TopMenu = () => {
    const isMobile = useMobileCheckerStore((state) => state.isMobile);
    const isCarModel = useModelStore((state)=> state.isCarModel); 
    const changeCarModel = useModelStore((state)=> state.changeCarModel); 
    const [isMenuShow, setIsMenuShow] = useState(true);
    const cars = [W140Model, G63Model, C63Model]

    return (
        <S.Wrapper>
                <AnimatePresence>
                    {isMenuShow && (
                        <S.InsideWrapper
                            layout
                            initial={{ height: "0", opacity: 0 }}
                            animate={{ height: "5.5rem", opacity: 1 }}
                            exit={{ height: "0", opacity: 0 }}
                        >
                            {cars.map((car)=>(
                                <AutoButton 
                                    key={car.model}
                                    image={car.buttonImage}
                                    isActive={isCarModel.shortName === car.shortName} 
                                    onClick={() => changeCarModel(car)} 
                                >
                                    {isMobile ? car.shortName : car.fullName}
                                </AutoButton>
                            ))}
                        </S.InsideWrapper>
                    )}
                </AnimatePresence>

                <S.ShowCloseButton onClick={() => setIsMenuShow(!isMenuShow)}>{isMenuShow ? "↑ Collapse" : "↓ Expand"}</S.ShowCloseButton>
                
        </S.Wrapper>
    );
};
