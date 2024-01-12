import Form from '../components/Form';
import * as React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../fire';

function Login({
    setAuthState,
    setUser
}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');


    const handleLogin = () => {
        if(email !== null && password !== null) {
            signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                setUser(email)
                setAuthState('home')
            })
            .catch((err) => alert(err));
        }
    }

    return (
        <div className="flex w-full h-screen">
            <div className="w-full flex items-center justify-center lg:w-1/2">
                <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
                    <h1 className="text-5xl font-semibold">WELCOME</h1>
                    <p className="font-medium text-lg text-gray-500 mt-4">Wlcome back! Please enter your details</p>
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
                        onClick={handleLogin}
                        className="active:scale-[.98] active:duration-80 transition-all py-2 rounded-xl bg-green-500 text-white text-lg font-bold hover:scale-[1.1] ease-in-out">Sign in</button>
                    </div>
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
                    <div className='mt-8 flex justify-center items-center'>
                            <p className='font-medium text-base'>Don't have an account?</p>
                            <button 
                            onClick={() => setAuthState('register')}
                            className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
                    </div>
            </div>
        </div>
        <div className="hidden relative lg:flex h-full w-1/2 items-center justify-center bg-gray-200">
            <div className="w-60 h-60 bg-gradient-to-tr from-green-500 to-violet-500 rounded-full animate-spin"/>
            <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'/>
        </div>
    </div>
    );
}

export default Login;