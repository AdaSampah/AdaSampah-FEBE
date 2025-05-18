import React from 'react';
import Laporkan from './pages/Laporkan';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <Router>
      <Laporkan/>
      
      {<Footer />}
    </Router>
  );
}

export default App;
