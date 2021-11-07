import './App.css';
import React, { useState } from 'react';

function App() {

  const bottleHeight = 300;
  const totalLevel = 5;

  const [level, setLevel] = useState(0);
  const [mode, setMode] = useState('none');
  const [timeoutId, setTimeoutId] = useState(0);

  React.useEffect(() => {
    if (mode === 'fill') {
      if (level < 5) {
        const tid = setTimeout(function() {
          setLevel(level + 1);
        }, 2000);
        setTimeoutId(tid);
      }
    } else if (mode === 'out') {
      if (level > 0) {
        const tid = setTimeout(function() {
          setLevel((level) => level - 1);
        }, 2000);
        setTimeoutId(tid);
      }
    }
  }, [mode, level]);

  const onLevelUp = () => {
    if (mode !== 'fill') {
      clearTimeout(timeoutId);
      setMode('fill');
    }
  };

  const onLevelDown = () => {
    if (mode !== 'out') {
      clearTimeout(timeoutId);
      setMode('out');
    }
  };

  return (
    <div className="App">
      <div className="body">
        <h1>Bathtub</h1>
        <h3>{level} Levels</h3>

        <div className="cup">
          <div
            className="remained"
             id="remained"
            style={{
              height: bottleHeight - level * bottleHeight / totalLevel
            }}
          >
            <span id="liters"></span>
          </div>
          <div
            className="filled"
            style={
              level === 0
              ? {backgroundColor: 'white'}
              : {}
            }
          >
            {level * 100 / totalLevel}%
          </div>
        </div>
      </div>

      <button className="cup-small" onClick={onLevelUp}>
        Up
      </button>
      
      <button className="cup-small" onClick={onLevelDown}>
        Down
      </button>
    </div>
  );
}

export default App;
