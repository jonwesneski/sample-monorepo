import { useEffect, useRef, useState } from 'react';
import { RealTimeEvent } from './realtime.type';

const useRealTimeEvents = () => {
  const [events, setEvents] = useState<RealTimeEvent[]>([]);
  const buffer = useRef<RealTimeEvent[]>([]);
  const wsRef = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);
  const attemptsRef = useRef(0);
  const isUnmountedRef = useRef(false);

  useEffect(() => {
    const url = 'ws://localhost:8080/ws';

    const connect = () => {
      if (isUnmountedRef.current) return;

      // close previous socket if any
      if (wsRef.current) {
        try {
          wsRef.current.onclose = null;
          wsRef.current.close();
        } catch (e) {
          /* ignore */
        }
        wsRef.current = null;
      }

      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        attemptsRef.current = 0;
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current);
          reconnectTimeoutRef.current = null;
        }
        console.log('WebSocket connected');
      };

      ws.onmessage = (message) => {
        try {
          buffer.current.push(JSON.parse(message.data));
        } catch (e) {
          console.error('Failed to parse WS message', e);
        }
      };

      ws.onerror = (event) => {
        console.error('WebSocket error', event);
      };

      ws.onclose = () => {
        if (isUnmountedRef.current) return;
        attemptsRef.current += 1;
        const maxDelay = 30_000; // ms
        const baseDelay = Math.min(
          1000 * 2 ** (attemptsRef.current - 1),
          maxDelay
        );
        const jitter = Math.floor(Math.random() * 300);
        const delay = baseDelay + jitter;
        reconnectTimeoutRef.current = window.setTimeout(() => connect(), delay);
      };
    };

    connect();

    let raf = 0;

    const flush = () => {
      if (buffer.current.length > 0) {
        const pendingEvents = buffer.current.slice(0);
        // clear buffer so events are not re-added
        buffer.current.length = 0;

        setEvents((prev) => {
          const next = [...prev, ...pendingEvents];
          return next.slice(-50);
        });
      }
      raf = requestAnimationFrame(flush);
    };

    raf = requestAnimationFrame(flush);

    return () => {
      isUnmountedRef.current = true;
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch (e) {
          /* ignore */
        }
        wsRef.current = null;
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
      cancelAnimationFrame(raf);
    };
  }, []);

  return events;
};

export default useRealTimeEvents;
