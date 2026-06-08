'use client';

const ROWS = [
  {
    label: 'AI / ML',
    color: '#B18CFE',
    items: ['PyTorch', 'TensorFlow', 'Scikit-learn', 'HuggingFace', 'LangChain', 'Groq Whisper', 'SHAP', 'Grad-CAM', 'RAG Pipelines'],
  },
  {
    label: 'Full Stack',
    color: '#9B6FE0',
    items: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'Tailwind CSS', 'Git', 'Vercel', 'PostgreSQL'],
  },
  {
    label: 'Design & Tools',
    color: '#7127BA',
    items: ['Figma', 'Adobe XD', 'Canva', 'Notion', 'VS Code', 'GitHub', 'Framer', 'Postman'],
  },
];

const NODE_W = 114;
const NODE_H = 36;
const H_GAP = 13;
const SVG_W = 1280;

// Row label Y, node center Y
const ROW_META = [
  { labelY: 28, cy: 74 },
  { labelY: 210, cy: 256 },
  { labelY: 392, cy: 438 },
];
const SVG_H = 476;

export default function TechStackGrid() {
  // Compute x-center of each node in each row
  const rowNodes = ROWS.map((row, ri) => {
    const totalW = row.items.length * NODE_W + (row.items.length - 1) * H_GAP;
    const startX = (SVG_W - totalW) / 2;
    return row.items.map((item, i) => ({
      item,
      cx: startX + i * (NODE_W + H_GAP) + NODE_W / 2,
      cy: ROW_META[ri].cy,
    }));
  });

  // Sparse inter-row connections: map each node in row N to 1-2 closest nodes in row N+1
  const interLines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let ri = 0; ri < rowNodes.length - 1; ri++) {
    const src = rowNodes[ri];
    const dst = rowNodes[ri + 1];
    src.forEach((s, i) => {
      // Map proportionally
      const mapped = Math.round((i / (src.length - 1)) * (dst.length - 1));
      const targets = Array.from(
        new Set([Math.max(0, mapped - 1), mapped, Math.min(dst.length - 1, mapped + 1)])
      ).slice(0, 2); // max 2 connections per node
      targets.forEach((ti) => {
        interLines.push({
          x1: s.cx,
          y1: s.cy + NODE_H / 2 + 2,
          x2: dst[ti].cx,
          y2: dst[ti].cy - NODE_H / 2 - 2,
        });
      });
    });
  }

  return (
    <svg
      viewBox={`0 0 ${SVG_W} ${SVG_H}`}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: '90vw', height: 'auto' }}
    >
      {/* Inter-row dashed connecting lines */}
      {interLines.map((l, i) => (
        <line
          key={`il-${i}`}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="rgba(177,140,254,0.18)"
          strokeWidth="1"
          strokeDasharray="5 5"
        />
      ))}

      {/* Intra-row solid connecting lines */}
      {rowNodes.map((row, ri) =>
        row.slice(0, -1).map((node, i) => (
          <line
            key={`rl-${ri}-${i}`}
            x1={node.cx + NODE_W / 2}
            y1={node.cy}
            x2={row[i + 1].cx - NODE_W / 2}
            y2={row[i + 1].cy}
            stroke={ROWS[ri].color}
            strokeWidth="0.8"
            opacity="0.35"
          />
        ))
      )}

      {/* Row labels */}
      {ROWS.map((row, ri) => (
        <text
          key={`lbl-${ri}`}
          x={SVG_W / 2}
          y={ROW_META[ri].labelY}
          textAnchor="middle"
          fill={row.color}
          fontSize="10.5"
          fontFamily="'Jua', sans-serif"
          letterSpacing="3"
          opacity="0.75"
        >
          ── {row.label.toUpperCase()} ──
        </text>
      ))}

      {/* Nodes */}
      {rowNodes.map((row, ri) =>
        row.map((node, i) => (
          <g key={`node-${ri}-${i}`}>
            {/* Glow rect */}
            <rect
              x={node.cx - NODE_W / 2 - 2}
              y={node.cy - NODE_H / 2 - 2}
              width={NODE_W + 4}
              height={NODE_H + 4}
              rx="20"
              fill={ROWS[ri].color}
              opacity="0.08"
            />
            {/* Border rect */}
            <rect
              x={node.cx - NODE_W / 2}
              y={node.cy - NODE_H / 2}
              width={NODE_W}
              height={NODE_H}
              rx="18"
              fill="rgba(17,7,31,0.85)"
              stroke={ROWS[ri].color}
              strokeWidth="1"
              opacity="0.9"
            />
            {/* Label */}
            <text
              x={node.cx}
              y={node.cy + 4.5}
              textAnchor="middle"
              fill="white"
              fontSize="11"
              fontFamily="'Inter', sans-serif"
              opacity="0.92"
            >
              {node.item}
            </text>
          </g>
        ))
      )}
    </svg>
  );
}
