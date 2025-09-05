import React from "react";
import { useEventStatus } from "../hooks/use-event-status";

const CountdownTimer = ({ targetDate, endDate = "2025-08-03T18:00:00" }) => {
  const { status, timeLeft } = useEventStatus(targetDate, endDate);

  if (status === 'concluded') {
    return (
      <div className="countdown text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-red mb-4 animate-slide-up">
          E-WEEK 2K25 HAS CONCLUDED!
        </h2>
        <div className="inline-flex items-center gap-3 justify-center mb-3 animate-slide-up delay-300">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-400 font-semibold tracking-wide">RESULTS</span>
        </div>
        <p className="text-3xl font-extrabold text-white mb-2 animate-slide-up delay-500 animate-glow">
          Congratulations E22 🎉
        </p>
        <p className="text-xl">Thank you for an amazing journey!</p>
        <p className="text-lg mt-2 opacity-80">
          The warriors have written their history. Until next time! ⚔️
        </p>
      </div>
    );
  }

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="countdown">
      <h2 className="countdown-title">
        {status === 'live' ? "Time Until E-Week 2K25 Ends" : "Countdown to E-Week 2K25"}
      </h2>

      {status === 'live' && (
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-red-600/20 border border-red-500/30 rounded-full px-4 py-2 mb-3">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-red-400 font-medium">LIVE NOW</span>
          </div>
          <p className="text-lg text-white/90">The battle is raging! Warriors are writing history! ⚔️</p>
        </div>
      )}

      <div className="countdown-grid">
        {timeUnits.map((unit) => (
          <div key={unit.label} className="countdown-item">
            <div className="countdown-number">
              {unit.value.toString().padStart(2, "0")}
            </div>
            <div className="countdown-label">{unit.label}</div>
          </div>
        ))}
      </div>

      <p className="countdown-date">
        {status === 'live'
          ? "The Odyssey Continues • Faculty of Engineering • University of Jaffna"
          : "August 30 - September 05, 2025 • Faculty of Engineering • University of Jaffna"
        }
      </p>
    </div>
  );
};

export default CountdownTimer;
