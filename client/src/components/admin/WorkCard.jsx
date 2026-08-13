import { motion } from 'framer-motion'

function WorkCard({ work, onEdit, onDelete }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-primary/5"
    >
      <div className="aspect-square relative overflow-hidden">
        <img src={work.imageUrl} alt={work.title} className="w-full h-full object-cover" />
        <span className="absolute top-3 left-3 bg-primary/90 text-cream text-xs font-medium px-3 py-1 rounded-full">
          {work.category}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs text-accent font-medium">{work.workId}</p>
        <h3 className="font-heading font-semibold text-primary mt-0.5 truncate">{work.title}</h3>
        <p className="text-xs text-charcoal/50 mt-1">
          {new Date(work.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </p>
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => onEdit(work)}
            className="flex-1 text-xs font-medium py-2 rounded-lg border border-primary/20 text-primary hover:bg-primary hover:text-cream transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(work)}
            className="flex-1 text-xs font-medium py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default WorkCard