import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // console.log("profile-data : req", req);
  // console.log("profile-data : res", res);
  const data = req.body;

  res.status(200).json({ result: { success: true } });
}
