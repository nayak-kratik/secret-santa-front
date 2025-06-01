import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './features/login';
import Dashboard from './features/dashboard';
import NotFound from './components/notFound';
import Layout from './components/layout/Layout';
function App() {
    return (
      <Router>
        <Layout>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </Router>
    );
}

export default App;