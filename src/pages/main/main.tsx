import * as S from "./main.styles";
import { BottomMenu } from "~features/bottom_menu";
import { ModelCanvas } from "~features/model_canvas";
import { TopMenu } from "~features/top_menu";

export const Main = () => {
    return (
        <S.MainWrapper>
            <TopMenu />
            <ModelCanvas />
            <BottomMenu />
        </S.MainWrapper>
    );
};
