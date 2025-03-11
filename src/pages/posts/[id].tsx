import type { Post } from "@/types";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import styles from "@/styles/editor.module.css";
import axios from "axios";

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
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [date, setDate] = useState(post.date);
  const [time, setTime] = useState(post.time);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // console.log(e);
    try {
      await axios.put(`http://localhost:3001/api/v1/posts/${post.id}`, {
        title,
        content,
        date,
        time,
      });
      // router.push("/");
    } catch (err) {
      alert("Failed to edit post");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/v1/posts/${post.id}`);
      router.push("/");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>{post.date}</div>
      <div>{post.time}</div>
      <form onSubmit={handleSubmit}>
        <div className={styles.editor}>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Edit</button>
      </form>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
};

export default Post;
