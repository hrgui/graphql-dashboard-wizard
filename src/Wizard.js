import React from "react";
import { Modal, Button } from "@material-ui/core";

import { useForm, useFieldArray } from "react-hook-form";

function Wizard({onSubmit: _onSubmit, ...props}) {
  // errors
  const { control, register, handleSubmit, watch } = useForm({
    defaultValues: {
      w: 5,
      h: 3,
      x: 0,
      y: 0,
      static: false,
      title: `widget-${Date.now()}`,
      widget_type: "line",
      query: `query LineChartData {
  player_logins {
    timestamp
    count
  }
}
      `,
      series: [
        {
          label: "Logins",
          datasource: "player_logins",
          primary: "timestamp",
          secondary: "count",
        },
      ],
    },
  });

//  prepend, remove, swap, move, insert
  const { fields, append } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: "series", // unique name for your Field Array
  });

  const watchAllFields = watch(); // when pass nothing as argument, you are watching everything
  const onSubmit = (data) => {
    _onSubmit(data);
  }

  return (
    <Modal
      {...props}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div
        style={{
          background: "white",
          width: "50%",
          position: "absolute",
          top: "16px",
          left: "25%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor="title">Title</label>
            <input id="title" name="title" defaultValue="test" ref={register} />
          </div>

          <div>
            Width: <input type="number" id="w" name="w" ref={register} /><br/>
            Height: <input type="number" id="h" name="h" ref={register} /><br/>
            x: <input type="number" id="x" name="x" ref={register} /><br/>
            y: <input type="number" id="y" name="y" ref={register} /><br/>
          </div>

          <br />

          <div>
            <label htmlFor="widget_type">Widget Type</label>
            <select name="widget_type" ref={register}>
              <option value="line">line</option>
              <option value="bubble">bubble</option>
              <option value="area">area</option>
              <option value="bar">bar</option>
              <option value="sum_min_max">sum_min_max</option>
            </select>
          </div>

          <br />
          <br />

          <div>
            <div>
              <label htmlFor="query">Graphql Query</label>
            </div>
            <textarea name="query" ref={register} rows={10} cols={30}></textarea>
          </div>

          <div>
            <Button onClick={append}>Add Series</Button>
          </div>

          {fields.map((field, index) => (
            <div key={field.id} style={{ margin: "16px" }}>
              <div>
                Label
                <input
                  style={{ width: "100%" }}
                  name={`series[${index}].label`}
                  ref={register()} // register() when there is no validation rules
                  defaultValue={field.label} // make sure to include defaultValue
                />
              </div>
              <div>
                Datasource
                <input
                  style={{ width: "100%" }}
                  name={`series[${index}].datasource`}
                  ref={register()} // register() when there is no validation rules
                  defaultValue={field.datasource} // make sure to include defaultValue
                />
              </div>
              <div>
                Primary
                <input
                  name={`series[${index}].primary`}
                  ref={register()} // register() when there is no validation rules
                  defaultValue={field.primary} // make sure to include defaultValue
                />
              </div>

              <div>
                Secondary
                <input
                  name={`series[${index}].secondary`}
                  ref={register()} // register() when there is no validation rules
                  defaultValue={field.secondary} // make sure to include defaultValue
                />
              </div>

              {watchAllFields.widget_type === "bubble" && (
                <div>
                  Radius
                  <input
                    name={`series[${index}].radius`}
                    ref={register()} // register() when there is no validation rules
                    defaultValue={field.radius} // make sure to include defaultValue
                  />
                </div>
              )}
            </div>
          ))}

          <div>
            <input type="submit" />
          </div>

          {<pre>{JSON.stringify(watchAllFields, null, 2)}</pre>}
        </form>
      </div>
    </Modal>
  );
}

export default Wizard;
