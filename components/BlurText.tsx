"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useMemo, useEffect, useState } from "react"

interface BlurTextProps {
  text: string
  delay?: number
  animateBy?: "words" | "letters"
  direction?: "top" | "bottom" | "left" | "right"
  onAnimationComplete?: () => void
  className?: string
  style?: React.CSSProperties
  loop?: boolean
  loopDelay?: number
}

export default function BlurText({
  text,
  delay = 150,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
  style = {},
  loop = false,
  loopDelay = 6000,
}: BlurTextProps) {
  const [key, setKey] = useState(0)

  useEffect(() => {
    if (loop) {
      const interval = setInterval(() => {
        setKey((prev) => prev + 1)
      }, loopDelay)

      return () => clearInterval(interval)
    }
  }, [loop, loopDelay])

  const directionOffset = useMemo(() => {
    const map = {
      top: { y: -100 },
      bottom: { y: 100 },
      left: { x: -100 },
      right: { x: 100 },
    }
    return map[direction]
  }, [direction])

  const items = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("")
  }, [text, animateBy])

  return (
    <span className={className} style={style} key={key}>
      {items.map((item, index) => (
        <motion.span
          key={`${key}-${index}`}
          initial={{
            opacity: 0,
            filter: "blur(20px)",
            ...directionOffset,
          }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
            x: 0,
            y: 0,
          }}
          transition={{
            delay: index * (delay / 1000),
            duration: 0.8,
            ease: "easeOut",
          }}
          onAnimationComplete={index === items.length - 1 ? onAnimationComplete : undefined}
          className="inline-block"
          style={{
            marginRight: animateBy === "words" ? "0.25em" : "0",
            ...style,
          }}
        >
          {item}
        </motion.span>
      ))}
    </span>
  )
}
