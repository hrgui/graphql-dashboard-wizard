import React from 'react'
import {get} from 'lodash';

function SumMinMaxWidget({series, data}) {
  return (
    <div>
      {series.map(({sum, min, max, label, datasource}) => {

        const dataPtr = get(data, datasource);

        if (!dataPtr) {
          return <div>ERROR {JSON.stringify(series)}</div>
        }

        return <div>
            <h3 style={{textAlign: "center"}}>{label}</h3>
            <div style={{display: "flex", textAlign: "center", flexGrow: 1, flexBasis: 0, width: "100%"}}>
              <div style={{margin: "8px", flex: 1}}>
                <div style={{textTransform: "uppercase"}}>Minimum</div>
                {get(dataPtr, min)}
              </div>
              <div style={{margin: "8px", flex: 1}}>
                <div style={{textTransform: "uppercase"}}>Maximum</div>
                {get(dataPtr, max)}
              </div>
              <div style={{margin: "8px", flex: 1}}>
                <div style={{textTransform: "uppercase"}}>Total Sum</div>
                {get(dataPtr, sum)}
              </div>
            </div>
          </div>
      })}
    </div>
  )
}

export default SumMinMaxWidget
