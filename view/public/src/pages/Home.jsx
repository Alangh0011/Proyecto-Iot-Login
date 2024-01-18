import * as React from 'react';
import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';//Para cerrar sesión
import { auth } from '../fire';
import StarsCanvas from '../components/canvas/Stars';
import EarthCanvas from '../components/canvas/Earth';
import { io } from 'socket.io-client';
import img from '../../public/logo.jfif';
import Modal from "./Modal"
import Modalcm from './Modalcm';

export default function Home({
    user,
    setAuthState,
    setUser
}) {

    const socket = io();

    const [modalOpen, setModalOpen] = useState(false);

    const [distance, setDistance] = useState(3);
    const [modalcmOpen, setModalcmOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
      };
    
      const closeModal = () => {
        setModalOpen(false);
      };
    

    // Manejar el evento 'connected' emitido desde el servidor
    socket.on('connected', (message) => {
        console.log(message);
    });

    const signOutHandler = () => {
        signOut(auth)
        .then(() => {
            setUser(null);
            setAuthState('login');
        })
        .catch((err) => console.log(err));
    }

    const onGetData = async () => {
        setModalcmOpen(true); // Corrección aquí
            try {
                const response = await fetch('/getDistance'); // Realiza la solicitud GET al servidor
                const data = await response.json(); // Obtiene los datos en formato JSON
                // Muestra los datos en la página HTML
                document.getElementById('Distancia').innerText = `${data.quality} cm`;
                setDistance(data.quality);
                
            } catch (error) {
                console.error('Error al obtener los datos del sensor de distancia:', error);
            }
    }
    
    const onGetGirar = async () => {
        openModal(true);
        try {
            const response = await fetch('/getGirar'); // Realiza la solicitud GET al servidor
            const data = await response.json(); // Obtiene los datos en formato JSON
            // Muestra los datos en la página HTML
            document.getElementById('Abrir').innerText = `${data.quality}`;
        } catch (error) {
            console.error('Error al mandar la peticion', error);
        }

    }

    return (
        <div className="flex w-full h-screen">
            
            <div className="w-full items-center justify-center mt-4 lg:w-1/2">
                <div className= "w-full px-10 py-20 rounded-3xl bg-primary border-2 border-gray-100">

                <div className='mt-8 flex justify-between items-center'>
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

                    <h1 className="mt-8 text-5xl font-semibold">Hola {user} bienvenido a CroqueFeed</h1>
                    
                    <h2 className="mt-8 text-3xl font-semibold">Instrucciones de uso:</h2>


                    <ol className='list-decimal mt-8'>        
                        <li>
                        <p className='text-x1 font-bold'>Encendido del Dispensador:</p>
                            <ul className='list-disc text-[16px] mt-4 mb-4'>
                                <li>Conecta el dispensador de croquetas a una fuente de alimentación eléctrica.
                                </li>
                                <li>
                                Asegúrate de que la conexión a Internet esté establecida para garantizar el funcionamiento de la interfaz web.
                                </li>
                            </ul>
                        </li>
                        <li>
                        <p className='text-x1 font-bold'>Controles del Dispensador:</p>
                            <ul className='list-disc text-[16px] mt-4 mb-4'>
                                <li> Verás dos botones principales: "Abrir Compuerta" y "Ver Croquetas".
                                </li>
                                <li>
                                Utiliza el botón "Abrir Compuerta" para dispensar croquetas manualmente. Presiona el botón y observa cómo se abre la compuerta durante un tiempo predeterminado.
                                </li>
                                <li>
                                Utiliza el botón "Ver Croquetas" para obtener información sobre la cantidad actual de croquetas en el contenedor.
                                </li>
                            </ul>
                        </li>
                        <li>
                        <p className='text-x1 font-bold'>Monitoreo de Croquetas:</p>
                            <ul className='list-disc text-[16px] mt-4 mb-4'>
                                <li> La sección "Ver Croquetas" mostrará la cantidad actual de croquetas en el contenedor.
                                </li>
                                <li>
                                Asegúrate de revisar regularmente este valor para conocer el nivel de croquetas y tomar decisiones informadas sobre la recarga.
                                </li>
                            </ul>
                        </li>
                        <li>
                        <p className='text-x1 font-bold'>Recarga de Croquetas:</p>
                            <ul className='list-disc text-[16px] mt-4 mb-4'>
                                <li> Cuando notes que la cantidad de croquetas es baja, prepara más croquetas y realiza una recarga en el contenedor.
                                </li>
                                <li>
                                Asegúrate de cerrar la compuerta después de cada recarga.
                                </li>
                                <li>
                                Cuando hayas terminado de usar el dispensador, cierra sesión en la interfaz web.
                                </li>
                                <li>
                                Si es necesario, desconecta el dispensador de la fuente de alimentación eléctrica.
                                </li>
                            </ul>
                        </li>
                    </ol>

                    
                        <div className='mt-8 flex justify-center items-center'>
                                <p className='font-medium text-base'>Contenedor de croquetas: <span id="Distancia">--</span></p>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                                <button 
                                onClick={onGetData}
                                className="w-80 active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out">ACTUALIZAR</button>
                        </div>
                        <div className='mt-8 flex justify-center items-center'>
                            <button 
                            onClick={onGetGirar}
                            className="w-80 active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out">GIRAR MOTOR</button>
                        </div>
                        
                </div>
            </div>
            <div className="hidden fixed lg:flex w-1/2 h-full top-0 right-0 bg-primary">
            <EarthCanvas/>
            <StarsCanvas/>
</div>

<Modal isOpen={modalOpen} onClose={closeModal} />
<Modalcm isOpen={modalcmOpen} onClose={() => setModalcmOpen(false)} data={distance} />



        
</div>)
}