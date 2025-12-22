import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Editor from './pages/Editor';
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
       {/* The Navbar lives outside the Routes so it is ALWAYS visible */}
       {/* If you only want Navbar on Home, move it inside the Home component */}
       {/* For now, let's keep it global */}
      
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        {/* We generally don't want a top navbar inside the Editor because it takes up space. 
            So we render Editor WITHOUT the Navbar wrapper. */}
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App