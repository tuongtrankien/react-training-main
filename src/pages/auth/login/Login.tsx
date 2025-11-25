import {Link, useNavigate} from "react-router-dom";
import { AuthPath, UserPath } from "../../../shared/Constants";
import { useContext, useState } from "react";
import { AuthenticatedContext } from "../../../shared/Authenticated";
import InputField from "../../../components/inputs/InputField";
import Swal from "sweetalert2";

const Login = () => {
    const [username, setUsername] =  useState("");
    const [password, setPassword] =  useState("");

    const { user, login } = useContext(AuthenticatedContext);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try
        {
            e.preventDefault();
            var userData = await login(username, password);
            console.log("Logged in user:", user);
            if (userData?.role === 'admin') {
                navigate('/pages/')
            } else {
                navigate(`/pages/${UserPath.PERSONAL_INFORMATION(userData?.id.toString())}`);
            }
        }
        catch (error)
        {
            console.error("Login failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid credentials. Please try again.',
            });
        }
    }

    return(
        <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
            <a href="#" className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white">
            <img src="/logo.png" className="mr-4 h-11" alt="Simple KYC Logo"/>
                <span>Simple KYC Authentication</span>
            </a>
            <div className="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Sign in to platform
                </h2>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <InputField
                        label="Username"
                        id="username"
                        type="text"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <InputField
                        label="Password"
                        id="password"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" name="remember" type="checkbox" className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600" required/>
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="font-medium text-gray-900 dark:text-white">Remember me</label>
                        </div>
                        {/* <Link to={`pages/${AuthPath.RESET_PASSWORD}`} className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Lost Password?</Link> */}
                    </div>
                    <button type="submit" className="w-full px-5 py-3 text-base font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 sm:w-auto dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login to your account</button>
                    {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        Forgot password? <Link to={`/pages/${AuthPath.SIGN_UP}`} className="text-primary-700 hover:underline dark:text-primary-500">Sign-up</Link>
                    </div> */}
                </form>
            </div>
        </div>
    )
}

export default Login;