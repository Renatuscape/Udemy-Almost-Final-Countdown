import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef(); // always a javascript object with a current property that contains the stored value

  const [enteredPlayerName, setEnteredPlayerName] = useState('');

  function handleClick() {
    setEnteredPlayerName(playerName.current.value); // using ref lets you forego the handleChange that updates with every keystroke.
    playerName.current.value = ''; // changes the DOM directly, violating the idea that React should handle all DOM interactions. Questionable practice, but useful here.
  }

  return (
    <section id="player">
      <h2>Welcome {enteredPlayerName !== '' ? enteredPlayerName : 'unknown entity'}</h2>
      <p>
        <input ref={playerName} type="text"
        />
        <button onClick={handleClick}>Set Name</button>
      </p>
    </section>
  );
}
