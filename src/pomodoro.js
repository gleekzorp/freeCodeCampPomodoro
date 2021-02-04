import React, { useEffect, useRef, useState } from "react";

const Pomodoro = () => {
  const [breakLength, setBreakLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timerActive, setTimerActive] = useState(false);
  const [breakActive, setBreakActive] = useState(false);
  const audioRef = useRef(null);
  // Lower numbers for testing
  // const [breakLength, setBreakLength] = useState(0.1);
  // const [sessionLength, setSessionLength] = useState(0.2);
  // const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    let interval = null;
    if (timerActive) {
      interval = setInterval(() => {
        if (timeLeft === 0) {
          if (breakActive) {
            setBreakActive(false);
            setTimeLeft(sessionLength * 60);
          } else {
            setBreakActive(true);
            setTimeLeft(breakLength * 60);
          }
        } else {
          setTimeLeft((seconds) => seconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timerActive, timeLeft, breakLength, breakActive, sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
      audioRef.current.play();
    }
  }, [timeLeft]);

  const handleStartStop = () => {
    setTimerActive(!timerActive);
  };

  const convertTime = () => {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
  };

  const handleIncrement = (label) => {
    if (!timerActive) {
      switch (label) {
        case "break":
          if (breakLength === 60) break;
          setBreakLength(breakLength + 1);
          break;
        default:
          if (sessionLength === 60) break;
          setSessionLength(sessionLength + 1);
          setTimeLeft((sessionLength + 1) * 60);
          break;
      }
    }
  };

  const handleDecrement = (label) => {
    if (!timerActive) {
      switch (label) {
        case "break":
          if (breakLength === 1) break;
          setBreakLength(breakLength - 1);
          break;
        default:
          if (sessionLength === 1) break;
          setSessionLength(sessionLength - 1);
          setTimeLeft((sessionLength - 1) * 60);
          break;
      }
    }
  };

  const handleReset = () => {
    setTimerActive(false);
    setBreakActive(false);
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setBreakLength(5);
    setSessionLength(25);
    setTimeLeft(25 * 60);
    // Lower Time For Testing
    // setBreakLength(0.1);
    // setSessionLength(0.2);
    // setTimeLeft(10);
  };

  return (
    <div>
      <h1>25 + 5 Clock</h1>
      <div className="break-length-wrapper" id="break-label">
        <h2>Break Length</h2>
        <div className="button-wrapper">
          <div
            className="arrow down-arrow"
            id="break-decrement"
            onClick={() => handleDecrement("break")}
          >
            &#10140;
          </div>
          <div id="break-length">{breakLength}</div>
          <div
            className="arrow up-arrow"
            id="break-increment"
            onClick={() => handleIncrement("break")}
          >
            &#10140;
          </div>
        </div>
      </div>
      <div className="session-length-wrapper" id="session-label">
        <h2>Session Length</h2>
        <div className="button-wrapper">
          <div
            className="arrow down-arrow"
            id="session-decrement"
            onClick={() => handleDecrement("session")}
          >
            &#10140;
          </div>
          <div id="session-length">{sessionLength}</div>
          <div
            className="arrow up-arrow"
            id="session-increment"
            onClick={() => handleIncrement("session")}
          >
            &#10140;
          </div>
        </div>
      </div>
      <div className="timer-wrapper" id="timer-label">
        <h2>{breakActive ? "Break" : "Session"}</h2>
        <div id="time-left">{convertTime()}</div>
      </div>
      <div className="controls-wrapper">
        {/* <button id="start_stop">&#x23EF;</button> */}
        <button id="start_stop" onClick={handleStartStop}>
          start/stop
        </button>
        <button id="reset" onClick={handleReset}>
          reset
        </button>
      </div>
      <audio
        ref={audioRef}
        id="beep"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
};

export default Pomodoro;
