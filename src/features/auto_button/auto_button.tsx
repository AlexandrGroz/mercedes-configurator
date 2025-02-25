import * as S from './auto_button.styles';

export const AutoButton = ({image, children, isActive, onClick}: {image: string, children: string, isActive: boolean, onClick: ()=>void}) => {
    return (
        <S.Wrapper className={isActive ? "active" : ""} onClick={onClick}>
            <S.Image src={image}/>
            <S.Text>{children}</S.Text>
        </S.Wrapper>
    );
};
