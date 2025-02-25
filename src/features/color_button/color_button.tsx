import * as S from './color_button.styles';

export const ColorButton = ({color, isActive, onClick}: {color:string, isActive: boolean, onClick: ()=>void}) => {
    return (
        <S.Wrapper $color={color} className={isActive ? "active" : ""} onClick={onClick}/>
    );
};
