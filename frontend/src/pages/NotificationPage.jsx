import { useQuery, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { getFriendRequest } from '../lib/api.js';

const NotificationPage = () => {
  const queryClient = useQueryClient();
  const {data: friendRequests,isLoading} = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
  })

  return (
    <div>
      Notifiaction
    </div>
  )
}

export default NotificationPage
