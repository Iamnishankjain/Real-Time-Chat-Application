import React, { useState } from 'react'
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRecommandedUsers, getUserFriends } from '../lib/api.js';

const HomePage = () => {

  const queryClient = useQueryClient();
  const [outgoingRequest,setOutgoingRequest] = useState([]);
  const {data:friends=[],isLoading:loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends
  })

  const {data:recommandedUsers=[],isLoading:loadingUsers} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommandedUsers
  })

  return (
    <div>
      
      Home Page
    </div>
  )
}

export default HomePage
