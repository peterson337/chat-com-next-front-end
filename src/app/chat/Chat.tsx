import React, { useRef, useState, useEffect } from 'react'
import { BsSend } from 'react-icons/bs';

type Props = {
  socket: null | any
}
type ArrayMessage = {
  text: string,
  authorId: number,
  author: string
}

  export const Chat = ({socket} : Props) => {
    
    const message = useRef<HTMLInputElement | null>(null);
    const [messageList, setMessageList] = useState<ArrayMessage[]>([]);
    
    useEffect(() => {
      socket.on('receive_message', (data : any) => {
        setMessageList((current) => [...current, data]);
      })

      return () => socket.off('receive_message');
      
    }, [socket])
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (message.current) {
        const messageValue = message?.current?.value;
        message.current.value = '';
        socket.emit('message', messageValue);
        //setMessageList([...messageList, messageValue]);
      }
    }


  return (
    <section className='text-black flex justify-center items-center md:h-screen'>

      <div className='bg-white p-3  md:m-3 m-4  md:w-[600px] md:h-[600px] h-[400px] flex  items-center flex-col rounded-xl'>

        <h1 className='md:text-2xl text-[25px] border-b mb-3 border-b-[#ccc] pb-2  font-bold'>Chat</h1>
        
      <div className='border-b border-b-[#ccc]  overflow-auto md:pb-[459px] pb-60 '>
                          {
                            messageList.length === 0?
                            <p className='m-3 text-red-600 font-bold flex flex-wrap'>
                              Nenhuma mensagem foi encontrada. 
                              Por favor escreva uma mensagem 
                            </p>

                            :

                            messageList.map((item) => {
                              const authorId = item.authorId;
                              return (
                                <section key={authorId}
                                 className={authorId === socket.id ? 
                                 "text-white bg-blue-500 mr-56 p-2 rounded-xl mb-3 w-[300px] m-3" 
                                     :
                                 "text-white bg-red-500 ml-56 p-2 rounded-xl mb-3 w-[300px] m-3"
                                }
                                >
                                  <p className='flex flex-col'>
                                    <b className=' break-words md:w-72 text-center'>{item.author}</b>
                                    <p className=' break-words md:w-72'>{item.text}</p>
                                  </p>
                                </section>
                              );
                            })
                          }

      </div>

      <div className='flex flex-row items-end justify-end m-3 gap-3 h-screen'>
      {/* mt-[459px] */}

    <input
     type="text"
     placeholder='Escreva a sua mensagem'
     className='text-black border border-[#ccc] p-2 rounded-full outline-none'
     ref={message}
     required
     />
    <button onClick={handleSubmit} className="text-white mt-2 p-2 rounded-full bg-sky-800  outline-none"><BsSend/></button>
      </div>

      </div>

</section>
  )
}
