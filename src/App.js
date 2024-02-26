import './App.css';
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Notes from './pages/Notes';
import Create from './pages/Create';
import { ThemeProvider, createTheme } from '@mui/material/styles';  //create theme
import { green, purple, red } from '@mui/material/colors';
import Layout from './component/Layout';
import DeletedNotes from './pages/DeletedNotes';
import TodayNotes from './pages/TodayNotes';
import CheckedNotes from './pages/CheckedNotes';

/* create theme */
const theme = createTheme({
  /* palette: {
    primary: {
      // main: red[500]
      // main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontSize: 14,
    fontFamily: 'Quicksand',
    fontweightLight: 300,
    fontweightRegular: 400,
    fontweightMedium: 500,
    fontweightBold: 700,
  } */
})

function App() {

  const [viewMode, setViewMode] = useState('grid');

  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout viewMode={viewMode} setViewMode={setViewMode}>
          <Routes>
            <Route exact path='/' element={<Notes viewMode={viewMode} />} />
            <Route path='/create' element={<Create />} />
            <Route path='/today' element={<TodayNotes viewMode={viewMode} />} />
            <Route path='/checked' element={<CheckedNotes viewMode={viewMode} />} />
            <Route path='/deleted' element={<DeletedNotes viewMode={viewMode} />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
