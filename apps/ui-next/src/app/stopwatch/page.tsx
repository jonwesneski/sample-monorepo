'use client'

import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intevalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intevalRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10)
    } else {
      clearInterval(intevalRef.current!);
    }
  }, [isRunning]);

  return (
    <div>
      <p>{`Elapsed Time: ${elapsedTime}`}</p>
      <p>{`Elapsed Time: ${(elapsedTime / 1000).toFixed(2)}s`}</p>
      <button onClick={() => setIsRunning(!isRunning)}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
}
