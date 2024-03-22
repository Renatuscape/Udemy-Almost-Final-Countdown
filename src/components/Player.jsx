import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef(); // always a javascript object with a current property that contains the stored value

  const [enteredPlayerName, setEnteredPlayerName] = useState('');
  // const [submitted, setSubmitted] = useState(false);

  // function handleChange(event){
  //   setSubmitted(false);
  //   setEnteredPlayerName(event.target.value);
  // }

  function handleClick(){
    setEnteredPlayerName(playerName.current.value); // using ref lets you forego the handleChange that updates with every keystroke.
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName ?? 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"
        // onChange={handleChange}
        // value={enteredPlayerName}
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
