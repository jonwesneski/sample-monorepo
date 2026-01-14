'use client';

import { useEffect, useRef, useState } from 'react';

const ONE_MINUTE_MS = 1000 * 60;
const ONE_HOUR_MS = ONE_MINUTE_MS * 60;
export default () => {
  const [elapsedTimeMs, setElapsedTimeMs] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);
  // Use a ref to store the start time to avoid re-renders
  // also useRef keeps same value between renders unlike let
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTimeMs;
      intervalRef.current = setInterval(() => {
        setElapsedTimeMs(Date.now() - startTimeRef.current);
      }, 100);
    } else {
      clearInterval(intervalRef.current!);
    }
  }, [isRunning]);

  const handleClick = () => {
    setIsRunning((prev) => !prev);
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
        <button onClick={handleClick}>{isRunning ? 'Stop' : 'Start'}</button>
      </div>
    </div>
  );
};
