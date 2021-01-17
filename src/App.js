import logo from './logo.svg';
import './App.css';
import { QueryEditor } from './QueryEditor';
import React from 'react';

function App() {
  const [query, setQuery] = React.useState({fields: [], query: ""});


  return (
    <div className="App">
      <QueryEditor query={query} onChange={(z) => {
        setQuery(z);
      }} />
    </div>
  );
}

export default App;
