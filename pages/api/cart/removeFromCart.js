import User from "../../../models/user"
import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions"
import { withIronSessionApiRoute } from 'iron-session/next'


export default withIronSessionApiRoute(handler, sessionOptions)


async function handler(req, res) {
    await connectDb()

    if (req.method === "POST") {
        const itemId = req.body.itemId

        if (req.session.user) {
                try {
                    const user = await User.findById(req.session.user.id)
                    let quantity = null
                    const newCartItems = user.cart.filter(cartItem => {
                        if (cartItem.product.toString() === itemId) {
                            quantity = cartItem.quantity
                        }
                        return cartItem.product.toString() !== itemId
                    })
                    
                    user.cart = newCartItems
                    user.cartCount -= quantity

                    
                    await user.save()
                    
                    console.log("REMOVED FROM CART");
                    res.json({status: true})
                    
                } catch (error) {   
                    console.log("ERROR", error);

                }

        } else {
            if(req.session.cart) {

                try {

                    let quantity = null
                    const newCartItems = req.session.cart.filter(cartItem => {
                        if (cartItem.product.toString() === itemId) {
                            quantity = cartItem.quantity
                        }
                        return cartItem.product.toString() !== itemId
                    })

                    req.session.cart = newCartItems

                    req.session.cartCount -= quantity
                    console.log("SUB", req.session.cartCount);
                    await req.session.save()
                    
                    console.log("REMOVED FORM CART UNAUTHENTICATED");
                    res.json({status: true, message: "you are unauthorized"})
                    
                } catch (error) {   
                    console.log("ERROR", error);
                    
                }
            } 

        }
        
        

    } else {
        res.json({status: false, message: "invalid request type"})
    }
}