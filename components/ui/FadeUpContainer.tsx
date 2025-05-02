import { m, LazyMotion, domAnimation } from "framer-motion";
import styled from "styled-components";
import { ReactNode } from "react";

interface FadeUpContainerProps {
  children: ReactNode;
  delay?: number;
}

function FadeUpContainer({ children, delay = 0.15 }: FadeUpContainerProps) {
  return (
    <AnimationContainer>
      <LazyMotion features={domAnimation}>
        <FadeUpItem
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{
            delay: delay,
            y: { type: "spring", transition: { duration: 0.25 } },
          }}
        >
          {children}
        </FadeUpItem>
      </LazyMotion>
    </AnimationContainer>
  );
}

const AnimationContainer = styled.span`
  overflow: hidden;
  display: inline-block;
`;

const FadeUpItem = styled(m.span)`
  display: inline-block;
`;

export default FadeUpContainer;