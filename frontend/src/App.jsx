import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import PageLoader from "./components/PageLoader.jsx";
import Layout from "./components/Layout.jsx";


// Custom hook to fetch authenticated user data
import useAuthUser from "./hooks/useAuthUser.js";
import { useThemeStore } from "./store/useThemeStore.js";
import Friends from "./pages/Friends.jsx";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const {theme} = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;
  return (
    <div className="h-screen" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <HomePage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUpPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"
          } />}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : <Navigate to={
            isOnboarded ? "/" : "/onboarding"
          } />}
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={true}>
                <NotificationPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
        <Route
          path="/call"
          element={isAuthenticated ? <CallPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat/:id"
          element={isAuthenticated && isOnboarded ? (
            <Layout showSidebar={false}>
              <ChatPage/>
            </Layout>
          ) : (
            <Navigate to={!isAuthenticated ? "/login":"/onboarding"}/>
          )}
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <OnboardingPage/>
              ) : (
                <Navigate to="/" />
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/friends"
          element={
            isAuthenticated ? (
              !isOnboarded ? (
                <Navigate to="/onboarding" />
              ) : (
                <Layout showSidebar={true}>
                  <Friends/>
                </Layout>
              )
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;
