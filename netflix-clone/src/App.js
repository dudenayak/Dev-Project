import './App.scss';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home.jsx'
import Header from './components/Header/Header.jsx';

function App() {
  return (
      <Router >
      <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
        </Routes>
      </Router>
  );
}

export default App;
