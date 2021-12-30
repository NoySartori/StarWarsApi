import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import SwagiApiService from './SwagiApiService'
import { TableComponent } from './Pages/TableComponent';
import { ChartBarComponent } from './Pages/ChartBarComponent';

function App() {
  return (

    <div>
      <TableComponent></TableComponent>
      <ChartBarComponent></ChartBarComponent>
    </div>

  )
}

export default App;
