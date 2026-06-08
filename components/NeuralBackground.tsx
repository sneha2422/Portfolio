'use client';
import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
}

const NODE_COUNT = 22;
const CONNECTION_DIST = 180;
const CURSOR_RADIUS = 140;
const CURSOR_FORCE = 0.32;

export default function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const nodesRef = useRef<Node[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Distribute nodes evenly in a grid then randomise within each cell
    const cols = Math.ceil(Math.sqrt(NODE_COUNT * (canvas.width / canvas.height)));
    const rows = Math.ceil(NODE_COUNT / cols);
    const cellW = canvas.width / cols;
    const cellH = canvas.height / rows;
    nodesRef.current = Array.from({ length: NODE_COUNT }, (_, i) => ({
      x: (i % cols) * cellW + Math.random() * cellW,
      y: Math.floor(i / cols) * cellH + Math.random() * cellH,
      vx: (Math.random() - 0.5) * 0.7,
      vy: (Math.random() - 0.5) * 0.7,
      radius: Math.random() * 1.2 + 1,
      pulsePhase: Math.random() * Math.PI * 2,
    }));

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const nodes = nodesRef.current;
      const mouse = mouseRef.current;

      nodes.forEach(node => {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CURSOR_RADIUS && dist > 0) {
          const force = ((CURSOR_RADIUS - dist) / CURSOR_RADIUS) * CURSOR_FORCE;
          node.vx += (dx / dist) * force;
          node.vy += (dy / dist) * force;
        }

        // Gentle random wander so nodes keep moving across the whole screen
        node.vx += (Math.random() - 0.5) * 0.06;
        node.vy += (Math.random() - 0.5) * 0.06;

        // Cap speed
        const speed = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (speed > 0.9) { node.vx = (node.vx / speed) * 0.9; node.vy = (node.vy / speed) * 0.9; }

        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0) { node.x = 0; node.vx *= -1; }
        if (node.x > canvas.width) { node.x = canvas.width; node.vx *= -1; }
        if (node.y < 0) { node.y = 0; node.vy *= -1; }
        if (node.y > canvas.height) { node.y = canvas.height; node.vy *= -1; }

        node.pulsePhase += 0.018;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[j].x - nodes[i].x;
          const dy = nodes[j].y - nodes[i].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECTION_DIST) {
            const alpha = (1 - dist / CONNECTION_DIST) * 0.35;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(177, 140, 254, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const pulse = Math.sin(node.pulsePhase) * 0.35 + 1;
        const r = node.radius * pulse;

        // Small glow
        const grd = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 4);
        grd.addColorStop(0, 'rgba(177, 140, 254, 0.2)');
        grd.addColorStop(1, 'rgba(177, 140, 254, 0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Tiny core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(210, 185, 255, 0.95)';
        ctx.fill();
      });
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
