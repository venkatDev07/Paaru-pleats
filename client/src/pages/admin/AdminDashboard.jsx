import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AdminLayout from '../../layouts/AdminLayout'
import { useAuth } from '../../context/AuthContext'
import * as workService from '../../services/workService'

function AdminDashboard() {
    const { admin } = useAuth()
    const [stats, setStats] = useState({ total: 0, categories: 0 })
    const [recentWorks, setRecentWorks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await workService.getWorks({ limit: 6 })
                setRecentWorks(data.works)
                const uniqueCategories = new Set(data.works.map((w) => w.category))
                setStats({ total: data.pagination.total, categories: uniqueCategories.size })
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <AdminLayout title="Dashboard">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mb-8"
            >
                <p className="text-charcoal/60">
                    Welcome back, <span className="font-medium text-primary">{admin?.email}</span>
                </p>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
                {[
                    { label: 'Total Works', value: stats.total, icon: '🧵' },
                    { label: 'Categories', value: stats.categories, icon: '🏷️' },
                    { label: 'Status', value: 'Live', icon: '✅' },
                ].map((stat, i) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white rounded-2xl p-5 shadow-sm border border-primary/5"
                    >
                        <div className="text-2xl mb-2">{stat.icon}</div>
                        <p className="text-2xl font-heading font-semibold text-primary">{stat.value}</p>
                        <p className="text-xs text-charcoal/50 mt-1">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            {/* Quick action */}
            <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading text-xl font-semibold text-primary">Recent Works</h2>
                <Link
                    to="/admin/works"
                    className="text-sm text-accent font-medium hover:text-primary transition-colors"
                >
                    Manage all →
                </Link>
            </div>

            {loading ? (
                <div className="text-center py-16 text-charcoal/40">Loading...</div>
            ) : recentWorks.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 text-center border border-primary/5">
                    <p className="text-charcoal/50 mb-4">You haven't posted any work yet.</p>
                    <Link
                        to="/admin/works"
                        className="inline-block bg-accent text-primary-dark font-semibold px-6 py-2.5 rounded-full hover:bg-accent-light transition-colors"
                    >
                        Add Your First Work
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {recentWorks.map((work) => (
                        <div key={work._id} className="bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5">
                            <div className="aspect-square">
                                <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-2.5">
                                <p className="text-xs font-medium text-primary truncate">{work.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </AdminLayout>
    )
}

export default AdminDashboard