import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions";
import { withIronSessionApiRoute } from 'iron-session/next'



export default withIronSessionApiRoute(handler, sessionOptions)

async function handler(req, res) {
    await connectDb()
    console.log("Logout APi");
    if (req.method === "DELETE") {


        if (req.session.user) {

            req.session.destroy()
            
            return res.json({status: true, isAuth: false, user: null})
        } else {
            return res.json({status: false, message: "You are not logged in"})
        }
    
    } else {
        res.json({status: false, message: "invalid request type"})
    }
}


