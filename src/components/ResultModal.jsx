import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom'; // react-dom library has features and functions allowing React to better interact with the DOM

//forward ref must be wrapped around the component in order to allow ref forwarding. Ref is passed as a second parameter with forward Ref
const ResultModal = forwardRef(function ResultModal(
    { targetTime, remainingTime, onReset }, ref) { // a modal is a dialogue opened on top of the screen
    const dialog = useRef();

    const userLost = remainingTime <= 0;
    const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
    const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

    useImperativeHandle(ref, () => { //useImperativeHandle allows creating custom methods that are called by the parent component. It improves readability, as opposed to calling showModal in the parent component.
        return {
            open() {
                dialog.current.showModal(); // opens the modal dialogue. Open can be used as a prop on dialog, but calling it programmatically gives a dark backdrop
            }
        };
    });

    return createPortal (<dialog ref={dialog} className="result-modal" onClose={onReset}>
        {userLost && <h2>You lost</h2>}
        {!userLost && <h2>Your Score: {score}</h2>}
        <p>The target time was <strong>{targetTime} seconds.</strong></p>
        <p>You stopped the timer with <strong>{formattedRemainingTime} seconds left.</strong></p>
        <form method="dialog" onSubmit={onReset}>
            {/* form with dialogue containing a button will automatically close the dialogue. */}
            <button>Close</button>
        </form>
    </dialog>,
    document.getElementById('modal') // portal takes the target location as a second argument
    );
})

export default ResultModal;