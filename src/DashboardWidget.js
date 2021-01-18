import React from "react";
import { useQuery, gql } from "@apollo/client";
import LineChartWidget from './LineChartWidget';

function DashboardWidget(props) {
  const { loading, data } = useQuery(
    gql`
      ${props.query}
    `
  );

  if (loading) {
    return null;
  }

  return <LineChartWidget data={data} {...props} />;
}

export default DashboardWidget;
