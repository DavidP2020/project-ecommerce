import React, { useEffect, useRef } from "react";
import { useState } from "react";

export default function Countdown({ seconds }) {
  const [countDown, setCountDown] = useState(seconds);
  const timerId = useRef();

  useEffect(() => {
    timerId.current = setInterval(() => {
      setCountDown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, []);

  return (
    <>
      <div>{countDown <= 0 ? clearInterval(timerId.current) : countDown}</div>
    </>
  );
}
