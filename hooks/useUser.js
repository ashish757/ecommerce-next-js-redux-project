export default async function useUser() {
    const req  = await fetch("/api/auth/user", {
    }) 

    const res = await req.json()

    return res
}