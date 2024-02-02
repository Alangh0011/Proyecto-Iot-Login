import * as React from 'react';
import { signOut } from 'firebase/auth';//Para cerrar sesión
import { auth } from '../fire';
import StarsCanvas from '../components/canvas/Stars';
import EarthCanvas from '../components/canvas/Earth';
import img from '../../public/logo.jfif';
import Contenido_Home from './Contenido_Home';
import Modal from './Modal';
import Modalcm from './Modalcm';

export default function Home({
    user,
    setAuthState,
    setUser
}) {

    const signOutHandler = () => {
        signOut(auth)
        .then(() => {
            setUser(null);
            setAuthState('login');
        })
        .catch((err) => console.log(err));
    }

    return (
        <div className="flex w-full h-screen">
            
            <div className="w-full items-center justify-center mt-2 lg:w-1/2">
                <div className= "w-full px-10 py-1 border-gradient-to-tr rounded-3xl bg-primary border-2 border-gray-100">

                <div className='mt-4 flex justify-between items-center'>
                    <div className='mt-8 flex items-center'>
                    <img src={img} alt="Logo" className="w-12 h-12 object-contain" />
                    </div>
                    <div className='mt-8 flex items-center'>
                        <button
                        onClick={signOutHandler}
                        className="active:scale-[4] active:duration-80 transition-all py-2 rounded-xl bg-[#915EFF] text-white text-lg font-bold hover:scale-[1.5] ease-in-out w-60"
                        >
                        Salir
                        </button>
                    </div>
                </div>

                <Contenido_Home user ={user}/>
                    
                
                </div>
            </div>
            <div className="hidden fixed lg:flex w-1/2 h-full top-0 right-0 bg-primary">
                <EarthCanvas/>
                <StarsCanvas/>
            </div>
            <Modal/>
            <Modalcm/>
</div>)
}