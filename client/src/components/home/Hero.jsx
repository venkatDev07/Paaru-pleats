import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Hero.css'

// The signature motif: a stack of angled panels, echoing pleats fanned
// out then pressed flat. Layers sit rotated at rest and straighten on
// hover — the same gesture as pleating/unpleating a pallu.
function PleatStack() {
    const layers = [
        { rotate: -8, x: -18, y: 14, bg: 'var(--color-teal)', z: 10 },
        { rotate: 6, x: 22, y: 6, bg: 'var(--color-rose)', z: 20 },
        { rotate: -2, x: 0, y: 0, bg: 'var(--color-accent)', z: 30 },
    ]

    return (
        <div className="card-stack relative w-full max-w-sm aspect-[4/5]">
            <div className="absolute inset-0 bg-gradient-to-t from-accent/25 via-[var(--color-rose)]/10 to-transparent rounded-full blur-3xl" />

            {layers.map((layer, i) => (
                <motion.div
                    key={i}
                    className="stack-layer gold-frame absolute inset-6 rounded-[var(--radius-card)] overflow-hidden"
                    style={{
                        background: `linear-gradient(155deg, ${layer.bg}, var(--color-primary-dark))`,
                        zIndex: layer.z,
                        boxShadow: 'var(--shadow-soft)',
                        transform: `rotate(${layer.rotate}deg) translate(${layer.x}px, ${layer.y}px)`,
                    }}
                    initial={{ opacity: 0, y: 40, rotate: layer.rotate * 2 }}
                    animate={{ opacity: 1, y: layer.y, rotate: layer.rotate }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.12, ease: 'easeOut' }}
                >
                    <div className="texture-dots absolute inset-0 opacity-10" />
                </motion.div>
            ))}

            {/* floating stat chips, glass-morphic on the top layer */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: 'easeOut' }}
                className="absolute -top-4 -right-2 z-40 bg-cream/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-[var(--shadow-gold)] gold-frame"
            >
                <p className="font-heading text-2xl font-semibold text-primary leading-none">3 hrs</p>
                <p className="text-[11px] text-charcoal/60 mt-1 tracking-wide uppercase">Turnaround</p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.05, ease: 'easeOut' }}
                className="absolute -bottom-5 -left-4 z-40 bg-primary-dark/90 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-[var(--shadow-lift)] gold-frame"
            >
                <p className="font-heading text-2xl font-semibold text-accent leading-none">500+</p>
                <p className="text-[11px] text-cream/60 mt-1 tracking-wide uppercase">Sarees Pleated</p>
            </motion.div>
        </div>
    )
}

const fabrics = ['Silk', 'Kanjivaram', 'Cotton', 'Georgette', 'Chiffon', 'Banarasi']

function Hero() {
    return (
        <section className="relative bg-primary min-h-[92vh] flex flex-col overflow-hidden">
            {/* Colourful decorative glows, drawn from the saree palette */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl blob" />
            <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-[var(--color-teal)]/25 rounded-full blur-3xl blob" style={{ animationDelay: '3s' }} />
            <div className="absolute top-1/3 left-1/2 w-72 h-72 bg-[var(--color-rose)]/15 rounded-full blur-3xl blob" style={{ animationDelay: '6s' }} />
            <div className="texture-dots absolute inset-0 opacity-[0.04] pointer-events-none" />

            <div className="relative flex-1 flex items-center  mx-auto px-6 w-full grid md:grid-cols-2 gap-12">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-center md:text-left"
                >
                    <span className="eyebrow-underline inline-block text-sm font-medium text-accent border border-accent/40 px-4 py-1.5 rounded-full mb-6 tracking-wide">
                        Saree Pre-Pleating Service
                    </span>
                    <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-semibold text-cream leading-[1.1]">
                        Perfect Pleats,
                        <span className="block text-gradient-gold">Delivered Fast</span>
                    </h1>
                    <p className="mt-6 text-cream/70 text-lg max-w-md mx-auto md:mx-0 leading-relaxed">
                        Skip the hassle of pleating your saree every time. Get it professionally
                        pre-pleated and ready to wear — quick, precise, and affordable.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                to="/works"
                                className="inline-block bg-accent text-primary-dark px-8 py-3.5 rounded-full font-semibold shadow-lg shadow-accent/20 hover:bg-accent-light hover:shadow-accent/40 transition-all"
                            >
                                See Our Work
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                            <Link
                                to="/contact"
                                className="inline-block border border-cream/30 text-cream px-8 py-3.5 rounded-full font-medium hover:bg-cream/10 hover:border-[var(--color-rose)]/60 transition-colors"
                            >
                                Contact Us
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
                    className="hidden md:flex justify-center"
                >
                    <PleatStack />
                </motion.div>
            </div>

            {/* fabric trust strip */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="relative border-t border-cream/10 bg-primary-dark/40"
            >
                <div className=" mx-auto px-6 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                    {fabrics.map((fabric) => (
                        <span key={fabric} className="text-cream/50 text-sm font-accent italic tracking-wide">
                            {fabric}
                        </span>
                    ))}
                </div>
            </motion.div>

            <div className="pleat-edge pleat-edge-bottom" style={{ '--edge-color': 'var(--color-cream)' }} />
        </section>
    )
}

export default Hero