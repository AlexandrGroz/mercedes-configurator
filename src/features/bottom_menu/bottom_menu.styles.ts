import { motion } from "motion/react";
import styled from "styled-components";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

export const ShowCloseButton = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    white-space: nowrap;
    padding: 0.5rem 0.55rem;
    font-size: 1rem;
    font-weight: 500;
    background: var(--LIGHT_100);
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

export const InsideWrapper = styled(motion.div)`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.75rem;
`



