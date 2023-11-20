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
        {posts.map((post, index) => (
          <PostCard postInfo={post} key={`${post.slug}_${index}`} />
        ))}
      </main>
    </div>
  );
};

export async function getStaticProps() {
  // 시작할때 반드시 실행됨
  console.log("getStaticProps");
  // data fetching
  const posts = getAllPosts(["slug", "title", "date"]);
  // const posts = [
  //   { title: '테스트', author: 'ctdlog' },
  //   { title: '저는 바보입니다', author: '바보' },
  //   { title: '코딩 잘하는법', author: '저도 몰라요' },
  // ];

  return {
    props: {
      posts,
    },
  };
}

export default Home;
