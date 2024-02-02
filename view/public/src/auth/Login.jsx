import * as React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import StarsCanvas from '../components/canvas/Stars'; // Importa el componente de lienzo de estrellas
import EarthCanvas from '../components/canvas/Earth'; // Importa el componente de lienzo de la tierra

import { signInWithEmailAndPassword} from 'firebase/auth'; // Importa la función de inicio de sesión con correo y contraseña de Firebase
import { auth } from '../fire'; // Importa el objeto de autenticación de Firebase

/**
 * Componente de React que maneja la funcionalidad de inicio de sesión.
 * @param {Object} props - Propiedades pasadas al componente.
 * @param {function} props.setAuthState - Función para establecer el estado de autenticación.
 * @param {function} props.setUser - Función para establecer el usuario autenticado.
 * @returns {JSX.Element} Componente de React que representa el formulario de inicio de sesión.
 */

function Login({
    setAuthState,
    setUser
}) {
    // Estados locales para el correo electrónico y la contraseña
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
// Función para manejar el evento de inicio de sesión
    const handleLogin = () => {
        if(email !== null && password !== null) {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUser(email); // Establece el usuario autenticado
                setAuthState('home'); // Cambia el estado de autenticación a 'home'
            })
            .catch((err) => alert(err)); // Muestra una alerta en caso de error
        }
    }
    // Renderiza la interfaz de usuario del formulario de inicio de sesión
    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center mt-4 lg:w-1/2">
                <div className="bg-violet-gradient px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <h1 className="text-5xl font-semibold">WELCOME</h1>
                    <p className="font-medium text-lg mt-4">CroqueFeed!</p>
                    {/* Campos de entrada para el correo electrónico y la contraseña */}
                    <div className="mt-8">
                        <div>
                            <label className="text-lg font-medium">Email</label>
                            <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border-2 border-gray-100 rounded-md px-4 py-2 mt-2 bg-transparent"
                            placeholder="enter your email"/>
                        </div>
                    </div>
                    <div className="mt-8">
                        <div>
                            <label className="text-lg font-medium">Password</label>
                            <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border-2 border-gray-100 rounded-md px-4 py-2 mt-2 bg-transparent"
                            placeholder="enter your password"
                            type="password"/>
                        </div>
                    </div>
                    {/* Botón de inicio de sesión */}
                    <div className="mt-8 flex justify-between items-center">
                        <div>
                            <input
                            type="checkbox"
                            id="remember"
                            className=""/>
                            <label htmlFor="remember"
                            className="mt-2 font-medium text-base">Remember for 30 days</label>
                        </div>
                        <button className="font-medium text-base text-green-500">Forgot password</button>
                    </div>
                    <div className="mt-8 flex flex-col gap-y-4">
                        <button 
                        onClick={handleLogin} // Manejador de clic para el botón de inicio de sesión
                        className="active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out">Sign in</button>
                    </div>
                    {/* Botones de inicio de sesión con proveedores de terceros */}
                    <div className="mt-8 flex mx-auto space-x-10 justify-center">
                        <button className="border-2 border-gray-100 rounded-md px-4 py-2 mt-2 active:scale-[1.1] active:duration-80 transition-all hover:scale-[1.2] ease-in-out">
                            <FcGoogle className="text-4xl "/>
                        </button>
                        <button className="border-2 border-gray-100 rounded-md px-4 py-2 mt-2 active:scale-[1.1] active:duration-80 transition-all hover:scale-[1.2] ease-in-out">
                            <FaFacebook className="text-4xl text-blue-700"/>
                        </button>
                        <button className="border-2 border-gray-100 rounded-md px-4 py-2 mt-2 active:scale-[1.1] active:duration-80 transition-all hover:scale-[1.2] ease-in-out">
                            <FaGithub className="text-4xl"/>
                        </button>
                    </div>
                    {/* Enlace para registrarse */}
                    <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Don't have an account?</p>
                            <button 
                            onClick={() => setAuthState('register')} // Cambia el estado de autenticación a 'register'
                            className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
                    </div>
            </div>
        </div>
        {/* Componente de lienzo de la Tierra, visible en pantallas grandes */}
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-primary">
        <EarthCanvas/>
        </div>
        {/* Componente de lienzo de estrellas, visible en todas las pantallas */}

        <StarsCanvas/>
    </div>
    );
}

export default Login;