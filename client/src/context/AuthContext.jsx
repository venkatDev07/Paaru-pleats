import { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () => {
        try {
            const res = await api.get('/auth/me')
            setAdmin(res.data.data.admin)
        } catch (error) {
            setAdmin(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password })
        localStorage.setItem("token", res.data.data.token);
        setAdmin(res.data.data.admin)
    }

    const logout = async () => {
        await api.post('/auth/logout')
        localStorage.removeItem("token");
        setAdmin(null)
    }

    return (
        <AuthContext.Provider value={{ admin, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}