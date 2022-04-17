export default function useAuth() {
    return async  () => {
        const req = await fetch("http://localhost:3000/api/auth/isAuthenticated")

        const res = await req.json()

        return res
    }

}