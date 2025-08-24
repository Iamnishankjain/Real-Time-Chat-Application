import { axiosInstance } from "./axios.js";

export const signup = async (signUpData) => {
  const response = await axiosInstance.post("/auth/signup", signUpData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.post("/auth/logout");
  return response.data;
};

export const getAuthUser = async () => {
  try{
    const response = await axiosInstance.get("/auth/me");
    return response.data;
  }
  catch(error){
    console.log("authUser",error)
    return null;
  }
}

export const completeOnboarding = async (userData) => {
  const response = await axiosInstance.post("/auth/onboarding", userData);
  return response.data;
}

export const getUserFriends = async () =>{
  const response = await axiosInstance.get("/users/friends");
  return response.data;
}

export const getRecommandedUsers = async () =>{
  const response = await axiosInstance.get("/users");
  return response.data;
}

export const getOutgoingFriendReqs = async () =>{
  const response = await axiosInstance.get("/users/outgoing-friend-requests");
  return response.data;
}

export const sendFriendRequest = async (userId) =>{
  const response = await axiosInstance.post(`/users/friends-request/${userId}`);
  return response.data;
}

export const getFriendRequest = async () =>{
  const response = await axiosInstance.get(`/users/friends-request`);
  return response.data;
}

export const acceptFriendRequest = async (requestId) =>{
  const response = await axiosInstance.put(`/users//friends-request/${requestId}/accept`);
  return response.data;
}


// chat

export async function getStreamToken(){
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}