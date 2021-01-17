import React, { useState } from 'react';

import { CodeEditor, Input, Button } from '@grafana/ui';

const defaultField = {
  name: '',
  jq: '',
};
export const QueryEditor = (props) => {
  const [fields, setFields] = useState(props.query.fields);

  const { query } = props.query;

  return (
    <>
      <>
        <CodeEditor
          language={'graphql'}
          value={query}
          showMiniMap={false}
          showLineNumbers={true}
          height={'250px'}
          onBlur={value =>
            props.onChange({
              ...props.query,
              query: value,
            })
          }
        />
      </>

      {fields &&
        fields.map((field, index) => (
          <div key={index}>
            <>
              <hr />
              <Input
                css=""
                placeholder="jq query"
                value={field.jq}
                onChange={e =>
                  setFields(
                    fields.map((v, i) =>
                      i === index
                        ? {
                            ...fields[i],
                            jq: e.currentTarget.value,
                          }
                        : v
                    )
                  )
                }
                onBlur={() =>
                  props.onChange({
                    ...props.query,
                    fields,
                  })
                }
              />
              <Input
                css=""
                placeholder="name"
                value={field.name}
                onChange={e =>
                  setFields(
                    fields.map((v, i) =>
                      i === index
                        ? {
                            ...fields[i],
                            name: e.currentTarget.value,
                          }
                        : v
                    )
                  )
                }
                onBlur={() =>
                  props.onChange({
                    ...props.query,
                    fields,
                  })
                }
              />
              <hr />
            </>
          </div>
        ))}

      <Button onClick={_ => setFields(fields ? [...fields, defaultField] : [defaultField])}>Add field</Button>
    </>
  );
};