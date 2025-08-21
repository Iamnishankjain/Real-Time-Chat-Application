import React, { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signup } from "../lib/api.js";
//custom hook
import useSignup from "../hooks/useSignup.js";

const SignUpPage = () => {
  const [signUpData, setSignUpData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  
  // Function to handle sign up

  const {signupMutation,isPending,error} = useSignup();

  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic here
    signupMutation(signUpData);
  };

  return (
    <div
      className="h-screen flex items-center justify-center p-4 sm:p-6 md:p-8"
      data-theme="forest"
    >
      <div className="border border-indigo-500/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Left Side - SignUp*/}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* LOGO */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-indigo-500" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-indigo-300 tracking-wider">
              ChatBridge
            </span>
          </div>

          {/* Error Message if any in signup */}
          {error && (
            <div className="alert alert-error shadow-lg mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join ChatBridge to connect with friends and family, and
                    enjoy seamless communication.
                  </p>
                </div>
                <div className="space-y-3">
                  {/* Full Name Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Enter the name"
                      className="input input-bordered w-full border-indigo-500 focus:border-indigo-600"
                      value={signUpData.fullName}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          fullName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  {/* Email Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="example@gmail.com"
                      className="input input-bordered w-full border-indigo-500 focus:border-indigo-600"
                      value={signUpData.email}
                      onChange={(e) =>
                        setSignUpData({ ...signUpData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  {/* Password Input */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="*********"
                      className="input input-bordered w-full border-indigo-500 focus:border-indigo-600"
                      value={signUpData.password}
                      onChange={(e) =>
                        setSignUpData({
                          ...signUpData,
                          password: e.target.value,
                        })
                      }
                      required
                    />
                    <p className="text-xs opacity-70 mt-1">
                      Password must be at least 6 characters long.
                    </p>
                  </div>
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm border-indigo-500"
                        required
                      />
                      <span className="text-xs leading-tight">
                        I agree to the{" "}
                        <span className="text-indigo-500 hover:underline">
                          Terms of Service
                        </span>{" "}
                        and{" "}
                        <span className="text-indigo-500 hover:underline">
                          Privacy Policy
                        </span>
                        .
                      </span>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn bg-indigo-500 hover:bg-indigo-600 text-white w-full"
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs">
                        Loading...
                      </span>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-indigo-500 hover:underline"
                    >
                      Log In
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image or Illustration */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-indigo-500/10 items-center justify-center">
          <div className="max-w-md p-8">
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/Video-call-hero.png"
                alt="language connection"
                className="w-full h-full"
              />
            </div>
            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Join a global community of language learners and native
                speakers. Practice speaking, listening, and writing with real
                people.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
