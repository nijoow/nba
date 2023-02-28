import React, { useEffect, useState } from "react";

const CurrentDate = () => {
  const [clock, setClock] = useState<{
    dayOfWeek: string | null;
    month: string | null;
    day: string | null;

    year: string | null;
    hours: string | null;
    minutes: string | null;
    ampm: "PM" | "AM" | null;
  }>({
    dayOfWeek: null,
    month: null,
    day: null,
    year: null,
    hours: null,
    minutes: null,
    ampm: null,
  });
  const getClock = () => {
    const today = new Date();
    const [dayOfWeek, month, day, year] = today
      .toString()
      .split(" ")
      .map((item) => item.toUpperCase());
    const hours = today.getHours() % 12 ? String(today.getHours() % 12) : "12";
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const ampm = today.getHours() >= 12 ? "PM" : "AM";

    setClock({ dayOfWeek, month, day, year, hours, minutes, ampm });
  };

  useEffect(() => {
    const getClockInterval = setInterval(getClock, 1000);
    return () => clearInterval(getClockInterval);
  }, []);

  return (
    <div className="absolute top-0 flex gap-4 p-6 text-2xl font-bold text-white right-2">
      <span>
        {clock.dayOfWeek} {clock.month} {clock.day}
      </span>
      <span>
        {clock.hours}:{clock.minutes} {clock.ampm}
      </span>
    </div>
  );
};

export default CurrentDate;
