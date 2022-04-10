import User from "../../../models/user"
import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions"
import { withIronSessionApiRoute } from 'iron-session/next'


export default withIronSessionApiRoute(handler, sessionOptions)


async function handler(req, res) {
    await connectDb()
    if (req.method === "POST") {

        const {username, password} = req.body
        
        const user = await User.findOne({username});
        if (user) {

            if (user.password === password) {
                req.session.user = { id: user._id}

                await req.session.save()
                console.log(req.session);
                return res.json({status: true, user: {username: user.username, id: user._id}})
            } else {
                return res.json({status: false, message: "invalid password"})
            }

        } else {
            res.json({status: false, message: 'no user found'})

        }


        
    } else {
        res.json({status: false, message: "invalid request type"})
    }
}