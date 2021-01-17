import React from 'react'
import { Chart } from "react-charts";
import faker from 'faker';

function DashboardWidget(props) {
  const series = React.useMemo(
    () => ({
      showPoints: false,
    }),
    []
  );

  const axes = React.useMemo(
    () => [
      {
        primary: true,
        type: "time",
        position: "bottom",
        // filterTicks: (ticks) =>
        //   ticks.filter((date) => +timeDay.floor(date) === +date),
      },
      { type: "linear", position: "left" },
    ],
    []
  );

  const data = React.useMemo(() => [{
    "label": "Series 1",
    "data": [
      {
        "primary": faker.date.recent(10),
        "secondary": 17
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 88
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 94
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 97
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 57
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 61
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 73
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 53
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 56
      },
      {
        "primary": faker.date.recent(10),
        "secondary": 22
      }
    ]
  }], []);

  return (
    <Chart data={data} series={series} axes={axes} tooltip />
  )
}

export default DashboardWidget
