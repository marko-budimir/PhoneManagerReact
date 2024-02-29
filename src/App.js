import logo from './logo.svg';
import './App.css';
import DisplayTable from './Table/DisplayTable';
import InputForm from './Form/InputForm';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Display</Link>
            </li>
            <li>
              <Link to="/add">Add</Link>
            </li>
          </ul>
        </nav>
        <hr />
        <h1>Mobile Phone Manager</h1> 
        <div>
          <Routes>
            <Route path="/" element={<DisplayTable />} />
            <Route path="/add" element={<InputForm />} />
            <Route path="/edit/:id" element={<InputForm />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
