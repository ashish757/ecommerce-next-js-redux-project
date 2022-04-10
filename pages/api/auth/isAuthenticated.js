import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions";
import { withIronSessionApiRoute } from 'iron-session/next'



export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
    await connectDb()
    console.log("isAuthenticated APi");
    if (req.method === "GET") {

        if (req.session.user) {
            return res.json({status: true, isAuth: true, user: req.session.user.id})
        } else {
            return res.json({status: false, isAuth: false, userID: null})
        }
    
    } else {
        res.json({status: false, message: "invalid request type"})
    }
}


