import React,{useRef, useState} from 'react'
import { io } from 'socket.io-client';

type Props = {
    setIsChat: (isChat: boolean) => void
    setSocket: (socket: any) => void
}

export const Join = ({setIsChat, setSocket} : Props ) => {

    const inputValue = useRef<any>();
    const valueForm = async (e: React.FormEvent) => {
      e.preventDefault();


      if (inputValue.current) {
        const userName = inputValue.current.value;
        inputValue.current.value = '';
  
        try {
          const socket = await io('http://localhost:5000');

          //!         Outra forma de conecta o front com back end

//?         socket.on('novo usuário', (msg : string) => {
//Todo       api.get('/').then((res : T) => {
//Todo      }

//Todo      console.log(msg);
//?          })

          socket.emit('set_username', userName);
          setSocket(socket);
          setIsChat(true);
        } catch (error) {
          console.error('Erro ao conectar ao servidor de socket:', error);
        }
      }
  
    }

  return (
    <section className='flex justify-center items-center h-screen'>
    
      <div className='text-black bg-white p-2 h-60 m-5 flex flex-col justify-center items-center rounded-xl gap-4
                      md:w-96'>
        <h1 className='md:text-2xl text-[25px] border-b border-b-[#ccc] pb-2 font-bold'>Escreva o seu nome</h1>

        <input 
        type="text"
        ref={inputValue}
        placeholder='Nome de usuário'
        className='text-black border border-[#ccc] p-2 rounded-full'
        required
         />

         

        <button className='bg-sky-500 text-white p-2 rounded-full w-80 hover:bg-sky-600' onClick={valueForm}>Entrar</button>
    </div>

    </section>
  )
}
