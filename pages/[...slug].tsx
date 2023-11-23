import type { PostType } from "../interfaces/postType";
import { getAllPosts, getPostBySlugForProps } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

const Post = ({ post, posts }: { post: PostType; posts: PostType[] }) => {
  return (
    <>
      <div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#000000",
            minWidth: "800px",
            color: "lightyellow",
          }}
        >
          <div style={{ fontSize: "32px" }}>{post.title}</div>
          <hr />
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
    </>
  );
};

export async function getStaticProps({ params }: any) {
  // console.log("getStaticProps : params", params);
  const post = getPostBySlugForProps(params.slug, [
    "title",
    "slug",
    "description",
    "date",
    "lastmod",
    "weight",
    "content",
    "fileName",
  ]);
  const content = (await markdownToHtml(post.content || "")) || "";

  const posts = getAllPosts(["slug", "title", "date"]);
  return {
    props: {
      post: {
        ...post,
        content,
      },
      posts,
    },
  };
}

export async function getStaticPaths(param: any) {
  // console.log("getStaticPaths", param);
  const posts = getAllPosts(["slug"]);
  // console.log("getStaticPaths.posts", posts);
  return {
    paths: posts.map((post) => {
      const arr = post.slug.split("/");
      // console.log('arr',arr)
      return {
        params: {
          slug: arr,
        },
      };
    }),
    fallback: false,
  };
}

export default Post;
