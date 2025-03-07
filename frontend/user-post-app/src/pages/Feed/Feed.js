import React, { Component, Fragment } from "react";
import openSocket from "socket.io-client";

import Post from "../../components/Feed/Post/Post";
import Button from "../../components/Button/Button";
import FeedEdit from "../../components/Feed/FeedEdit/FeedEdit";
import Input from "../../components/Form/Input/Input";
import Paginator from "../../components/Paginator/Paginator";
import Loader from "../../components/Loader/Loader";
import ErrorHandler from "../../components/ErrorHandler/ErrorHandler";
import "./Feed.css";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";

class Feed extends Component {
  state = {
    isEditing: false,
    posts: [],
    totalPosts: 0,
    editPost: null,
    status: "",
    postPage: 1,
    postsLoading: true,
    editLoading: false,
    error: null,
  };

  componentDidMount() {
    fetch("http://localhost:3033/auth/status", {
      headers: { Authorization: "Bearer: " + this.props.token },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch user status.");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({ status: resData.status });

        return resData;
      })
      .then((userData) => {
        this.loadPosts(userData.user.userId);
      })
      .catch(this.catchError);

    this.loadPosts();
    const socket = openSocket("http://localhost:3033");
    socket.on("posts", (data) => {
      if (data.action === "create") {
        this.addPost(data.post);
      } else if (data.action === "update") {
        this.updatePost(data.post);
      } else if (data.action === "delete") {
        this.loadPosts();
      }
    });
  }

  addPost = (post) => {
    this.setState((prevState) => {
      const updatedPosts = [...prevState.posts];
      if (prevState.postPage === 1) {
        updatedPosts.pop();
        updatedPosts.unshift(post);
      }
      alertify.success(post.creator.name + "'s post created successfully!");
      return {
        posts: updatedPosts,
        totalPosts: prevState.totalPosts + 1,
        error: null,
      };
    });
  };

  updatePost = (post) => {
    this.setState((prevState) => {
      const updatedPosts = [...prevState.posts];
      const updatedPostIndex = updatedPosts.findIndex(
        (p) => p._id.toString() === post._id.toString()
      );
      if (updatedPostIndex > -1) {
        updatedPosts[updatedPostIndex] = post;
      }
      alertify.success(post.creator.name + "'s post updated successfully!");
      return { posts: updatedPosts };
    });
  };

  loadPosts = (direction) => {
    if (direction) {
      this.setState({ postsLoading: true, posts: [], error: null });
    }
    let page = this.state.postPage;
    if (direction === "next") {
      page++;
      this.setState({ postPage: page });
    }
    if (direction === "previous") {
      page--;
      this.setState({ postPage: page });
    }
    fetch("http://localhost:3033/post/posts?page=" + page, {
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch posts.");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          posts: resData.posts.map((post) => {
            return { ...post, imagePath: post.imageUrl };
          }),
          totalPosts: resData.totalItems,
          postsLoading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          postsLoading: false,
          error: "Error loading posts. Please try again.",
        });
      });
  };

  statusUpdateHandler = (event) => {
    event.preventDefault();
    fetch("http://localhost:3033/auth/status", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer: " + this.props.token,
      },
      body: JSON.stringify({ status: this.state.status }),
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Can't update status!");
        }
        alertify.success("User status updated successfully!");
        return res.json();
      })
      .then((resData) => {})
      .catch(this.catchError);
  };

  newPostHandler = () => {
    this.setState({ isEditing: true });
  };

  startEditPostHandler = (postId) => {
    this.setState((prevState) => {
      const loadedPost = { ...prevState.posts.find((p) => p._id === postId) };

      return {
        isEditing: true,
        editPost: loadedPost,
      };
    });
  };

  cancelEditHandler = () => {
    this.setState({ isEditing: false, editPost: null });
  };

  finishEditHandler = (postData) => {
    this.setState({
      editLoading: true,
    });

    const formData = new FormData();
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("image", postData.image);

    let url = "http://localhost:3033/post/post";
    let method = "POST";

    if (this.state.editPost) {
      url = "http://localhost:3033/post/post/" + this.state.editPost._id;
      method = "PUT";
    }
    fetch(url, {
      method: method,
      headers: {
        Authorization: "Bearer " + this.props.token,
      },
      body: formData,
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Creating or editing a post failed!");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState((prevState) => {
          return {
            isEditing: false,
            editPost: null,
            editLoading: false,
          };
        });
      })
      .catch((err) => {
        this.setState({
          isEditing: false,
          editPost: null,
          editLoading: false,
          error: err,
        });
      });
  };

  statusInputChangeHandler = (input, value) => {
    this.setState({ status: value });
  };

  deletePostHandler = (postId) => {
    alertify.confirm(
      "Delete Post",
      "Are you sure you want to delete this post?",
      () => {
        this.setState({ postsLoading: true, error: null });
        fetch("http://localhost:3033/post/post/" + postId, {
          method: "DELETE",
          headers: { Authorization: "Bearer " + this.props.token },
        })
          .then((res) => {
            if (res.status !== 200 && res.status !== 201) {
              throw new Error("Deleting a post failed!");
            }
            alertify.success("Post deleted successfully!");
            return res.json();
          })
          .then((resData) => {
            this.loadPosts();
          })
          .catch((error) => {
            this.setState({
              postsLoading: false,
              error: "Error deleting the post. Please try again.",
            });
          });
      },
      () => {
        alertify.error("Post deletion canceled.");
      }
    );
  };

  errorHandler = () => {
    this.setState({ error: null });
  };

  catchError = (error) => {
    this.setState({ error: error });
  };

  render() {
    return (
      <Fragment>
        <ErrorHandler
          error={this.state.error}
          onHandle={() => this.setState({ error: null })}
        />
        <FeedEdit
          editing={this.state.isEditing}
          selectedPost={this.state.editPost}
          loading={this.state.editLoading}
          onCancelEdit={this.cancelEditHandler}
          onFinishEdit={this.finishEditHandler}
        />
        <section className="feed_status">
          <form onSubmit={this.statusUpdateHandler}>
            <Input
              type="text"
              placeholder="Your status"
              control="input"
              onChange={this.statusInputChangeHandler}
              value={this.state.status}
            />
            <Button mode="flat" type="submit">
              Update
            </Button>
          </form>
        </section>
        <section className="feed_control">
          <Button mode="raised" design="accent" onClick={this.newPostHandler}>
            New Post
          </Button>
        </section>
        <section className="feed">
          {this.state.postsLoading && (
            <div style={{ textAlign: "center", marginTop: "2rem" }}>
              <Loader />
            </div>
          )}
          {this.state.posts.length <= 0 && !this.state.postsLoading ? (
            <p style={{ textAlign: "center" }}>No posts found.</p>
          ) : null}
          {!this.state.postsLoading && (
            <Paginator
              onPrevious={this.loadPosts.bind(this, "previous")}
              onNext={this.loadPosts.bind(this, "next")}
              lastPage={Math.ceil(this.state.totalPosts / 4)}
              currentPage={this.state.postPage}>
              {this.state.posts.map((post) => (
                <Post
                  key={post._id}
                  id={post._id}
                  author={post.creator.name || "Unknown Author"}
                  date={new Date(post.createdAt).toLocaleDateString("tr-US")}
                  title={post.title}
                  image={post.imageUrl}
                  content={post.content}
                  onStartEdit={() => this.startEditPostHandler(post._id)}
                  onDelete={() => this.deletePostHandler(post._id)}
                />
              ))}
            </Paginator>
          )}
        </section>
      </Fragment>
    );
  }
}

export default Feed;
