import React from "react";
import Image from "../../Image/Image";
import Button from "../../Button/Button";
import "./Post.css";

const Post = (props) => {
  return (
    <article className="post">
      <header className="post_header">
        <h3 className="post_meta">
          Posted by {props.author} on {props.date}
        </h3>
        <h1 className="post_title">{props.title}</h1>
      </header>

      <div className="post_image">
        <Image imageUrl={props.image} alt={props.title} contain />
      </div>

      <div className="post_content">{props.content}</div>

      <div className="post_actions">
        <Button mode="flat" link={`post/${props.id}`}>
          View
        </Button>

        <Button mode="flat" onClick={props.onStartEdit}>
          Edit
        </Button>

        <Button mode="flat" design="danger" onClick={props.onDelete}>
          Delete
        </Button>
      </div>
    </article>
  );
};

export default Post;
