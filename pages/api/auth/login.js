import User from "../../../models/user"
import connectDb from "../../../utils/mongodb"

export default async function handler(req, res) {
    await connectDb()
    if (req.method === "POST") {

        const {username, password} = req.body
        
        const user = await User.findOne({username});
        if (user) {

            if (user.password === password) {
                // console.log(req.headers);
                res.setHeader('set-cookie',`auth=${user._id}`)
                return res.json({status: true})
            } else {
                return res.json({status: false, msg: "invalid password"})
            }

        } else {
            res.json({status: false, msg: 'no user found'})

        }


        
    } else {
        res.json({status: false, msg: "invalid request type"})
    }
}