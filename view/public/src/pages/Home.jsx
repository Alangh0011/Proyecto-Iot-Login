import * as React from 'react';
import { signOut } from 'firebase/auth'; // Importa la función para cerrar sesión de Firebase
import { auth } from '../fire'; // Importa el objeto de autenticación de Firebase
import StarsCanvas from '../components/canvas/Stars'; // Importa el componente de lienzo de estrellas
import EarthCanvas from '../components/canvas/Earth'; // Importa el componente de lienzo de la tierra
import img from '../../public/logo.jfif'; // Importa la imagen del logo
import Contenido_Home from './Contenido_Home'; // Importa el componente de contenido para la página de inicio
import Modal from './Modal'; // Importa el componente de modal
import Modalcm from './Modalcm'; // Importa el componente de modal

/**
 * Componente de React que representa la página de inicio.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {Object} props.user - Usuario actualmente autenticado.
 * @param {function} props.setAuthState - Función para establecer el estado de autenticación.
 * @param {function} props.setUser - Función para establecer el usuario autenticado.
 * @returns {JSX.Element} Componente de React que representa la página de inicio.
 */

export default function Home({ user, setAuthState, setUser }) {
    // Función para manejar el evento de cerrar sesión
    const signOutHandler = () => {
        signOut(auth)
        .then(() => {
            setUser(null); // Elimina el usuario autenticado
            setAuthState('login'); // Cambia el estado de autenticación a 'login'
        })
        .catch((err) => console.log(err)); // Muestra un mensaje de error en la consola en caso de error
    }

    // Renderiza la interfaz de usuario de la página de inicio
    return (
        <div className="flex w-full h-screen">
            {/* Contenedor principal */}
            <div className="w-full items-center justify-center mt-2 lg:w-1/2">
                <div className= "w-full px-10 py-1 border-gradient-to-tr rounded-3xl bg-primary border-2 border-gray-100">
                    {/* Barra superior */}
                    <div className='mt-4 flex justify-between items-center'>
                        <div className='mt-8 flex items-center'>
                            {/* Logo */}
                            <img src={img} alt="Logo" className="w-12 h-12 object-contain" />
                        </div>
                        <div className='mt-8 flex items-center'>
                            {/* Botón de salir */}
                            <button
                                onClick={signOutHandler} // Manejador de clic para cerrar sesión
                                className="active:scale-[4] active:duration-80 transition-all py-2 rounded-xl bg-[#915EFF] text-white text-lg font-bold hover:scale-[1.5] ease-in-out w-60"
                            >
                                Salir
                            </button>
                        </div>
                    </div>
                    {/* Contenido de la página de inicio */}
                    <Contenido_Home user ={user}/>
                </div>
            </div>
            {/* Contenedor para los componentes de lienzo (Tierra y Estrellas) */}
            <div className="hidden fixed lg:flex w-1/2 h-full top-0 right-0 bg-primary">
                <EarthCanvas/> {/* Lienzo de la Tierra */}
                <StarsCanvas/> {/* Lienzo de Estrellas */}
            </div>
            {/* Componente de modal */}
            <Modal/>
            {/* Componente de modal para comentarios */}
            <Modalcm/>
        </div>
    );
}
