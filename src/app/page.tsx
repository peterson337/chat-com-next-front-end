"use client";
import Image from 'next/image'
import React, { useEffect, useState, useRef } from 'react';
import { api } from "./api/api";
import { io } from 'socket.io-client';
import { Join } from "./join/Join";
import { Chat } from "./chat/Chat";

      type T =  {
        data: {
          id: number
          message: string,
        }

      }

export default function Home() {

        const [isChat, setIsChat] = useState(false);
        const [socket, setSocket] = useState(null);

        

        return (
    <main className='flex justify-center '>

      <section
      className='flex flex-col justify-center items-center'>


      { isChat?
        <Chat socket={socket}></Chat>
        :
        <Join setIsChat={setIsChat} setSocket={setSocket}></Join>
      }
      </section>
   
    </main>
  )
}
