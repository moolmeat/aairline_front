import React, { useEffect, useState } from 'react';

const Timer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const timeDiff = end - now;
      if (timeDiff > 0) {
        const minutes = Math.floor(timeDiff / 1000 / 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);
        setTimeLeft(`${minutes}분 ${seconds}초 남음`);
      } else {
        setTimeLeft('경매 종료');
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <div>{timeLeft}</div>;
};

export default Timer;
