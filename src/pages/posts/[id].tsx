import type { Post } from "@/types";
import { useRouter } from "next/router";
import React from "react";
import styles from "@/styles/editor.module.css";

type Props = {
  post: Post;
};

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts: Post[] = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3001/api/v1/posts/${params.id}`);
  const post = await res.json();

  console.log(post);

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
}

const Post = ({ post }: Props) => {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>{post.title}</div>
      <div>{post.date}</div>
      <div>{post.time}</div>
      <form>
        <div className={styles.editor}>
          hello
          <input placeholder="Title" value={post.title} />
          <textarea placeholder="" value={post.content} />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Post;
