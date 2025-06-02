import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/login";
import { NotFound } from "./components/notFound";
import Layout from "./components/layout/Layout";
import ManageUsers from "./features/users";
import ManageMatches from "./features/matches";
import ManageExchanges from "./features/exchanges";
import AddParticipants from "./features/exchanges/AddParticipants";
function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ManageUsers />} />
          <Route path="/matches" element={<ManageMatches />} />
          <Route path="/exchanges" element={<ManageExchanges />} />
          <Route
            path="/exchange/:id/add-participants"
            element={<AddParticipants />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
