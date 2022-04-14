import User from "../../../models/user"
import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions"
import { withIronSessionApiRoute } from 'iron-session/next'
import mongoose from "mongoose"


export default withIronSessionApiRoute(handler, sessionOptions)


async function handler(req, res) {
    await connectDb()

    if (req.method === "POST") {
        const itemId = req.body.itemId
        const quantity = req.body.quantity

        if (req.session.user) {
            try {
                const user = await User.findById(req.session.user.id).populate({ path: "cart", populate: { path: "product" } })

                // check if the product already exists in the user's cart
                let found = false;
                console.log(user);
                const newCartItems = user.cart.map(cartItem => {
                    if (cartItem.product._id.toString() === itemId) {
                        found = true
                        user.cartCount = user.cartCount + quantity - cartItem.quantity

                        return { ...cartItem, quantity }
                    }
                    return cartItem
                })

                console.log(found);

                if (found) {
                    user.cart = newCartItems

                } else {
                    user.cart.push({ product: itemId, quantity: quantity })
                    user.cartCount = user.cartCount + quantity

                }

                await user.save()
                console.log("ADDED TO CART");
                res.json({ status: true, products: user.cart })

            } catch (error) {
                console.log("ERROR", error);

            }

        } else {
            try {
                req.session.tempUser = true

                if (!req.session.cartCount || req.session.cartCount === 0) {
                    req.session.cartCount = quantity
                    console.log("1", req.session.cartCount);
                }

                if (!req.session.cart || req.session.cart.length === 0) {
                    req.session.cart = [{ product: itemId, quantity: quantity }]
                    console.log("2", req.session.cart);
                }
                else {
                    let foundDuplicate = false
                    const newItems = req.session.cart.map(item => {
                        if (item.product === itemId) {
                            foundDuplicate = true
                            req.session.cartCount += quantity - item.quantity
                            return { ...item, quantity }
                        }
                        return item
                    })

                    if (foundDuplicate) {
                        req.session.cart = newItems
                    } else {
                        req.session.cartCount += quantity
                        req.session.cart = [...req.session.cart, { product: itemId, quantity }]
                    }

                }



                await req.session.save()

                console.log("ADDED TO CART UNAUTHENTICATED", req.session.cartCount);
                res.json({ status: true, products: req.session.cart })

            } catch (error) {
                console.log("ERROR", error);

            }

        }



    } else {
        res.json({ status: false, message: "invalid request type" })
    }
}