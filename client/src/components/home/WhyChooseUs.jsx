import { motion } from 'framer-motion'

const features = [
    {
        title: 'Speed',
        description: 'Get your saree pleated and ready within hours, not days.',
        icon: '⚡',
        color: '#e3a63e',
    },
    {
        title: 'Precision',
        description: 'Every pleat measured and stitched to perfection, every time.',
        icon: '🎯',
        color: '#e0587a',
    },
    {
        title: 'Affordable',
        description: 'Quality pre-pleating service that doesn\u2019t break the bank.',
        icon: '💰',
        color: '#0f6b62',
    },
]

function WhyChooseUs() {
    return (
        <section className="relative py-24 bg-cream overflow-hidden">
            {/* faint colourful wash in the background */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--color-rose)]/10 rounded-full blur-3xl blob" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[var(--color-teal)]/10 rounded-full blur-3xl blob" style={{ animationDelay: '4s' }} />

            <div className="relative  mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="text-accent font-medium tracking-wide text-sm uppercase">Why Us</span>
                    <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-primary mt-3">
                        Why Choose Us
                    </h2>
                    <div className="mt-4 flex justify-center gap-1.5">
                        <span className="w-8 h-1.5 rounded-full bg-accent" />
                        <span className="w-3 h-1.5 rounded-full bg-[var(--color-rose)]" />
                        <span className="w-3 h-1.5 rounded-full bg-[var(--color-teal)]" />
                    </div>
                </motion.div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            className="card-stack relative"
                        >
                            {/* rotated backing layer, peeking out like a second pleat fold */}
                            <div
                                className="stack-layer absolute inset-0 rounded-2xl gold-frame"
                                style={{
                                    backgroundColor: `${feature.color}25`,
                                    transform: `rotate(${index % 2 === 0 ? -3 : 3}deg)`,
                                }}
                            />
                            <motion.div
                                whileHover={{ y: -8 }}
                                className="stack-layer relative bg-primary rounded-2xl p-10 text-center shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)]"
                                style={{ '--glow': feature.color }}
                            >
                                <div
                                    className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 transition-opacity pointer-events-none"
                                    style={{ boxShadow: `0 0 0 2px ${feature.color}55` }}
                                />
                                <motion.div
                                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-5"
                                    style={{ backgroundColor: `${feature.color}22`, border: `1px solid ${feature.color}55` }}
                                    whileHover={{ scale: 1.12, rotate: 8 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                >
                                    {feature.icon}
                                </motion.div>
                                <h3
                                    className="font-heading text-xl font-semibold mb-3"
                                    style={{ color: feature.color }}
                                >
                                    {feature.title}
                                </h3>
                                <p className="text-cream/70 leading-relaxed">{feature.description}</p>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="pleat-edge pleat-edge-bottom" style={{ '--edge-color': '#ffffff' }} />
        </section>
    )
}

export default WhyChooseUs