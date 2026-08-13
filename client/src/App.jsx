import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminWorks from './components/admin/AdminWorks'

function Works() {
  return <div className="min-h-screen flex items-center justify-center pt-16">Works Page</div>
}

function Contact() {
  return <div className="min-h-screen flex items-center justify-center pt-16">Contact Page</div>
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/works"
            element={
              <ProtectedRoute>
                <AdminWorks />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/works" element={<Works />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App