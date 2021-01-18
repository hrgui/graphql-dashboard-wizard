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

const DEFAULT_LAYOUT = [
  {
    "title": "widget-1610935219422",
    "w": 5,
    "h": 3,
    "x": 0,
    "y": 0,
    "widget_type": "line",
    "query": "query LineChartData {\n  player_logins {\n    timestamp\n    count\n  }\n}\n      ",
    "series": [
      {
        "label": "Logins",
        "datasource": "player_logins",
        "primary": "timestamp",
        "secondary": "count"
      }
    ],
    "i": "0",
    "moved": false,
    "static": false
  },
  {
    "title": "widget-1610935501685",
    "w": 5,
    "h": 3,
    "x": 5,
    "y": 0,
    "widget_type": "line",
    "query": "query LineChartData {\n  player_logins(min_date:\"2021-12-01\", max_date: \"2022-01-01\") {\n    timestamp\n    count\n  }\n}\n      ",
    "series": [
      {
        "label": "Logins",
        "datasource": "player_logins",
        "primary": "timestamp",
        "secondary": "count"
      }
    ],
    "i": "1",
    "moved": false,
    "static": false
  },
  {
    "title": "widget-1610935501685",
    "w": 5,
    "h": 3,
    "x": 0,
    "y": 3,
    "widget_type": "sum_min_max",
    "query": `

query SumMinMaxData {
  player_logins_agg {
    sum
    min
    max
  }
}   
    
`,
    "series": [
      {
        "label": "Logins Aggregrates",
        "datasource": "player_logins_agg",
        "sum": "sum",
        "min": "min",
        "max": "max"
      }
    ],
    "i": "2",
    "moved": false,
    "static": false
  },
  {
    "title": "widget-1610935501685",
    "w": 5,
    "h": 3,
    "x": 5,
    "y": 3,
    "widget_type": "line",
    "query": `

query LineChartData {
  jan_logins: player_logins(min_date: "2021-01-01", max_date: "2021-01-28", overlay: true) {
    timestamp
    count
  },
  feb_logins: player_logins(min_date: "2021-02-01", max_date: "2021-02-28", overlay: true) {
    timestamp
    count
  },
  mar_logins: player_logins(min_date: "2021-03-01", max_date: "2021-03-28", overlay: true) {
    timestamp
    count
  }
}
    
`,
    "series": [
      {
        "label": "January Logins",
        "datasource": "jan_logins",
        "primary": "timestamp",
        "secondary": "count"
      },
      {
        "label": "February Logins",
        "datasource": "feb_logins",
        "primary": "timestamp",
        "secondary": "count"
      },
      {
        "label": "March Logins",
        "datasource": "mar_logins",
        "primary": "timestamp",
        "secondary": "count"
      }
    ],
    "i": "3",
    "moved": false,
    "static": false
  }
];

function generateLayout() {
  return DEFAULT_LAYOUT;
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
    setWidgetCount(DEFAULT_LAYOUT.length);
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
      <div>
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
        <div style={{ marginRight: "16px" }}>
          <pre>{JSON.stringify(layout, null, 2)}</pre>
        </div>
      </div>
    </>
  );
}

export default App;
