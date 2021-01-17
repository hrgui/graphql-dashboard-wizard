import "./App.css";
import "react-resizable/css/styles.css";
import "react-grid-layout/css/styles.css";
import React, { useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { map } from "lodash";
import { Button } from "@material-ui/core";
import Wizard from "./Wizard";
import DashboardWidget from "./DashboardWidget";

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
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  const clearValue = () => {
    window.localStorage.removeItem(key);
  };

  return [storedValue, setValue, clearValue];
}

function generateLayout() {
  return [];
}

function App() {
  const [layout, setLayout, clearLayout] = useLocalStorage("layout", generateLayout());
  const [wizardOpen, setWizardOpen] = React.useState(false);
  const [widgetCount, setWidgetCount] = React.useState(layout.length);

  function generateDOM() {
    return map(layout, function (l, i) {
      return (
        <div key={i} className={l.static ? "static" : ""}>
          <DashboardWidget {...l} />
        </div>
      );
    });
  }

  function onLayoutChange(nlayout) {
    setLayout(
      nlayout.map((nl) => {
        const oldValues = layout.find((l) => l.i === nl.i);
        return { ...oldValues, ...nl };
      })
    );
  }

  function handleResetLayout() {
    clearLayout();
    setWidgetCount(0);
    setLayout(generateLayout());
  }

  function handleWizardClose() {
    setWizardOpen(false);
  }

  function handleAddWidget() {
    setWizardOpen(true);
  }

  return (
    <>
      <Wizard
        open={wizardOpen}
        onClose={handleWizardClose}
        onSubmit={(newWidget) => {
          //  console.log('sup');

          newWidget.w = +newWidget.w;
          newWidget.h = +newWidget.h;
          newWidget.x = +newWidget.x;
          newWidget.y = +newWidget.y;
          newWidget.i = `${widgetCount}`;
          setWidgetCount(widgetCount + 1);

          console.log("widgetAdded", newWidget);
          setLayout([...layout, newWidget]);
          setWizardOpen(false);
        }}
      />
      <div style={{ display: "flex" }}>
        <div style={{ marginRight: "16px" }}>
          <pre>{JSON.stringify(layout, null, 2)}</pre>
        </div>
        <div style={{ width: "100%" }}>
          <Button onClick={handleAddWidget}>Add Widget</Button>
          <Button onClick={handleResetLayout}>Reset Layout</Button>
          <ResponsiveReactGridLayout
            layouts={{ lg: layout }}
            onLayoutChange={onLayoutChange}
            measureBeforeMount={false}
          >
            {generateDOM()}
          </ResponsiveReactGridLayout>
        </div>
      </div>
    </>
  );
}

export default App;
