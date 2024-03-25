import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; shared across instances, cannot be used separately by the different instances of TimeChallenge. Here is where ref comes in.

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef(); // Component instance specific because it's inside the component.
    // Ref ensures that the reference isn't lost when the component re-executes (unlike let), and also doesn't re-execute the component (unlike useState).
    const dialog = useRef();

    const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    if (timeRemaining <= 0){
        clearInterval(timer.current);
        setTimeRemaining(targetTime * 1000);
        dialog.current.open();
    }

    function handleStart() {
        timer.current = setInterval(() => {
            setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
        }, 10);
    }

    function handleStop() {
        dialog.current.open();
        clearInterval(timer.current);
    }

    return <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timeRemaining} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}>
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Timer is running...' : 'Timer inactive'}
            </p>
        </section>
    </>
}