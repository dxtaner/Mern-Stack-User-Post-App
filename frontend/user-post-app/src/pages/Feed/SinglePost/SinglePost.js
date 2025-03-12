import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../../../components/Image/Image";
import "./SinglePostPage.css";

const SinglePostPage = ({ token }) => {
  const { postId } = useParams();
  const [post, setPost] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `http://localhost:3033/post/post/${postId}`,
          {
            headers: { Authorization: "Bearer " + token },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }

        const postData = await response.json();

        setPost({
          title: postData.post.title,
          author: postData.post.creator.name,
          image: `${postData.post.imageUrl}`,
          date: new Date(postData.post.createdAt).toLocaleDateString("tr-US"),
          content: postData.post.content,
        });

        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchPost();
  }, [post.image, postId, token]);

  return (
    <section className="single_post">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1>{post.title}</h1>
          <h5>
            Created by {post.author} on {post.date}
          </h5>
          <div className="single_post_image">
            <Image contain imageUrl={post.image} alt={post.title} />
          </div>
          <p>{post.content}</p>
        </>
      )}
    </section>
  );
};

export default SinglePostPage;
