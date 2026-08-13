import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import AdminLayout from '../../layouts/AdminLayout'
import WorkCard from '../../components/admin/WorkCard'
import WorkFormModal from '../../components/admin/WorkFormModal'
import ConfirmDialog from '../../components/admin/ConfirmDialog'
import * as workService from '../../services/workService'

const categories = ['All', 'Silk', 'Cotton', 'Georgette', 'Chiffon', 'Banarasi', 'Kanjivaram', 'Other']

function AdminWorks() {
    const [works, setWorks] = useState([])
    const [loading, setLoading] = useState(true)
    const [filter, setFilter] = useState('All')
    const [modalOpen, setModalOpen] = useState(false)
    const [editingWork, setEditingWork] = useState(null)
    const [deleteTarget, setDeleteTarget] = useState(null)
    const [toast, setToast] = useState('')

    const fetchWorks = useCallback(async () => {
        setLoading(true)
        try {
            const params = filter !== 'All' ? { category: filter, limit: 50 } : { limit: 50 }
            const data = await workService.getWorks(params)
            setWorks(data.works)
        } catch (err) {
            setToast('Failed to load works')
        } finally {
            setLoading(false)
        }
    }, [filter])

    useEffect(() => {
        fetchWorks()
    }, [fetchWorks])

    useEffect(() => {
        if (!toast) return
        const t = setTimeout(() => setToast(''), 3000)
        return () => clearTimeout(t)
    }, [toast])

    const handleAddNew = () => {
        setEditingWork(null)
        setModalOpen(true)
    }

    const handleEdit = (work) => {
        setEditingWork(work)
        setModalOpen(true)
    }

    const handleFormSubmit = async (payload) => {
        if (editingWork) {
            await workService.updateWork(editingWork._id, payload)
            setToast('Work updated successfully')
        } else {
            await workService.createWork(payload)
            setToast('Work added successfully')
        }
        fetchWorks()
    }

    const handleDeleteConfirm = async () => {
        try {
            await workService.deleteWork(deleteTarget._id)
            setToast('Work deleted')
            setWorks((prev) => prev.filter((w) => w._id !== deleteTarget._id))
        } catch {
            setToast('Failed to delete work')
        } finally {
            setDeleteTarget(null)
        }
    }

    return (
        <AdminLayout title="Manage Works">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <div className="fixed top-20 right-6 z-[200] bg-primary text-cream px-5 py-3 rounded-xl shadow-xl text-sm">
                        {toast}
                    </div>
                )}
            </AnimatePresence>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === cat
                                    ? 'bg-primary text-cream'
                                    : 'bg-white text-charcoal/60 border border-primary/10 hover:bg-primary/5'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <button
                    onClick={handleAddNew}
                    className="bg-accent text-primary-dark font-semibold px-5 py-2.5 rounded-full hover:bg-accent-light transition-colors whitespace-nowrap"
                >
                    + Add New Work
                </button>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="text-center py-20 text-charcoal/40">Loading works...</div>
            ) : works.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-charcoal/50 mb-4">No work posts yet.</p>
                    <button
                        onClick={handleAddNew}
                        className="bg-accent text-primary-dark font-semibold px-6 py-2.5 rounded-full hover:bg-accent-light transition-colors"
                    >
                        Add Your First Work
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    <AnimatePresence>
                        {works.map((work) => (
                            <WorkCard
                                key={work._id}
                                work={work}
                                onEdit={handleEdit}
                                onDelete={setDeleteTarget}
                            />
                        ))}
                    </AnimatePresence>
                </div>
            )}

            <WorkFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingWork}
            />

            <ConfirmDialog
                open={Boolean(deleteTarget)}
                title="Delete this work?"
                message={`"${deleteTarget?.title}" will be permanently removed, including its photo.`}
                confirmLabel="Delete"
                onConfirm={handleDeleteConfirm}
                onCancel={() => setDeleteTarget(null)}
            />
        </AdminLayout>
    )
}

export default AdminWorks