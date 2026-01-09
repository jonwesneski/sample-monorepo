'use client';

import { EventTable } from './_components/EventTable';
import { StatsBar } from './_components/StatsBar';
import useRealTimeEvents from './useRealTimeEvents';

export default function Page() {
  const events = useRealTimeEvents();

  return (
    <div>
      <h1>Real-Time Event Monitor</h1>
      <StatsBar events={events} />
      <EventTable events={events} />
    </div>
  );
}
