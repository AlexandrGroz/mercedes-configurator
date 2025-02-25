import { motion } from "motion/react";
import styled from "styled-components";

export const CanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  flex: 1;
`

export const MainCanvas = styled.canvas`
  position: absolute;
  width: 100%;
  height: 100%;
`

export const LoadModel = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--LIGHT_25);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  z-index: 3;
`