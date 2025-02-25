import styled from "styled-components";

export const Wrapper =styled.div<{$color: string}>`
    height: 70%;
    aspect-ratio: 1/1;
    background:  ${props => `#${props.$color}`};
    border-radius: 0.3125rem;
    box-shadow: var(--SHADOW_100) 0 0 0.3125rem 0.125rem;
    transition: 0.3s all ease;
    cursor: pointer;

    &.active{
        border: 5px solid var(--SUCCESS_50);
    }
`