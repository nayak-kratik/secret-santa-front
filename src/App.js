import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./features/login";
import { NotFound } from "./components/notFound";
import Layout from "./components/layout/Layout";
import ManageUsers from "./features/users";
import ManageMatches from "./features/matches";
import ManageExchanges from "./features/exchanges";
import AddParticipants from "./features/participant";
import SetExclusionRules from "./features/exclusion";
import ViewMatch from "./features/matches/ViewMatch";
import ProtectedRoute from "./components/routes/ProtectedRoute";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected  Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<ManageUsers />} />
            <Route path="/matches" element={<ManageMatches />} />
            <Route path="/exchanges" element={<ManageExchanges />} />
            <Route
              path="/exchange/:exchangeId/add-participants"
              element={<AddParticipants />}
            />
            <Route
              path="/exchange/:exchangeId/exclusion"
              element={<SetExclusionRules />}
            />
            <Route
              path="/exchange/:exchangeId/matches"
              element={<ViewMatch />}
            />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
