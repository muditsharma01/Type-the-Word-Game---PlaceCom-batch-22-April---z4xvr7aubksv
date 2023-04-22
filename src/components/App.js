import React, { useState, useEffect } from 'react';
import "../styles/App.css"

const WORD_LIST = ['apple', 'banana', 'cherry', 'grape', 'orange'];

function App() {
  const [word, setWord] = useState('');
  const [flashWord, setFlashWord] = useState(true);
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Set the first word from the WORD_LIST array as the initial word
    setWord(WORD_LIST[index]);

    // After 500ms, hide the word and show the input form
    const timerId = setTimeout(() => {
      setFlashWord(false);
    }, 500);

    // Clear the timer on component unmount
    return () => clearTimeout(timerId);
  }, [index]);

  function handleInputChange(event) {
    setUserInput(event.target.value);
  }

  function handleFormSubmit(event) {
    event.preventDefault();

    // Check if the user input matches the current word from WORD_LIST
    if (userInput.toLowerCase() === WORD_LIST[index].toLowerCase()) {
      setResult('You Won!');
    } else {
      setResult('You Lost!');
    }
  }

  function handleRestartClick() {
    // Reset the state variables to their initial values
    setIndex(0);
    setUserInput('');
    setResult(null);
    setFlashWord(true);
  }

  return (
    <div className="mini-game-container">
      <h2 className="mini-game-title">Mini Game</h2>
      {flashWord && (
        <p className="mini-game-word">{word}</p>
      )}
      {!flashWord && (
        <form className="mini-game-form" onSubmit={handleFormSubmit}>
          <input className="mini-game-input" type="text" value={userInput} onChange={handleInputChange} />
          <button className="mini-game-button" type="submit">Check Answer</button>
        </form>
      )}
      {result && (
        <>
          <p className="mini-game-result">{result}</p>
          <button className="mini-game-restart-button" onClick={handleRestartClick}>Restart</button>
        </>
      )}
    </div>
  );
}

export default App;
