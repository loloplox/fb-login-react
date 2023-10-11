import { create } from "zustand"
import { persist } from "zustand/middleware"

const useStore = create(
    persist(
        (set) => ({
            userData: {},
            login: (userData) => set({ userData }),
            logout: () => set({ userData: {} }),
        }),
        {
            name: "user-storage",
        },
    ),
)

export default useStore
