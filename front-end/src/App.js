import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductListing from './pages/ProductListing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductListing />} />
      </Routes>
    </Router>
  );
}

export default App;
