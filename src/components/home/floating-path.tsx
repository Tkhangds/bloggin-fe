import { motion } from "framer-motion";

export default function FloatingPaths({ position }: { position: number }) {
  const numPaths = 36;
  const baseX = 380;
  const baseY = 189;

  const paths = Array.from({ length: numPaths }, (_, i) => {
    const offset = i * 5 * position;
    const yOffset = i * 6;

    return {
      id: i,
      d: `M-${baseX - offset} -${baseY + yOffset}C-${baseX - offset} -${
        baseY + yOffset
      } -${312 - offset} ${216 - yOffset} ${152 - offset} ${
        343 - yOffset
      }C${616 - offset} ${470 - yOffset} ${684 - offset} ${
        875 - yOffset
      } ${684 - offset} ${875 - yOffset}`,
      strokeOpacity: 0.1 + i * 0.03,
      strokeWidth: 0.5 + i * 0.03,
    };
  });

  const pathAnimation = {
    pathLength: 1,
    opacity: [0.3, 0.6, 0.3],
    pathOffset: [0, 1, 0],
  };

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-slate-950 dark:text-white"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Welcome To Blogging</title>
        {paths.map(({ id, d, strokeOpacity, strokeWidth }) => (
          <motion.path
            key={id}
            d={d}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeOpacity={strokeOpacity}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={pathAnimation}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}
