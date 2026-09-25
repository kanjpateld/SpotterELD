import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import PlanTripPage from './pages/PlanTripPage';
import HistoryPage from './pages/HistoryPage';
import TripDetailPage from './pages/TripDetailPage';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/plan" element={<PlanTripPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/history/:id" element={<TripDetailPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
