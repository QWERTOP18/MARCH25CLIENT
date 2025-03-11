import axios from "axios";
import { time } from "console";
import React, { FormEvent } from "react";

const CreatePost = () => {
  const [title, setTitle] = React.useState("");
  const [date, setDate] = React.useState("");

  const handleSubmit = async (e: FormEvent) => {
    //prevent reload
    e.preventDefault();
    console.log(title, date);

    try {
      await axios.post("http://localhost:3001/api/v1/posts", {
        title,
        date,
        time: "morning",
      });
    } catch (err) {
      alert("Failed to create post");
    }
  };

  return (
    <div>
      <h1>新規投稿</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input
          type="text"
          name="title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Date</label>
        <input
          type="date"
          name="date"
          onChange={(e) => setDate(e.target.value)}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreatePost;
