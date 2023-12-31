import type { NextPage } from "next";
import Head from "next/head";
import PostCard from "../components/PostCard";
import { PostType } from "../interfaces/postType";
import { getAllPosts } from "../lib/api";
import styles from "../styles/Home.module.css";

const Home: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Starter Kit</title>
        <meta name="description" content="Blog Starter Kit" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
  // console.log("getStaticProps index");
  // data fetching
  const posts = getAllPosts(["slug", "title", "seq", "folderSeq"]);
  return {
    props: {
      posts,
    },
  };
}

export default Home;
