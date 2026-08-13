import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import AdminSidebar from '../components/admin/AdminSidebar'

function AdminLayout({ children, title }) {
    const [drawerOpen, setDrawerOpen] = useState(false)
    const { admin, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/admin/login')
    }

    return (
        <div className="min-h-screen bg-cream flex">
            {/* Desktop sidebar */}
            <aside className="hidden md:block w-64 fixed inset-y-0 left-0 z-30">
                <AdminSidebar />
            </aside>

            {/* Mobile drawer */}
            <AnimatePresence>
                {drawerOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setDrawerOpen(false)}
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="fixed inset-y-0 left-0 w-72 z-50 md:hidden"
                        >
                            <AdminSidebar onNavigate={() => setDrawerOpen(false)} />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Main content area */}
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
                {/* Topbar */}
                <header className="sticky top-0 z-20 bg-cream/95 backdrop-blur-sm border-b border-primary/10 px-5 sm:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setDrawerOpen(true)}
                            className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg hover:bg-primary/5"
                            aria-label="Open menu"
                        >
                            <span className="block w-5 h-0.5 bg-primary mb-1.5" />
                            <span className="block w-5 h-0.5 bg-primary" />
                        </button>
                        <h1 className="font-heading text-xl sm:text-2xl font-semibold text-primary">
                            {title}
                        </h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="hidden sm:block text-sm text-charcoal/60">{admin?.email}</span>
                        <button
                            onClick={handleLogout}
                            className="text-sm font-medium text-primary border border-primary/20 px-4 py-1.5 rounded-full hover:bg-primary hover:text-cream transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                <main className="flex-1 px-5 sm:px-8 py-6">{children}</main>
            </div>
        </div>
    )
}

export default AdminLayout