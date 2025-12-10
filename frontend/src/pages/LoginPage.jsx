import React, { useState } from "react";            
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./LoginPage.css";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react"; 

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Login payload:", data);

      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        data,
        { withCredentials: true }
      );

      console.log("Login success:", res.data);

      const user = res.data.user; // { name, role }

      if (!user || !user.role) {
        alert("Login response missing role");
        return;
      }

      if (user.role === "client") {
        navigate("/client/dashboard");
      } else if (user.role === "vendor") {
        navigate("/vendor/dashboard");
      } else {
        alert("Unknown role, contact admin");
      }

      reset();
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.message || "Login failed, please try again");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              {...register("email")}
              className="form-input"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="form-error">{errors.email.message}</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>

            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}    
                {...register("password")}
                className="form-input password-input"
                placeholder="Enter your password"
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)} 
              >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}                     
              </button>
            </div>

            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="form-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <p className="login-meta">
            Don&apos;t have an account?{" "}
            <span
              className="login-link"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
