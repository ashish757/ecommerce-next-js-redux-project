import User from "../../../models/user"
import Product from "../../../models/product"
import connectDb from "../../../utils/mongodb"
import sessionOptions from "../../../utils/sessionOptions"
import { withIronSessionApiRoute } from 'iron-session/next'
import mongoose from "mongoose"


export default withIronSessionApiRoute(handler, sessionOptions)


async function handler(req, res) {
    await connectDb()

    if (req.method === "GET") {

        if (req.session.user) {
            try {
                const user = await User.findById(req.session.user.id).populate({ path: "cart", populate: { path: "product" } });
                console.log(user);

                console.log("FETCHED CART");
                res.json({ status: true, products: user.cart })

            } catch (error) {
                console.log("ERROR", error);

            }

        } else {
            if (req.session.cart) {
                let products = []

                // req.session.cart.forEach(async (item) => {
                //     console.log(item);
                //     const product = await Product.findById(item.product)

                //     products.push({quantity: item.quantity, product})

                //     console.log(" I ", products);

                // });

                const main = async () => {

                    for (let i = 0; i < req.session.cart.length; i++) {

                        const item = req.session.cart[i];
                        const product = await Product.findById(item.product)
                        products.push({ quantity: item.quantity, product })
                        // console.log(" I ", products);
                    }
                    
                }

                    await main()

                    // console.log(" O ", products);

                    return res.json({ status: true, products: products })

                }
                res.json({ status: true, products: [], message: 'you are not authenticated' })

            }



        } else {
            res.json({ status: false, message: "invalid request type" })
        }
    }