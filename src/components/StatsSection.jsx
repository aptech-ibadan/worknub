"use client";
import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { FiUsers, FiClock, FiZap, FiAward } from 'react-icons/fi';

const stats = [
  { icon: FiUsers, value: 120, label: 'Happy Members', suffix: '+' },
  { icon: FiClock, value: 24, label: 'Access Hours', suffix: '/7' },
  { icon: FiZap, value: 100, label: 'Power Uptime', suffix: '%' },
  { icon: FiAward, value: 5, label: 'Member Rating', suffix: '★' },
];

export default function StatsSection() {
  const [counts, setCounts] = useState(stats.map(() => 0));
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  useEffect(() => {
    if (inView) {
      stats.forEach((stat, index) => {
        let start = 0;
        const end = stat.value;
        const duration = 2000;
        const increment = end / (duration / 16);

        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = end;
              return newCounts;
            });
            clearInterval(timer);
          } else {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = Math.floor(start);
              return newCounts;
            });
          }
        }, 16);
      });
    }
  }, [inView]);

  return (
    <section ref={ref} className="py-16 bg-worknub-mint">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <stat.icon className="text-worknub-green text-4xl mx-auto mb-3" />
              <div className="text-3xl md:text-4xl font-bold text-worknub-dark">
                {counts[index]}{stat.suffix}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}