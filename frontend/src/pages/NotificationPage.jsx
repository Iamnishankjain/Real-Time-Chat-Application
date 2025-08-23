import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { getFriendRequest } from '../lib/api.js';

const NotificationPage = () => {   
  const queryClient = useQueryClient();        //fetching
  const {data: friendRequests,isLoading} = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
  })

  const {mutate: acceptRequestMutation,isPending} = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: ()=> {
      queryClient.invalidateQueries({queryKey: ["friendRequests"]});
      queryClient.invalidateQueries({queryKey: ["friends"]})
    }
  })

  return (
    <div>
      Notifiaction
    </div>
  )
}

export default NotificationPage
