import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Timer = ({ biddingStartTime, biddingEndTime }) => {
  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRemainingTime(calculateRemainingTime());
    }, 60000);

    return () => clearInterval(intervalId);
  }, [remainingTime]);

  function calculateRemainingTime() {
    const currentTime = new Date();
    const startTime = new Date(biddingStartTime);
    const endTime = new Date(biddingEndTime);

    if (currentTime < startTime) {
      // Bidding has not started yet
      return startTime - currentTime;
    } else if (currentTime < endTime) {
      // Bidding is ongoing
      return endTime - currentTime;
    } else {
      // Bidding has ended
      return 0;
    }
  }

  function formatTime(milliseconds) {
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((milliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));

    const daysString = days > 0 ? `${days} days` : '';
    const hoursString = hours > 0 ? `${hours} hours` : '';
    const minutesString = minutes > 0 ? `${minutes} minutes` : '';

    return `${daysString} ${hoursString} ${minutesString} left`;
  }

  return (
    <div className='font-medium flex items-center flex-col justify-center w-full'>
      {remainingTime > 0 ? (
        <>
        <span>Time Remaining</span>
        <span>{formatTime(remainingTime)}</span>
        </>
      ) : (
        <span>Bidding Ended</span>
      )}
    </div>
  );
};

export default Timer;