import type { PostType } from "../interfaces/postType";
import { getAllPosts, getPostBySlug, getPostBySlugForProps } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";

const Post = ({ post }: { post: PostType }) => {
  return (
      <>
        <div>{post.title}</div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </>
  );
};

export async function getStaticProps({
                                       params,
                                     }: {
  params: {
    slug: string[];
  };
}) {
  // console.log("getStaticProps");
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
  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug", "path"]);
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
