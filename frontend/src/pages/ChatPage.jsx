import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import useAuthUser from '../hooks/useAuthUser';
import { useQuery } from '@tanstack/react-query';
import { getStreamToken } from '../lib/api.js';
import {StreamChat} from 'stream-chat'
import ChatLoader from '../components/ChatLoader.jsx';
import {
  Channel,
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react';
import toast from 'react-hot-toast';


const STREAM_API_KEY=import.meta.env.VITE_STREAM_API_KEY;

const ChatPage = () => {
  const {id:targetUserId}=useParams();
  
  const [chatClient,setChatClient] = useState(null);
  const [channel,setChannel] = useState(null);
  const [loading,setLoading] = useState(true)
  
  const {authUser}=useAuthUser();

  const {data:tokenData} = useQuery({
    queryKey:["streamToken"],
    queryFn: getStreamToken,
    enabled: !!authUser      //this run when authUser is available
  })

  useEffect(()=>{
    const initChat = async() =>{
      if(!tokenData?.token || !authUser) return;
      try{
        console.log("Intitializing stream chat client");
        const client =StreamChat.getInstance(STREAM_API_KEY);

        await client.connectUser({
          id:authUser._id,
          name:authUser.fullName,
          image:authUser.profilePicture,
        },tokenData.token);

        //create channelId unique
        const channelId=[authUser._id,targetUserId].sort().join("-");

        const currentChannel=client.channel("messaging",channelId,{
          members:[authUser._id,targetUserId],
        });

        await currentChannel.watch();

        setChatClient(client);
        setChannel(currentChannel);
      }catch(error){
        console.error("Error initializing chat:",error);
        toast.error("could not connect to chat.please try again");
      }finally{
        setLoading(false);
      }
    }
    initChat();
  },[tokenData,authUser,targetUserId])

  if(loading || !chatClient || !channel) return <ChatLoader/>;

  return (
    <div className='h-[93vh]'>
      <Chat client={chatClient}>
        <Channel channel={channel}>
          <div className='w-full relative'>
            <Window>
              <ChannelHeader/>
              <MessageList/>
              <MessageInput focus/>
            </Window>
          </div>
          <Thread />
        </Channel>
      </Chat>
    </div>
  )
}

export default ChatPage
