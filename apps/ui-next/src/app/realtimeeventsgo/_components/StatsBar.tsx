import { RealTimeEvent } from '../realtime.type';

interface StatsBarProps {
  events: RealTimeEvent[];
}
export const StatsBar = (props: StatsBarProps) => {
  const late = props.events.filter((e) => e.status === 'late').length;
  return (
    <div className="flex flex-row gap-2 bg-gray-500 w-full py-2.5 px-2">
      <strong>Events: {props.events.length}</strong>
      <strong>Late: {late}</strong>
    </div>
  );
};
