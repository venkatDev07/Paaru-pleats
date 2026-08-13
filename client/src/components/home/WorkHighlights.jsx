import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './WorkHighlights.css'
const sampleWorks = [
    { id: 1, title: 'Silk Saree Pleating', date: 'Aug 5, 2026', tag: 'Silk', color: '#e0587a' },
    { id: 2, title: 'Cotton Saree Pleating', date: 'Aug 4, 2026', tag: 'Cotton', color: '#0f6b62' },
    { id: 3, title: 'Georgette Saree Pleating', date: 'Aug 3, 2026', tag: 'Georgette', color: '#e3a63e' },
]

function WorkHighlights() {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            <div className="texture-dots absolute inset-0 opacity-[0.03] pointer-events-none" />
            <div className="relative  mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-medium tracking-wide text-sm uppercase">Portfolio</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-primary mt-3">
                        Recent Work
                    </h2>
                </motion.div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-x-6 md:gap-y-10">
                    {sampleWorks.map((work, index) => (
                        <motion.div
                            key={work.id}
                            initial={{ opacity: 0, y: 30, rotate: index % 2 === 0 ? -3 : 3 }}
                            whileInView={{ opacity: 1, y: index === 1 ? -14 : 0, rotate: index % 2 === 0 ? -2.5 : 2.5 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
                            whileHover={{ y: -10, rotate: 0, scale: 1.03 }}
                            className="group gold-frame bg-cream rounded-2xl overflow-hidden shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition-shadow"
                            style={{ transformOrigin: 'bottom center' }}
                        >
                            <div
                                className="relative aspect-square flex items-center justify-center text-sm overflow-hidden"
                                style={{ backgroundColor: `${work.color}15`, color: `${work.color}` }}
                            >
                                <div
                                    className="absolute inset-0 opacity-40 group-hover:opacity-70 transition-opacity"
                                    style={{
                                        background: `linear-gradient(120deg, transparent 30%, ${work.color}55 50%, transparent 70%)`,
                                        backgroundSize: '200% 100%',
                                        animation: 'shimmer 3.5s linear infinite',
                                    }}
                                />
                                <span className="relative font-medium">Image placeholder</span>
                                <span
                                    className="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full text-white"
                                    style={{ backgroundColor: work.color }}
                                >
                                    {work.tag}
                                </span>
                            </div>
                            <div className="p-6">
                                <h3 className="font-heading font-semibold text-primary group-hover:text-primary-light transition-colors">
                                    {work.title}
                                </h3>
                                <p className="text-sm text-charcoal/50 mt-1">{work.date}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        to="/works"
                        className="inline-flex items-center gap-1.5 text-accent font-medium hover:text-[var(--color-rose)] transition-colors group"
                    >
                        View All Work
                        <motion.span
                            className="inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 4 }}
                        >
                            →
                        </motion.span>
                    </Link>
                </div>
            </div>

            <div className="pleat-edge pleat-edge-top" style={{ '--edge-color': 'var(--color-cream)' }} />
            <div className="pleat-edge pleat-edge-bottom" style={{ '--edge-color': 'var(--color-primary-dark)' }} />
        </section>
    )
}

export default WorkHighlights