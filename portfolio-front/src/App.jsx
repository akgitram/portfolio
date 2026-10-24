import { Navigate, Route, Routes } from "react-router-dom";
import Portfolio from "./pages/.Portfolio";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
     <Routes>
      <Route path="/" element={<Portfolio/>}/>
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/admin/login" element={<AdminLogin/>}/>
      <Route element={<ProtectedRoute requiredRole="ADMIN"/>} >
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Route>
    </Routes>
  )
}

export default App