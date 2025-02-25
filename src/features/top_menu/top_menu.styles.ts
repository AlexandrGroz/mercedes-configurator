import { motion } from "motion/react";
import styled from "styled-components";

export const Wrapper = styled.div`
    position: absolute;
    top: 0%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    transition: 0.3s all ease;
    opacity: 90%;
    z-index: 2;
`

export const InsideWrapper = styled(motion.div)`
    width: 100%;
    background: var(--LIGHT_100);
    box-shadow: var(--SHADOW_100) 0 0 0.125rem 0;
    overflow: hidden;
    gap: 0.5rem;
    display: flex;
    justify-content: center;
`

export const ShowCloseButton = styled.div`
    width: fit-content;
    white-space: nowrap;
    padding: 0.15rem 0.5rem;
    font-size: 0.8rem;
    font-weight: 500;
    background: var(--LIGHT_100);
    border-radius: 0 0 0.3125rem 0.3125rem;
    box-shadow: var(--SHADOW_100) 0 0 0.125rem 0;
    transition: 0.3s all ease;
    transition-delay: 0.04s;
    cursor: pointer;

    &:hover{
        background: var(--DARK_100);
        color: var(--LIGHT_100);
    }
`