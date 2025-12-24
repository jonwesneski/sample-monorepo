'use client';

import { useEffect, useRef, useState } from 'react';

const ONE_MINUTE_MS = 1000 * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
export default () => {
  const [elapsedTimeMs, setElapsedTimeMs] = useState(0);
  const [timeState, setTimeState] = useState<'Stop' | 'Start'>('Start');
  const intervalRef = useRef<NodeJS.Timeout>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (timeState === 'Stop') {
      startTimeRef.current = Date.now() - elapsedTimeMs;
      intervalRef.current = setInterval(() => {
        setElapsedTimeMs(Date.now() - startTimeRef.current);
      }, 100);
    } else {
      clearInterval(intervalRef.current!);
    }
  }, [timeState]);

  const handleClick = () => {
    setTimeState((prev) => {
      return prev === 'Start' ? 'Stop' : 'Start';
    });
  };

  const hour = ((elapsedTimeMs / ONE_HOUR_MS) % 24).toFixed().padStart(2, '0');
  const minute = ((elapsedTimeMs / ONE_MINUTE_MS) % 60)
    .toFixed()
    .padStart(2, '0');
  const second = ((elapsedTimeMs / 1000) % 60).toFixed().padStart(2, '0');
  return (
    <div>
      <span>{hour}</span>:<span>{minute}</span>:<span>{second}</span>:
      <span>{`${elapsedTimeMs % 1000}`.padStart(3, '0')}</span>
      <div>
        <button onClick={handleClick}>{timeState}</button>
      </div>
    </div>
  );
};
