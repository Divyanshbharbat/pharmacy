import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'
import { NavLink } from 'react-router-dom';
import process from 'process';
import './Signup.css'

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();  // Correct way to use navigation in React Router v6

  const onSubmit = async (data) => {


    try {

      const response = await axios.post(`https://pharmacy-2-bzdr.onrender.com/signup`, data);

      if (response.data === 'success') {
        toast.success("Your Account Created Successfully")
        setTimeout(() => {
          navigate("/login");

        }, 1000)  // Navigate after successful signup
      }
    } catch (error) {
      toast.error("Email is Already Registered")
      console.log(error)
    }
  };

  return (

    <>
      <div className="row my-5">
        <div className="col-lg-6 col-sm-12 ">
          <div className="bg-primary p-3 m-3" style={{ borderRadius: "2vh" }}>
            <h1 className="text-center   my-5" style={{ fontSize: "6vh" }}>Signup</h1>


            <div className="container-fluid d-flex justify-content-center py-4 my-3 ">
              <form className='b' onSubmit={handleSubmit(onSubmit)}>
                <div className="input my-3 mx-3">
                  <input
                    type="text"
                    {...register("username", { required: "Username is required" })}
                    placeholder="Username"
                    style={{
                      backgroundColor: "#eaeaea",
                      border: "none",
                      height: "6vh",
                      borderRadius: '1vh',
                      padding: "1vh"
                    }}
                  />
                  {errors.username && <p className='my-2 text-white'>{errors.username.message}</p>}
                </div>
                <div className="input my-3 mx-3">
                  <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                    placeholder="Email"
                    style={{
                      backgroundColor: "#eaeaea",
                      border: "none",
                      height: "6vh",
                      borderRadius: '1vh',
                      padding: "1vh"
                    }}
                  />
                  {errors.email && <p className='my-2 text-white'>{errors.email.message}</p>}
                </div>
                <div className="input my-3 mx-3">
                  <input
                    type='password' min={8} id='password' name='password'
                    {...register("password", { required: "Password is required" })}
                    placeholder="Password"
                    style={{
                      backgroundColor: "#eaeaea",
                      border: "none",
                      height: "6vh",
                      borderRadius: '1vh',
                      padding: "1vh"
                    }}
                  />
                  {errors.password && <p className='my-2 text-white'>{errors.password.message}</p>}
                </div>
                <div className="text-white my-4 text-center">
                  <NavLink to='/contact' className='text-white'> Forgot password?</NavLink>

                </div>
                <div className="button d-flex justify-content-center">
                  <button className="btn btn-dark mx-3"><NavLink to="/login" className='text-white ' style={{ textDecoration: "none" }}>Login</NavLink></button>
                  <button type="submit" className="btn btn-dark mx-3">Signup</button>

                </div>
              </form>
            </div>
          </div>






        </div>

        <div className="col-lg-6 col-sm-12">
          <img className='img-fluid' src='https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-83.jpg?t=st=1737555366~exp=1737558966~hmac=d4c6939a419494a57f94c338c13e7b26084b8ac3331378dbfe627266d94d8be8&w=740' alt="" />
        </div>
      </div>



      <Toaster />




    </>
  );
};

export default Signup;