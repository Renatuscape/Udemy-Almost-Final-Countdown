import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

// let timer; shared across instances, cannot be used separately by the different instances of TimeChallenge. Here is where ref comes in.

export default function TimerChallenge({ title, targetTime }) {
    const timer = useRef(); // Component instance specific because it's inside the component.
    // Ref ensures that the reference isn't lost when the component re-executes (unlike let), and also doesn't re-execute the component (unlike useState).
    const dialog = useRef();

    const [timerStarted, setTimerStarted] = useState(false);
    const [timerExpired, setTimerExpired] = useState(false);

    function handleStart() {
        timer.current = setTimeout(() => {
            setTimerExpired(true);
            dialog.current.open(); //using an imperative handle, we can call the custom method open, which we defined in ResultModal. 
        }, targetTime * 1000);

        setTimerStarted(true);
    }

    function handleStop() {
        clearTimeout(timer.current);
    }

    return <>
        <ResultModal ref={dialog} targetTime={targetTime} result="lost" />
        <section className="challenge">
            <h2>{title}</h2>
            {timerExpired && <p>You lost!</p>}
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button onClick={timerStarted ? handleStop : handleStart}>
                    {timerStarted ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerStarted ? 'active' : undefined}>
                {timerStarted ? 'Timer is running...' : 'Timer inactive'}
            </p>
        </section>
    </>
}