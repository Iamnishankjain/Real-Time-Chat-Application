import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getOutgoingFriendReqs, getRecommandedUsers, getUserFriends, sendFriendRequest } from '../lib/api.js';

const HomePage = () => {

  const queryClient = useQueryClient();

  const [outgoingRequest,setOutgoingRequest] = useState([
    new Set()
  ]);

  const {data:friends=[],isLoading:loadingFriends} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends
  })

  const {data:recommandedUsers=[],isLoading:loadingUsers} = useQuery({
    queryKey: ["users"],
    queryFn: getRecommandedUsers
  })

  const {data: outgoingFriendReqs} = useQuery({
    queryKey: ["users"],
    queryFn: getOutgoingFriendReqs
  })

  const {mutate: sendRequestMutation,isPending} = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["outgoingFriendReqs"]})
  })

  useEffect(()=>{
    const outgoingIds = new Ser();
    if(outgoingFriendReqs && outgoingFriendReqs.length>0){
      outgoingFriendReqs.forEach((req)=>{
        outgoingIds.add(req.id);
      })
      setOutgoingRequest(outgoingIds);
    }
  },[outgoingFriendReqs])

  return (
    <div>
      
      Home Page
    </div>
  )
}

export default HomePage
