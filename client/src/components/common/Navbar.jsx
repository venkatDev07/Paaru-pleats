import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

function Navbar() {
    const [isOpen, setIsOpen] = useState(false)

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Works', path: '/works' },
        { name: 'Contact', path: '/contact' },
    ]

    return (
        <nav className="bg-primary/95 backdrop-blur-sm fixed top-0 left-0 w-full z-50 shadow-lg border-b border-accent/10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-18 py-4">
                    <Link to="/" className="font-heading text-2xl font-semibold text-cream group">
                        Saree
                        <span className="text-gradient-gold group-hover:brightness-110">Pleating</span>
                    </Link>

                    <div className="hidden md:flex space-x-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="relative text-cream/80 hover:text-accent font-medium transition-colors tracking-wide group py-1"
                            >
                                {link.name}
                                <span className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 bg-gradient-to-r from-accent to-[var(--color-rose)] transition-transform duration-300 group-hover:scale-x-100" />
                            </Link>
                        ))}
                    </div>

                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5"
                        aria-label="Toggle menu"
                    >
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 7, backgroundColor: '#e3a63e' } : { rotate: 0, y: 0, backgroundColor: '#fdf6ec' }}
                            className="block w-6 h-0.5"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="block w-6 h-0.5 bg-cream"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -7, backgroundColor: '#e3a63e' } : { rotate: 0, y: 0, backgroundColor: '#fdf6ec' }}
                            className="block w-6 h-0.5"
                        />
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="md:hidden bg-primary-dark overflow-hidden"
                    >
                        <div className="flex flex-col px-6 py-5 space-y-4">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.name}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.06 }}
                                >
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        className="text-cream/90 hover:text-accent font-medium"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar