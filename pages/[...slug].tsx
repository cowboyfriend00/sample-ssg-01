import type { PostType } from "../interfaces/postType";
import { getAllPosts, getPostBySlugForProps } from "../lib/api";
import markdownToHtml from "../lib/markdownToHtml";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = ({ post, posts }: { post: PostType; posts: PostType[] }) => {
  const [params, setParams] = useState<any>(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("params") as string)
      : undefined
  );
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("params", JSON.stringify(params));
  }, [params]);
  const handleClick = (e: any, slug: string) => {
    const params = {
      searchKeyword: "markdown",
      treeParam: { selected: true, treeId: "a" },
      url: slug,
    };
    setParams(params);
    router.push(params.url, undefined);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            width: "300px",
            backgroundColor: "#ffffff",
            color: "black",
            padding: "20px",
          }}
        >
          <div>왼쪽트리지롱</div>
          {posts.map((post, index) => (
            <div
              key={`${post.slug}`}
              onClick={(e) => handleClick(e, `${post.slug}`)}
            >
              ${post.slug}
            </div>
          ))}
        </div>
        <div
          style={{
            padding: "20px",
            backgroundColor: "#000000",
            minWidth: "800px",
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
  console.log("params", params);
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
  console.log("getStaticPaths", param);
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
