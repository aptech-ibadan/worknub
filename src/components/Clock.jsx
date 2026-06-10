"use client";
import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-center py-8 bg-worknub-mint">
      <div className="text-2xl font-bold text-worknub-green">{time.toLocaleTimeString()}</div>
      <div className="text-gray-600">{time.toLocaleDateString('en-NG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
    </div>
  );
}