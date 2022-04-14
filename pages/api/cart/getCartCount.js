import User from "../../../models/user"
import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions"
import { withIronSessionApiRoute } from 'iron-session/next'


export default withIronSessionApiRoute(handler, sessionOptions)


async function handler(req, res) {
    await connectDb()

    if (req.method === "GET") {
        if (req.session.user) {
                try {
                    const user = await User.findById(req.session.user.id, "cartCount");

                    res.json({status: true, cartCount: user.cartCount})
                    
                } catch (error) {   
                    console.log("ERROR", error);
                }

        } else {
            // console.log("GET",req.session.cartCount);
            res.json({status: true, cartCount: req.session.cartCount ? req.session.cartCount : 0 , message: 'you are not authenticated'})

        }
        
    
    } else {
        res.json({status: false, message: "invalid request type"})
    }
}