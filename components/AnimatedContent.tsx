"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect, type ReactNode } from "react"

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: "horizontal" | "vertical"
  reverse?: boolean
  duration?: number
  ease?: string
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  className?: string
}

export default function AnimatedContent({
  children,
  distance = 150,
  direction = "horizontal",
  reverse = false,
  duration = 1,
  ease = "bounce.out",
  initialOpacity = 0.2,
  animateOpacity = true,
  scale = 1.1,
  threshold = 0.2,
  delay = 0.3,
  className = "",
}: AnimatedContentProps) {
  const ref = useRef(null)
  const [hasAnimated, setHasAnimated] = useState(false)
  const isInView = useInView(ref, { once: true, amount: threshold })

  const getInitialPosition = () => {
    if (direction === "horizontal") {
      return { x: reverse ? distance : -distance }
    } else {
      return { y: reverse ? distance : -distance }
    }
  }

  const getAnimatePosition = () => {
    if (direction === "horizontal") {
      return { x: 0 }
    } else {
      return { y: 0 }
    }
  }

  // Ensure animation only happens once
  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isInView, hasAnimated])

  return (
    <motion.div
      ref={ref}
      initial={{
        ...getInitialPosition(),
        opacity: animateOpacity ? initialOpacity : 1,
        scale: scale !== 1.1 ? scale : 0.8,
      }}
      animate={
        isInView && !hasAnimated
          ? {
              ...getAnimatePosition(),
              opacity: 1,
              scale: 1,
            }
          : isInView && hasAnimated
            ? {
                ...getAnimatePosition(),
                opacity: 1,
                scale: 1,
              }
            : {}
      }
      transition={{
        duration,
        ease: ease === "bounce.out" ? [0.25, 0.46, 0.45, 0.94] : ease,
        delay: hasAnimated ? 0 : delay, // No delay if already animated
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
