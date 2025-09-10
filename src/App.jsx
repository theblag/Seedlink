import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Signin from './pages/signin';
import Home from './pages/home';
function App() {
  return (
    <div>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/home" element={<Home />} />
            <Route path="/upload-store" element={<Home />} />

          </Routes>
    </div>
  );
}

export default App;