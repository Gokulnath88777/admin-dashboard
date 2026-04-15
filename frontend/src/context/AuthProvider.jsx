import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext();
function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading,setLoading]=useState(true)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser && storedUser !== "undefined") {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, [])
    function login(userData) {
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
    }
    function logout() {
        localStorage.removeItem('user')
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout,loading }}>
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider