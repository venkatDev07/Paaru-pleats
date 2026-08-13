import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { uploadImageToCloudinary } from '../../services/cloudinary'
import './WorkFormModal.css'

const categories = ['Silk', 'Cotton', 'Georgette', 'Chiffon', 'Banarasi', 'Kanjivaram', 'Other']

function WorkFormModal({ open, onClose, onSubmit, initialData }) {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('Silk')
    const [imageFile, setImageFile] = useState(null)
    const [previewUrl, setPreviewUrl] = useState('')
    const [existingImage, setExistingImage] = useState(null) // { imageUrl, imagePublicId }
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [dragActive, setDragActive] = useState(false)
    const fileInputRef = useRef(null)

    const isEdit = Boolean(initialData)

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || '')
            setDescription(initialData.description || '')
            setCategory(initialData.category || 'Silk')
            setPreviewUrl(initialData.imageUrl || '')
            setExistingImage({
                imageUrl: initialData.imageUrl,
                imagePublicId: initialData.imagePublicId,
            })
        } else {
            setTitle('')
            setDescription('')
            setCategory('Silk')
            setPreviewUrl('')
            setExistingImage(null)
        }
        setImageFile(null)
        setError('')
        setDragActive(false)
    }, [initialData, open])

    const applyFile = (file) => {
        if (!file || !file.type.startsWith('image/')) return
        setImageFile(file)
        setPreviewUrl(URL.createObjectURL(file))
        setError('')
    }

    const handleFileChange = (e) => {
        applyFile(e.target.files[0])
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragActive(false)
        applyFile(e.dataTransfer.files?.[0])
    }

    const handleRemoveImage = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setImageFile(null)
        setPreviewUrl('')
        setExistingImage(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!title.trim()) {
            setError('Title is required')
            return
        }
        if (!imageFile && !existingImage) {
            setError('Please select an image')
            return
        }

        setUploading(true)
        try {
            let imageData = existingImage

            if (imageFile) {
                imageData = await uploadImageToCloudinary(imageFile)
            }

            await onSubmit({
                title: title.trim(),
                description: description.trim(),
                category,
                imageUrl: imageData.imageUrl,
                imagePublicId: imageData.imagePublicId,
            })

            onClose()
        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong. Please try again.')
        } finally {
            setUploading(false)
        }
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="wf-backdrop fixed inset-0 z-[100] flex items-end sm:items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 60, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 40, scale: 0.97 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onClick={(e) => e.stopPropagation()}
                        className="wf-modal bg-cream w-full sm:max-w-lg max-h-[92vh] overflow-y-auto"
                    >
                        <div className="wf-header sticky top-0 bg-cream px-6 pt-6 pb-4 flex items-center justify-between">
                            <div>
                                <span className="wf-eyebrow text-accent">
                                    {isEdit ? 'Editing' : 'New Entry'}
                                </span>
                                <h2 className="font-heading text-2xl font-semibold text-primary leading-tight">
                                    {isEdit ? 'Edit Work' : 'Add New Work'}
                                </h2>
                            </div>
                            <button onClick={onClose} className="wf-close text-charcoal/50" aria-label="Close">
                                &times;
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                            {/* Image upload */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05, duration: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-charcoal/70 mb-2">Photo</label>
                                <label
                                    htmlFor="workImage"
                                    className={`wf-dropzone block aspect-video rounded-xl bg-white cursor-pointer relative overflow-hidden
                                        ${dragActive ? 'wf-dropzone--active' : ''}
                                        ${previewUrl ? 'wf-dropzone--filled' : ''}`}
                                    onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
                                    onDragLeave={() => setDragActive(false)}
                                    onDrop={handleDrop}
                                >
                                    {previewUrl ? (
                                        <>
                                            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="wf-preview-overlay">
                                                <span>Tap to change</span>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="wf-remove-btn"
                                                aria-label="Remove photo"
                                            >
                                                &times;
                                            </button>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center text-charcoal/40">
                                            <span className="wf-dropzone-icon">🧵</span>
                                            <span className="text-sm font-medium text-charcoal/60">
                                                Drop a photo here or tap to browse
                                            </span>
                                            <span className="text-xs text-charcoal/35 mt-1">JPG or PNG, up to 10MB</span>
                                        </div>
                                    )}
                                </label>
                                <input
                                    id="workImage"
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </motion.div>

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1, duration: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-charcoal/70 mb-1.5">Title</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Silk Saree Pleating"
                                    className="wf-input w-full px-4 py-2.5 rounded-lg bg-white"
                                />
                            </motion.div>

                            {/* Category */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15, duration: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-charcoal/70 mb-2">Category</label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((cat) => (
                                        <button
                                            type="button"
                                            key={cat}
                                            onClick={() => setCategory(cat)}
                                            className={`wf-chip ${category === cat ? 'wf-chip--active' : ''}`}
                                        >
                                            {cat}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Description */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                            >
                                <label className="block text-sm font-medium text-charcoal/70 mb-1.5">
                                    Description <span className="text-charcoal/40">(optional)</span>
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={3}
                                    placeholder="Any notes about this work..."
                                    className="wf-input w-full px-4 py-2.5 rounded-lg bg-white resize-none"
                                />
                            </motion.div>

                            <AnimatePresence>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1, x: [0, -6, 6, -4, 4, 0] }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="wf-error text-sm"
                                    >
                                        {error}
                                    </motion.p>
                                )}
                            </AnimatePresence>

                            <div className="flex gap-3 pt-2 pb-2">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="wf-btn wf-btn--ghost flex-1"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={uploading}
                                    className="wf-btn wf-btn--primary flex-1"
                                >
                                    {uploading ? (
                                        <span className="wf-btn-loading">
                                            <span className="wf-spinner" />
                                            Saving...
                                        </span>
                                    ) : isEdit ? 'Save Changes' : 'Add Work'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default WorkFormModal