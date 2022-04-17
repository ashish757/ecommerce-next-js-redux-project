export default async function useUser() {
    const req  = await fetch("http://localhost:3000/api/auth/user", {
    }) 

    const res = await req.json()

    return res
}