import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const particles = [
    { left: '8%', delay: 0, color: '#e3a63e' },
    { left: '22%', delay: 2, color: '#e0587a' },
    { left: '40%', delay: 4, color: '#0f6b62' },
    { left: '58%', delay: 1, color: '#e3a63e' },
    { left: '74%', delay: 3, color: '#e0587a' },
    { left: '90%', delay: 5, color: '#0f6b62' },
]

function ContactCTA() {
    return (
        <section className="relative py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-dark overflow-hidden">
            <div className="texture-dots absolute inset-0 opacity-[0.05] pointer-events-none" />
            {/* drifting gold/rose/teal flecks, like zari thread catching light */}
            {particles.map((p, i) => (
                <span
                    key={i}
                    className="absolute bottom-0 w-1.5 h-1.5 rounded-full"
                    style={{
                        left: p.left,
                        backgroundColor: p.color,
                        animation: `drift-up ${8 + i}s ease-in ${p.delay}s infinite`,
                    }}
                />
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative max-w-3xl mx-auto px-6 text-center"
            >
                <div className="flex justify-center gap-1.5 mb-6">
                    <span className="w-8 h-1.5 rounded-full bg-accent" />
                    <span className="w-3 h-1.5 rounded-full bg-[var(--color-rose)]" />
                    <span className="w-3 h-1.5 rounded-full bg-[var(--color-teal)]" />
                </div>
                <h2 className="font-heading text-4xl sm:text-5xl font-semibold text-cream">
                    Ready to get your saree pleated?
                </h2>
                <p className="text-cream/60 mt-5 text-lg">
                    Reach out today and let's get it done — fast, precise, and affordable.
                </p>
                <motion.div
                    className="inline-block mt-9"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.96 }}
                >
                    <Link
                        to="/contact"
                        className="inline-block bg-accent text-primary-dark px-9 py-3.5 rounded-full font-semibold shadow-lg shadow-accent/25 hover:bg-accent-light hover:shadow-[var(--color-rose)]/30 transition-all"
                    >
                        Get in Touch
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-wrap justify-center gap-3 mt-10"
                >
                    {['Same-day slots', '4.9★ rated', 'Doorstep pickup'].map((label) => (
                        <span
                            key={label}
                            className="gold-frame text-cream/70 text-xs font-medium tracking-wide px-4 py-1.5 rounded-full bg-cream/5"
                        >
                            {label}
                        </span>
                    ))}
                </motion.div>
            </motion.div>
        </section>
    )
}

export default ContactCTA