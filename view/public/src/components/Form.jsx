import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function Form() {
    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100">
            <h1 className="text-5xl font-semibold">WELCOME</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">Wlcome back! Please enter your details</p>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Email</label>
                    <input
                    
                    className="w-full border-2 border-gray-100 rounded-md px-4 py-2 mt-2 bg-transparent"
                    placeholder="enter your email"/>
                </div>
            </div>
            <div className="mt-8">
                <div>
                    <label className="text-lg font-medium">Password</label>
                    <input
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
                <button onClick={() => setAuthState('register')}
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
                    className='ml-2 font-medium text-base text-violet-500'>Sign up</button>
            </div>
        </div>
    )
}   

export default Form
