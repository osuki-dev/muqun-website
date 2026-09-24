import type { ThemeColors } from '@/lib/theme-package';

/** Static full-frame traces; the App uses the same ten elbow paths. */
export function AmbientCircuitLines({
  width,
  height,
  colors,
  count = 10,
  size = 1,
  palette: customPalette,
}: {
  width: number;
  height: number;
  colors: Pick<ThemeColors, 'primary' | 'info' | 'success' | 'warning'>;
  count?: number;
  size?: number;
  palette?: string[];
}) {
  const palette = customPalette?.length ? customPalette : [colors.primary, colors.info, colors.success, colors.warning];
  return (
    <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" aria-hidden="true">
      {Array.from({ length: Math.min(10, count) }, (_, i) => {
        const sign = i % 2 === 0 ? 1 : -1;
        const x = sign === 1 ? -4 : width + 4;
        const y = height * (0.07 + i * 0.091);
        const reach = Math.min(width * (0.12 + (i % 3) * 0.035), 110);
        const elbow = 12 + (i % 3) * 7;
        const endX = x + sign * (reach + elbow + 20);
        const endY = y + elbow + 14;
        return (
          <g key={i} stroke={palette[i % palette.length]} fill="none">
            <path
              d={`M ${x} ${y} H ${x + sign * reach} L ${x + sign * (reach + elbow)} ${y + elbow} V ${endY} H ${endX}`}
              strokeWidth={size}
              strokeLinejoin="round"
              opacity="0.24"
            />
            {i % 2 === 0 && (
              <circle
                cx={endX}
                cy={endY}
                r={2.2 * size}
                fill={palette[i % palette.length]}
                stroke="none"
                opacity="0.35"
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
