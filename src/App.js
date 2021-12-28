import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import SwagiApiService from './SwagiApiService'
import { TablePage } from './Pages/TablePage';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // useEffect(() => {
    
  //   fetch("https://www.swapi.tech/api/vehicles?page=1&limit=1000")
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         setIsLoaded(true);
  //         setItems(result);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     )
  // }, [])

  // if (error) {
  //   return <div>Error: {error.message}</div>;
  // } else if (!isLoaded) {
  //   return <div>Loading...</div>;
  // } else {
  //   return (
  //     <ul>
  //       {items}
  //     </ul>
  //   );
  // }

  return (
    <TablePage></TablePage>
  )
}

export default App;
