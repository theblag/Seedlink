import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Signin from './pages/signin';
import Home from './pages/home';
import Navbar from './components/Navbar';
function App() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <main className="w-full flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signin isSignUp={true} />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;