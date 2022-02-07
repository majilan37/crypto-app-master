import Sidebar from "./components/Sidebar";
import {Routes, Route, useLocation} from 'react-router'
import Home from "./components/Home";
import Cryptocurrencies from "./components/Cryptocurrencies";
import News from "./components/News";
import CryptoDetails from "./components/CryptoDetails";


function App() {
  const location = useLocation()
  return (
    <div className="flex">
      <Sidebar location={location} />
      <main className="flex-grow ml-[280px] " >
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
          <Route path='/cryptocurrencies/:id' element={<CryptoDetails />} />
          <Route path='/news' element={<News />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;