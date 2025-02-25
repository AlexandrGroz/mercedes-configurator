import { useState } from 'react';
import * as S from './bottom_menu.styles';
import { AnimatePresence } from 'motion/react';
import { ColorButton } from '~features/color_button';
import { GeneralColor, useModelStore } from '~entities';

export const BottomMenu = () => {
    const [isMenuShow, setIsMenuShow] = useState(true);
    const isColorBody = useModelStore((state)=> state.isColorBody);
    const changeColorBody = useModelStore((state)=> state.changeColorBody);

    const colors: GeneralColor[] = [[{r: 18, g: 18, b: 18},"121212"],[{r: 56, g: 71, b: 104},"384768"],[{r: 227, g: 227, b: 227},"e3e3e3"],[{r: 68, g: 113, b: 85},"447155"],
    [{r: 243, g: 183, b: 242},"f3b7f2"]]

    return (
        <S.Wrapper>
            <S.ShowCloseButton onClick={() => setIsMenuShow(!isMenuShow)}>{isMenuShow ? "↓ Свернуть" : "↑ Развернуть"}</S.ShowCloseButton>
            
            <AnimatePresence>
                {isMenuShow &&
                    <S.InsideWrapper
                        layout
                        initial={false}
                        animate={{ height: "4.5rem", opacity: 1 }}
                    >
                        {colors.map((color) => (
                            <ColorButton 
                                key={color[1]} 
                                color={color[1]!} 
                                isActive={isColorBody[1] === color[1]} 
                                onClick={() => changeColorBody(color)} 
                            />
                        ))}
                    </S.InsideWrapper>
                }

            </AnimatePresence>
        </S.Wrapper>
    );
};