
"use client"
import FlowNumber from "../FlowNumberDigit";
import styles from "./style.module.css"
import React, { useEffect, useState } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clean up on component unmount
  }, [targetDate]);

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    if (difference <= 0) {
      return { months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const seconds = Math.floor((difference / 1000) % 60);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30);
    const months = Math.floor(difference / (1000 * 60 * 60 * 24 * 30));

    return { months, days, hours, minutes, seconds };
  }

  return (
    <div style={{ fontSize: "3rem", fontWeight: "700", display: "flex" }}>
      {/* {String(timeLeft.months).padStart(2, "0")}:    */}

        <FlowNumber number={String(timeLeft.days).padStart(2, "0").split("")[0]} />
        <FlowNumber number={String(timeLeft.days).padStart(2, "0").split("")[1]} />
        <span style={{marginRight: "0.25em"}}></span>
        <FlowNumber number={String(timeLeft.hours).padStart(2, "0").split("")[0]} />
        <FlowNumber number={String(timeLeft.hours).padStart(2, "0").split("")[1]} />
        <span style={{marginRight: "0.25em"}}></span>
        <FlowNumber number={String(timeLeft.minutes).padStart(2, "0").split("")[0]} />
        <FlowNumber number={String(timeLeft.minutes).padStart(2, "0").split("")[1]} />
        <span style={{marginRight: "0.25em"}}></span>
        <FlowNumber number={String(timeLeft.seconds).padStart(2, "0").split("")[0]} />
        <FlowNumber number={String(timeLeft.seconds).padStart(2, "0").split("")[1]} />
    </div>
  );
};

export default CountdownTimer;