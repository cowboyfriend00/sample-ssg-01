import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import { formidable } from "formidable";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  formidable({}).parse(req, function (err: any, fields: any, files: any) {
    console.log("fields", fields);
    console.log("posts", JSON.parse(fields.posts));
    console.log("searchKeyword", fields.searchKeyword);
    const posts = JSON.parse(fields.posts);
    const aa = posts.filter((post: any) =>
      post.title.includes(fields.searchKeyword)
    );
    console.log("aa", aa);
    // const fileContents = fs.readFileSync("__posts/markdown.md", "utf8");

    res.status(200).json({
      result: {
        success: true,
        posts: aa,
      },
    });
  });
}
export const config = {
  api: {
    bodyParser: false,
  },
};
