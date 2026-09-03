import { useEffect } from 'react';
import confetti from 'canvas-confetti';

export const triggerProfessionalConfetti = () => {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#3B82F6', '#06B6D4', '#10B981', '#F59E0B', '#8B5CF6'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
};

export const ConfettiSuccess: React.FC<{ active?: boolean }> = ({ active = true }) => {
  useEffect(() => {
    if (active) {
      triggerProfessionalConfetti();
    }
  }, [active]);

  return null;
};
