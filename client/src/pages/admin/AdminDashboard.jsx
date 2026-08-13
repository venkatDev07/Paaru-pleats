import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
    const { admin, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-cream pt-16 px-6">
            <div className="max-w-6xl mx-auto py-10">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="font-heading text-3xl font-semibold text-primary">
                        Welcome, {admin?.email}
                    </h1>
                    <button
                        onClick={handleLogout}
                        className="text-sm text-primary border border-primary/30 px-5 py-2 rounded-full hover:bg-primary hover:text-cream transition-colors"
                    >
                        Logout
                    </button>
                </div>
                <p className="text-charcoal/60">Dashboard content coming next...</p>
            </div>
        </div>
    )
}

export default AdminDashboard