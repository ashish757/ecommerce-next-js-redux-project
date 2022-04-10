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
                    const user = await User.findById(req.session.user.id).populate("cart");
                    console.log("FETCHED CART");
                    res.json({status: true, products: user.cart})
                    
                } catch (error) {   
                    console.log("ERROR", error);

                }

        } else {
            res.json({status: false, message: 'you are not authenticated'})

        }
        
        

    } else {
        res.json({status: false, message: "invalid request type"})
    }
}