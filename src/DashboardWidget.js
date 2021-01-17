import React from 'react'
import { Chart } from "react-charts";
import {get} from 'lodash';
const data = {player_logins: require('./data.json')};

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

  const _data = React.useMemo(() => props.series.map(series => {
    const datasource = get(data, series.datasource);
    
    return {
      label: series.label,
      data: datasource.map(dataSourceRecord => {
        // TODO radius support
        // TODO: assume it may not be date
        return {
          primary: new Date(get(dataSourceRecord, series.primary)),
          secondary: get(dataSourceRecord, series.secondary)
        }
      })
    }

  }) , [props.series]);

  return (
    <Chart data={_data} series={series} axes={axes} tooltip />
  )
}

export default DashboardWidget
