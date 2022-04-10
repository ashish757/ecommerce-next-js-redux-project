import User from "../../../models/user"
import connectDb from "../../../utils/mongodb"


async function handler(req, res) {
    await connectDb()
    if (req.method === "GET") {

        if (req.session.user) {
            try {
                const user = await User.findOne({_id: req.session.user.id});
                return res.json({status: true, auth: true, user: user})

            } catch (error) {
                return res.status(500).json({status: false, message: "Internal Server Error"})
                

            }
        } else {
            return res.json({status: true, isAuth: false, user: null})
        }


        
    } else {
        res.json({status: false, message: "invalid request type"})
    }
}

export default handler