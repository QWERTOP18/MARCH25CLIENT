import Image from "next/image";
import { Inter } from "next/font/google";
import { Post } from "@/types";
import Link from "next/link";
import CreatePost from "./posts/CreatePost";

type Props = {
  posts: Post[];
};

export async function getStaticProps() {
  const res = await fetch("http://localhost:3001/api/v1/posts");
  const posts = await res.json();

  console.log(posts);

  return {
    props: {
      posts,
    },
    revalidate: 60 * 60 * 24,
  };
}

export default function Home({ posts }: Props) {
  return (
    <main>
      <CreatePost />
      <div>
        {posts.map((post: Post) => (
          <div key={post.id}>
            <Link href={`/posts/${post.id}`}>
              <h2>{post.title}</h2>
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
