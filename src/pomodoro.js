import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faSyncAlt,
  faArrowUp,
  faArrowDown
} from "@fortawesome/free-solid-svg-icons";

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
          audioRef.current.play();
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
    <div className="pomodoro-container">
      <h1>25 + 5 Clock</h1>
      <div className="length-wrapper">
        <div className="break-length-wrapper" id="break-label">
          <div>Break Length</div>
          <div className="button-wrapper">
            <div
              className="arrow down-arrow"
              id="break-decrement"
              onClick={() => handleDecrement("break")}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div id="break-length">{breakLength}</div>
            <div
              className="arrow up-arrow"
              id="break-increment"
              onClick={() => handleIncrement("break")}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>
        </div>
        <div className="session-length-wrapper" id="session-label">
          <div>Session Length</div>
          <div className="button-wrapper">
            <div
              className="arrow down-arrow"
              id="session-decrement"
              onClick={() => handleDecrement("session")}
            >
              <FontAwesomeIcon icon={faArrowDown} />
            </div>
            <div id="session-length">{sessionLength}</div>
            <div
              className="arrow up-arrow"
              id="session-increment"
              onClick={() => handleIncrement("session")}
            >
              <FontAwesomeIcon icon={faArrowUp} />
            </div>
          </div>
        </div>
      </div>
      <div className="timer-wrapper" id="timer-label">
        <div>{breakActive ? "Break" : "Session"}</div>
        <div id="time-left">{convertTime()}</div>
      </div>
      <div className="controls-wrapper">
        <div id="start_stop" onClick={handleStartStop}>
          <FontAwesomeIcon icon={faPlay} />
          <FontAwesomeIcon icon={faPause} />
        </div>
        <FontAwesomeIcon icon={faSyncAlt} id="reset" onClick={handleReset} />
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
