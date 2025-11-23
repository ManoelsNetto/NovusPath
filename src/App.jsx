// App.jsx (atualizado)
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Landpage from './pages/Landpage'; // Adicione esta importação
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Learning from './pages/Learning';
import Wellness from './pages/Wellness';
import Opportunities from './pages/Opportunities';
import Profile from './pages/Profile';
import StudyPlanner from './pages/StudyPlanner';
import { getUser } from './services/storage';
import CareerDetails from './pages/CareerDetails';

function PrivateRoute({ children }) {
  const user = getUser();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Routes>
        <Route path="/" element={<Landpage />} /> {/* Nova rota da landpage */}
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/career/:id"
          element={
            <PrivateRoute>
              <CareerDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/learning"
          element={
            <PrivateRoute>
              <Learning />
            </PrivateRoute>
          }
        />
        <Route
          path="/wellness"
          element={
            <PrivateRoute>
              <Wellness />
            </PrivateRoute>
          }
        />
        <Route
          path="/opportunities"
          element={
            <PrivateRoute>
              <Opportunities />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          path="/study-planner"
          element={
            <PrivateRoute>
              <StudyPlanner />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;