import styled from "styled-components";
import { DisableTextSelect } from "~shared/additional_styles";

export const Wrapper = styled.div`
    ${DisableTextSelect};
    height: 4.5rem;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: var(--LIGHT_100);
    border-radius: 0 0 0.625rem 0.625rem;
    padding: 0.5rem 0.25rem;
    transition: 0.3s all ease;
    cursor: pointer;
    overflow: hidden;
    opacity: 50%;

    &:hover{
        opacity: 100%;
    }

    &.active{
        opacity: 100%;
    }
`

export const Image = styled.img`
    height: 65%;
    
    @media (min-width: 900px) {
        height: 75%;
    }
`

export const Text = styled.span`
    font-size: 0.75rem;
    font-weight: 500;
`