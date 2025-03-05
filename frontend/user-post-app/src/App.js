import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.min.css";

import Layout from "./components/Layout/Layout";
import Backdrop from "./components/Backdrop/Backdrop";
import Toolbar from "./components/Toolbar/Toolbar";
import MainNavigation from "./components/Navigation/MainNavigation/MainNavigation";
import MobileNavigation from "./components/Navigation/MobileNavigation/MobileNavigation";
import ErrorHandler from "./components/ErrorHandler/ErrorHandler";
import FeedPage from "./pages/Feed/Feed";
import SinglePostPage from "./pages/Feed/SinglePost/SinglePost";
import LoginPage from "./pages/Auth/Login";
import SignupPage from "./pages/Auth/Signup";
import AboutPage from "./pages/AboutPage/AboutPage.js";
import Footer from "./pages/Footer/Footer.js";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage.js";

import "./App.css";

const App = () => {
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const logoutHandler = () => {
    setIsAuth(false);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("userId");
    alertify.success("User logout successfully! Please log in.");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const expiryDate = localStorage.getItem("expiryDate");

    if (!token || !expiryDate) {
      return;
    }

    if (new Date(expiryDate) <= new Date()) {
      logoutHandler();
      return;
    }

    const userId = localStorage.getItem("userId");
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();

    setIsAuth(true);
    setToken(token);
    setUserId(userId);

    setAutoLogout(remainingMilliseconds);
  }, [logoutHandler, setAutoLogout, setIsAuth, setToken, setUserId]);

  const mobileNavHandler = (isOpen) => {
    setShowMobileNav(isOpen);
    setShowBackdrop(isOpen);
  };

  const backdropClickHandler = () => {
    setShowBackdrop(false);
    setShowMobileNav(false);
    setError(null);
  };

  const loginHandler = (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);

    fetch("http://localhost:3033/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error("Verification failed!");
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Authentication failed!");
        }
        return res.json();
      })
      .then((resData) => {
        setIsAuth(true);
        setToken(resData.token);
        setAuthLoading(false);
        setUserId(resData.userId);
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userId", resData.userId);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem("expiryDate", expiryDate.toISOString());
        setAutoLogout(remainingMilliseconds);
        alertify.success("User logged in successfully.");
        navigate("/about");
      })
      .catch((err) => {
        setIsAuth(false);
        setAuthLoading(false);
        setError(err);
      });
  };

  const signupHandler = (event, authData) => {
    event.preventDefault();
    setAuthLoading(true);

    fetch("http://localhost:3033/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: authData.signupForm.email.value,
        password: authData.signupForm.password.value,
        name: authData.signupForm.name.value,
      }),
    })
      .then((res) => {
        if (res.status === 422) {
          throw new Error(
            "Verification failed. Please use an unused email address!"
          );
        }
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed to create user!");
        }
        return res.json();
      })
      .then((resData) => {
        setIsAuth(false);
        setAuthLoading(false);
        alertify.success("User created successfully! Please log in.");
        navigate("/login");
      })
      .catch((err) => {
        setIsAuth(false);
        setAuthLoading(false);
        setError(err);
        alertify.error(`Error: ${err.message}`);
      });
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {showBackdrop && <Backdrop onClick={backdropClickHandler} />}
      <ErrorHandler error={error} onHandle={errorHandler} />
      <Layout
        header={
          <Toolbar>
            <MainNavigation
              onOpenMobileNav={() => mobileNavHandler(true)}
              onLogout={logoutHandler}
              isAuth={isAuth}
            />
          </Toolbar>
        }
        mobileNav={
          <MobileNavigation
            open={showMobileNav}
            mobile
            onChooseItem={() => mobileNavHandler(false)}
            onLogout={logoutHandler}
            isAuth={isAuth}
          />
        }>
        <Routes>
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<NotFoundPage />} />

          {isAuth ? (
            <>
              <Route
                path="/posts"
                element={<FeedPage userId={userId} token={token} />}
              />
              <Route
                path="/posts/post/:postId"
                element={<SinglePostPage userId={userId} token={token} />}
              />
            </>
          ) : null}

          {!isAuth && (
            <>
              <Route
                path="/login"
                element={
                  <LoginPage onLogin={loginHandler} loading={authLoading} />
                }
              />
              <Route
                path="/signup"
                element={
                  <SignupPage onSignup={signupHandler} loading={authLoading} />
                }
              />
            </>
          )}
        </Routes>
      </Layout>

      <Footer />
    </>
  );
};

export default App;
