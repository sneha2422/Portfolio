import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'

const styles = {
  wrapper: {
    display: 'inline-block',
    whiteSpace: 'pre-wrap',
  },
  srOnly: {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: 0,
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    border: 0,
  },
}

export interface DecryptedTextProps {
  text: string;
  speed?: number;
  className?: string;
  parentClassName?: string;
  encryptedClassName?: string;
  animateOn?: 'hover' | 'view';
  characters?: string;
  [key: string]: any;
}

function getScrambled(text: string, characters: string) {
  const chars = characters.split('');
  return text.split('').map((char) => {
    if (char === ' ') return ' ';
    return chars[Math.floor(Math.random() * chars.length)];
  }).join('');
}

export default function DecryptedText({
  text,
  speed = 50,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+',
  ...props
}: DecryptedTextProps) {
  // Always start in decrypted mode for SSR hydration
  const [mode, setMode] = useState<'decrypted' | 'encrypted'>('encrypted');
  const [displayText, setDisplayText] = useState(text);
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef(null);

  // After mount, scramble if mode is encrypted
  useEffect(() => {
    if (mode === 'encrypted') {
      setDisplayText(getScrambled(text, characters));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Animate to decrypted (reveal all at once)
  const animateToDecrypted = () => {
    setAnimating(true);
    let iterations = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      if (iterations < maxIterations) {
        setDisplayText(getScrambled(text, characters));
        iterations++;
      } else {
        clearInterval(interval);
        setDisplayText(text);
        setAnimating(false);
      }
    }, speed);
  };

  // Animate to encrypted (scramble all at once)
  const animateToEncrypted = () => {
    setAnimating(true);
    let iterations = 0;
    const maxIterations = 10;
    const interval = setInterval(() => {
      if (iterations < maxIterations) {
        setDisplayText(getScrambled(text, characters));
        iterations++;
      } else {
        clearInterval(interval);
        setDisplayText(getScrambled(text, characters));
        setAnimating(false);
      }
    }, speed);
  };

  // Handle hover
  const handleMouseEnter = () => {
    if (animating) return;
    if (mode === 'encrypted') {
      animateToDecrypted();
      setMode('decrypted');
    } else {
      animateToEncrypted();
      setMode('encrypted');
    }
  };

  // Always reset to decrypted text if text or characters change
  useEffect(() => {
    setDisplayText(text);
    setMode('encrypted');
  }, [text, characters]);

  const hoverProps =
    animateOn === 'hover'
      ? {
          onMouseEnter: handleMouseEnter,
        }
      : {};

  return (
    <motion.span className={parentClassName} ref={containerRef} style={styles.wrapper} {...hoverProps} {...props}>
      <span style={styles.srOnly}>{displayText}</span>
      <span aria-hidden="true">
        <span className={className}>{displayText}</span>
      </span>
    </motion.span>
  );
} 