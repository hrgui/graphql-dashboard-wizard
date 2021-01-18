import React from "react";
import { useQuery, gql } from "@apollo/client";
import LineChartWidget from './LineChartWidget';
import SumMinMaxWidget from './SumMinMaxWidget';

function DashboardWidget(props) {
  const { loading, error, data } = useQuery(
    gql`
      ${props.query}
    `
  );

  console.log(loading, error, data);

  if (loading) {
    return null;
  }

  if (error) {
    console.error(error);
    return <div>
      Data Fetching Error, check query: {props.query}
    </div>
  }


  if (props.widget_type === "line") {
    return <LineChartWidget data={data} {...props} />;
  }

  if (props.widget_type === "sum_min_max") {
    return <SumMinMaxWidget data={data} {...props} />;
  }

  return <div>Not Implemented</div>
}

export default DashboardWidget;
