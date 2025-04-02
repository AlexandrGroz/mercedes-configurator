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
    background: var(--LIGHT_100);
    box-shadow: var(--SHADOW_100) 0 0 0.125rem 0;
    width: 100%;
    height: fit-content;
    padding: 0 1rem;
    gap: 0.5rem;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
`

export const ShowCloseButton = styled.div`
    width: fit-content;
    white-space: nowrap;
    padding: 0.5rem 0.55rem;
    font-size: 1rem;
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

    @media (min-width: 900px) {
        font-size: 0.9rem;
        padding: 0.3rem 0.5rem;
    }
`