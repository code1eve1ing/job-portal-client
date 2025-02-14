import { create } from "zustand";

const authStore = create((set) => ({
    isAuthenticated: false,
    user: {
        _id: "",
        name: "",
        email: "",
        role: ""
    },
    setIsAuthenticated: (isAuthenticated) => set((state) => ({ isAuthenticated: isAuthenticated })),
    setUserDetails: (userDetails) => set((state) => {
        return {
            user: {
                _id: userDetails._id || state.user._id,
                name: userDetails.name || state.user.name,
                email: userDetails.email || state.user.email,
                role: userDetails.role || state.user.role
            }
        }
    }),
    resetState: () => set((state) => ({
        isAuthenticated: false, user: {
            _id: "",
            name: "",
            email: "",
            role: ""
        }
    })),
}));

export default authStore;