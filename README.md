# graphql-dashboard-wizard

# Dependencies chosen

- msw
- material-ui
- react-hook-form
- react-charts
- react-grid-layout

## Flow

1. Add Widget
2. I have a GraphQL Query + Variables
3. what chart you want (line, bubble, area, bar, column)
4. Title
5. Add Series is a button - point series to data (either root or somewhere in an object)  

for each in data:  
6. Tell me where the data is for "primary" / label (bar)  
7. Tell me where the data is for "secondary"  
8. Tell me where the data is for "radius" (bubble)  
  
All done:  
9. Save Dashboard JSON / Copy Dashboard JSON



## Data Types

### Line Chart

```json
{
  "label": "Series 1",
  "data": [
    {
      "primary": "2021-01-17T03:00:00.000Z",
      "secondary": 17
    },
    {
      "primary": "2021-01-18T03:00:00.000Z",
      "secondary": 88
    },
    {
      "primary": "2021-01-19T03:00:00.000Z",
      "secondary": 94
    },
    {
      "primary": "2021-01-20T03:00:00.000Z",
      "secondary": 97
    },
    {
      "primary": "2021-01-21T03:00:00.000Z",
      "secondary": 57
    },
    {
      "primary": "2021-01-22T03:00:00.000Z",
      "secondary": 61
    },
    {
      "primary": "2021-01-23T03:00:00.000Z",
      "secondary": 73
    },
    {
      "primary": "2021-01-24T03:00:00.000Z",
      "secondary": 53
    },
    {
      "primary": "2021-01-25T03:00:00.000Z",
      "secondary": 56
    },
    {
      "primary": "2021-01-26T03:00:00.000Z",
      "secondary": 22
    }
  ]
}
```

### Bubble Chart

```json
{
    "label": "Series 1",
    "data": [
      {
        "primary": 96,
        "secondary": 41,
        "radius": 5
      },
      {
        "primary": 62,
        "secondary": 68,
        "radius": 1
      },
      {
        "primary": 18,
        "secondary": 19,
        "radius": 7
      },
      {
        "primary": 52,
        "secondary": 21,
        "radius": 5
      },
      {
        "primary": 27,
        "secondary": 12,
        "radius": 8
      },
      {
        "primary": 47,
        "secondary": 41,
        "radius": 2
      },
      {
        "primary": 27,
        "secondary": 51,
        "radius": 12
      },
      {
        "primary": 42,
        "secondary": 84,
        "radius": 7
      },
      {
        "primary": 10,
        "secondary": 44,
        "radius": 1
      },
      {
        "primary": 4,
        "secondary": 30,
        "radius": 9
      }
    ]
  }
  ```

### Area Chart

  ```json
  {
    "label": "Series 1",
    "data": [
      {
        "primary": "2021-01-17T03:00:00.000Z",
        "secondary": 12
      },
      {
        "primary": "2021-01-17T03:30:00.000Z",
        "secondary": 5
      },
      {
        "primary": "2021-01-17T04:00:00.000Z",
        "secondary": 31
      },
      {
        "primary": "2021-01-17T04:30:00.000Z",
        "secondary": 35
      },
      {
        "primary": "2021-01-17T05:00:00.000Z",
        "secondary": 92
      },
      {
        "primary": "2021-01-17T05:30:00.000Z",
        "secondary": 88
      },
      {
        "primary": "2021-01-17T06:00:00.000Z",
        "secondary": 11
      },
      {
        "primary": "2021-01-17T06:30:00.000Z",
        "secondary": 4
      },
      {
        "primary": "2021-01-17T07:00:00.000Z",
        "secondary": 97
      },
      {
        "primary": "2021-01-17T07:30:00.000Z",
        "secondary": 81
      }
    ]
  }
  ```


### Bar Chart

  ```json

  {
    "label": "Series 1",
    "data": [
      {
        "primary": "Ordinal Group 0",
        "secondary": 57
      },
      {
        "primary": "Ordinal Group 1",
        "secondary": 35
      },
      {
        "primary": "Ordinal Group 2",
        "secondary": 30
      },
      {
        "primary": "Ordinal Group 3",
        "secondary": 95
      },
      {
        "primary": "Ordinal Group 4",
        "secondary": 37
      },
      {
        "primary": "Ordinal Group 5",
        "secondary": 40
      },
      {
        "primary": "Ordinal Group 6",
        "secondary": 39
      },
      {
        "primary": "Ordinal Group 7",
        "secondary": 97
      },
      {
        "primary": "Ordinal Group 8",
        "secondary": 3
      },
      {
        "primary": "Ordinal Group 9",
        "secondary": 90
      }
    ]
  }
]
```

### Column Chart

```json
  {
    "label": "Series 1",
    "data": [
      {
        "primary": "Ordinal Group 0",
        "secondary": 35
      },
      {
        "primary": "Ordinal Group 1",
        "secondary": 28
      },
      {
        "primary": "Ordinal Group 2",
        "secondary": 73
      }
    ]
  }
]
```