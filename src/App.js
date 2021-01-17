import './App.css';
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import React, {useState} from 'react';
import {WidthProvider, Responsive } from 'react-grid-layout';
import {map} from 'lodash';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = value => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

function generateLayout() {
  return [
    {
      "w": 2,
      "h": 1,
      "x": 0,
      "y": 0,
      "i": "0",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 1,
      "x": 2,
      "y": 0,
      "i": "1",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 1,
      "x": 4,
      "y": 0,
      "i": "2",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 1,
      "x": 6,
      "y": 0,
      "i": "3",
      "moved": false,
      "static": false
    },
    {
      "w": 2,
      "h": 1,
      "x": 8,
      "y": 0,
      "i": "4",
      "moved": false,
      "static": false
    }
  ]
}


function App() {
  const [layout, setLayout] = useLocalStorage('layout', generateLayout());

  function generateDOM() {
    return map(layout, function(l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  }

  function onLayoutChange(z) {
    setLayout(z);
  }


  return (
    <div style={{display: "flex"}}>
    <div style={{marginRight: "16px"}}>
      <pre>{JSON.stringify(layout, null, 2)}</pre>
    </div>
    <div style={{width: "100%"}}>
    <ResponsiveReactGridLayout
    layouts={{lg: layout}}
    // onBreakpointChange={this.onBreakpointChange}
    onLayoutChange={onLayoutChange}
    // onDrop={this.onDrop}
    // WidthProvider option
    measureBeforeMount={false}
    // I like to have it animate on mount. If you don't, delete `useCSSTransforms` (it's default `true`)
    // and set `measureBeforeMount={true}`.
    // useCSSTransforms={this.state.mounted}
    // compactType={this.state.compactType}
    // preventCollision={!this.state.compactType}
  >
    {generateDOM()}
  </ResponsiveReactGridLayout>
    </div>
  </div>
  );
}

export default App;
