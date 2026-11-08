import { SystemState } from '../domain/dr';

/** Large blurred glows whose color tracks system health. */
export default function AmbientBackground({
  state,
  chaosActive,
}: {
  state: SystemState;
  chaosActive: boolean;
}) {
  const primary = chaosActive
    ? '#FF3B30'
    : state === SystemState.SECURED
      ? '#00FF9D'
      : state === SystemState.IDLE
        ? '#00F0FF'
        : '#FFB800';
  const secondary = chaosActive
    ? '#FF9500'
    : state === SystemState.SECURED
      ? '#00FF9D'
      : state === SystemState.IDLE
        ? '#3B82F6'
        : '#FF3B30';

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div
        className="absolute top-[-20%] left-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-20"
        style={{ backgroundColor: primary }}
      />
      <div
        className="absolute bottom-[-20%] right-[-10%] w-[55vw] h-[55vw] rounded-full blur-[140px] transition-colors duration-1000 opacity-15"
        style={{ backgroundColor: secondary }}
      />
    </div>
  );
}
