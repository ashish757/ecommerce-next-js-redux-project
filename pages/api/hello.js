// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import connectDb from "../../utils/mongodb"

export default async function handler(req, res) {
	await connectDb()
	
	res.status(200).json({ name: 'John Doe' })
}
