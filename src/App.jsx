import { Route, Routes } from 'react-router-dom';
import Landing from './pages/landing';
import Signin from './pages/signin';
import Home from './pages/home';
import Shop from './pages/shop-3d';
import Navbar from './components/Navbar';
import ShopkeeperDashboard from './pages/shopkeeper-dashboard';
function App() {
  return (
    <div className="min-h-screen bg-bg-primary w-full overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signin isSignUp={true} />} />
          <Route path="/home" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shopkeeper-dashboard" element={<ShopkeeperDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;