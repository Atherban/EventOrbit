import React from 'react'
import { useParams,useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6,"Password must be at o least 6 characters"),
});

const LoginPage = () =>{
  const {role} =  useParams();
  const navigate = useNavigate();

  const normalizedRole = 
    role === "client" || role === "vendor" ? role: "client";

  const {
    register,
    handleSubmit,
    formState:{errors, isSubmitting},
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email:"",
      password:"",
    },
  });

  const onSubmit = async (data) =>{
    const payload = {
      ...data,
      role: normalizedRole,
    };

    console.log("Login payload:",payload);

    reset();

    if(normalizedRole === "client"){
      navigate("/client/dashboard");
    }else{
      navigate("/vendor/dashboard");
  }
};

const title = 
  normalizedRole === "client" ? "Client Login" : "Vendor Login";
  return(
    <div className = "login-page">
      <div className="login-card" >
        <h1 className='login-=title'>{title}</h1>
        <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group'>
            <label className='form-label'>Email</label>
            <input
              type="email"
              {...register("email")}
              className="form-input"
              placeholder = "Enter your email"/>
              {errors.email && (
                <p className='form-error'>{errors.email.message}</p>
              )}
          </div>
              <div className='form-group'>
                <label className='form-label'>Password</label>
                <input 
                type= "password"
                {...register("password")}
                className="form-input"
                placeholder="Enter your password"
                />
                {errors.password && (
                  <p className='form-error'>{errors.password.message}</p>
                )}
              </div>
              <button type="submit"
              className='form-button'
              disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." :"Login"}
              </button>
              <p className='login-meta'>
                Don&apos;t have an account?{''}
                <span className='login-link'
                onClick={()=> navigate("/register")}
                >
                  Register
                </span>
              </p>
        </form>
      </div>
    </div>
  )
};
export default LoginPage