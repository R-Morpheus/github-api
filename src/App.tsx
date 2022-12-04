import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navigation from "./components/Navigation";
import {FavouritesPage} from "./pages/FavouritesPages";


function App() {
  return (
      <>
          <Navigation/>
          <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/favourites' element={<FavouritesPage/>}/>
          </Routes>
      </>

  );
}

export default App;
