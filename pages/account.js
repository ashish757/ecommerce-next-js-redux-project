import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { logout } from '../store/actions/authActions';
import sessionOptions from '../utils/sessionOptions';

export default function Account() {
    const dispatch = useDispatch()
    const router = useRouter()
    const logoutHandler = async () => {

        const req = await fetch("http://localhost:3000/api/auth/logout", {
            method: 'DELETE'
        })
        const res = await req.json()
        if (res.status) {
            dispatch(logout())
            router.push('/', null, { replace: true })

        }
        console.log(res);
    }

    return <main>
        <h1>Account</h1>
        <button onClick={logoutHandler}>Logout</button>
    </main>

}

export const getServerSideProps = withIronSessionSsr(({ req, res }) => {

    if (!req.session.user) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }

    return {
        props: {
            userId: req.session.user.id
        }
    }

}, sessionOptions)

