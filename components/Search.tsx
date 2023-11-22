import React, { useState, useEffect, FormEvent } from "react";
import { Router, useRouter } from "next/router";
import { PostType } from "../interfaces/postType";

function SearchComp({ initialPosts }: any) {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    formData.set("posts", JSON.stringify(posts));
    const response = await fetch("/api/submit", {
      method: "POST",
      body: formData,
    });

    // Handle response if necessary
    const data = await response.json();
    setPosts(data.result.posts);
    console.log("data", data);
    // ...
  }
  const [params, setParams] = useState<any>();

  const router = useRouter();

  const handleClick = (e: any, slug: string) => {
    const params = {
      searchKeyword: "markdown",
      treeParam: { selected: true, treeId: "a" },
      url: slug,
    };
    setParams(params);
    router.push(params.url).then((res) => {
      console.log("res", res);
    });
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="searchKeyword" />
        <button type="submit">Submit</button>
      </form>
      <hr />
      {posts && posts.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBottom: "20px",
          }}
        >
          Menu
        </div>
      )}
      {posts.map((post: PostType) => (
        <div
          key={`${post.slug}`}
          onClick={(e) => handleClick(e, `${post.slug}`)}
        >
          {post.slug === params?.url ? `==${post.slug}` : post.slug}
        </div>
        // <div key={post.slug}>
        //   <Link
        //     href={{
        //       pathname: post.slug,
        //       query: { info: "zxcvzxcv" },
        //     }}
        //   >
        //     {post.slug === params?.url ? `==${post.slug}` : post.slug}
        //   </Link>
        // </div>
      ))}
    </div>
  );
}

export default SearchComp;
