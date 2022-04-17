export default function useAuth() {
    return async  () => {
        const req = await fetch("/api/auth/isAuthenticated")

        const res = await req.json()

        return res
    }

}