import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index"
import authService from '../appwrite/auth';
import { useForm } from "react-hook-form"

function SignUp() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("");

    const create = async (data) => {
        setError("");
        try {
            const userData = await authService.createaccount(data)
            if (userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate('/');
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[100px]">
                        <Logo width='100%'></Logo>
                    </span>

                </div>
                <h2 className="text-center text-2xl font-bold leading-tight">SignUp</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Don&apos;t have any account?&nbsp;
                    <Link to="/signup"
                        className='font-medium text-primary transition-all duration-200 hover:underline'
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className='text-red-600 mt-8 text-center'>{error}</p>}

                <form className='flex flex-col ' onSubmit={handleSubmit(create)}>
                    <input className='rounded-lg m-2 p-2'
                        label='full Name: '
                        placeholder='enter name'
                        {...register("name",{
                            required:true,
                        })}
                        />
                    <input className='rounded-lg m-2 p-2'
                        type='Email'
                        label='Email'
                        placeholder='enter mail'
                        {...register("email",{
                            required:true,
                        })}
                       

                    />
                    <input className=' rounded-lg m-2 p-2'
                        type='password'
                        label='password'
                        placeholder='enter password'
                        {...register("password",{
                            required:true,
                        })}
                        />
                     <Button type="submit" className="m-2">
                            Create Account
                        </Button>

                </form>

            </div>
        </div>
    )

}

export default SignUp;