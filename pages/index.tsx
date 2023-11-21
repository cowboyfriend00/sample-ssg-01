import type { NextPage } from "next";
import Head from "next/head";
import PostCard from "../components/PostCard";
import { PostType } from "../interfaces/postType";
import { getAllPosts } from "../lib/api";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

const Home: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  const router = useRouter();
  const handleClick = (e: any, slug: string) => {
    router.push(slug);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Starter Kit</title>
        <meta name="description" content="Blog Starter Kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={{ width: "300px" }}>
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
        <div>
          {posts.map((post, index) => (
            <PostCard postInfo={post} key={`${post.slug}_${index}`} />
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  // 시작할때 반드시 실행됨
  console.log("getStaticProps");
  // data fetching
  const posts = getAllPosts(["slug", "title", "date"]);
  return {
    props: {
      posts,
    },
  };
}

export default Home;
