import React from 'react'
import Head from 'next/head'
import { Sidebar } from '../components/Sidebar'
import Modal from 'react-modal'
import { useQuiosco } from '../hooks/useQuiosco';
import { ModalProduct } from '../components/ModalProduct';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Steps } from '../components/Steps';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#__next');

export const Layout = ({children,page}) => {

  const {modal} = useQuiosco()

  return (
    <>
      <Head>
        <title> Cafe - {page} </title>
        <meta name='description' content='Quisco Cafetería'></meta>
      </Head>

      <div className='md:flex'>
        <aside className='md:w-4/12 xl:w1/4 2xl:1/5'>
          <Sidebar/>
        </aside>

        <main className='md:w-8/12 xl:w3/4 2xl:4/5 h-screen overflow-y-scroll'>
          <div className='p-10'>
            <Steps/>
            {children}
          </div>
        </main>
      </div>

      {modal && (<Modal isOpen={modal} style={customStyles} >
        <ModalProduct/>
      </Modal>)}

      <ToastContainer/>
    </>
  )
}
