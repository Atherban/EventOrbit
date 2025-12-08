import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./RegisterPage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["client", "vendor"], {
    errorMap: () => ({ message: "Please choose a role" }),
  }),
  city: z.string().min(2, "City must be at least 2 characters"),
  phone: z
    .string()
    .regex(/^\d+$/, "Phone must contain only digits")
    .min(9, "Phone number too short")
    .max(15, "Phone number too long"),
});

const RegisterPage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "client",
      city: "",
      phone: "",
    },
  });

  const selectedRole = watch("role");

  const onSubmit = async (data) => {
    try {
      console.log("Register payload:", data);

      await axios.post(
        "http://localhost:3000/api/auth/register",
        data,
        { withCredentials: true }
      );

      // after register, send them to login
      reset();
      navigate("/login");
    } catch (err) {
      console.error("Registration Error:", err);
      alert(
        err.response?.data?.message || "Registration failed, please try again"
      );
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <h1 className="register-title">Create an Account</h1>

        <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className="form-group">
            <label className="form-label">Name</label>
            <input
              type="text"
              {...register("name")}
              className="form-input"
              placeholder="Enter your name"
            />
            {errors.name && (
              <p className="form-error">{errors.name.message}</p>
            )}
          </div>

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

          {/* Password */}
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              {...register("password")}
              className="form-input"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="form-error">{errors.password.message}</p>
            )}
          </div>

          {/* Role Switches */}
          <div className="form-group">
            <label className="form-label">Role</label>

            <div className="role-switch-container">
              <label
                className={`role-switch ${
                  selectedRole === "client" ? "active" : ""
                }`}
              >
                <input type="radio" value="client" {...register("role")} />
                Client
              </label>

              <label
                className={`role-switch ${
                  selectedRole === "vendor" ? "active" : ""
                }`}
              >
                <input type="radio" value="vendor" {...register("role")} />
                Vendor
              </label>
            </div>

            {errors.role && (
              <p className="form-error">{errors.role.message}</p>
            )}
          </div>

          {/* City */}
          <div className="form-group">
            <label className="form-label">City</label>
            <input
              type="text"
              {...register("city")}
              className="form-input"
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="form-error">{errors.city.message}</p>
            )}
          </div>

          {/* Phone */}
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="text"
              {...register("phone")}
              className="form-input"
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="form-error">{errors.phone.message}</p>
            )}
          </div>

          {/* Submit */}
          <button type="submit" disabled={isSubmitting} className="form-button">
            {isSubmitting ? "Submitting..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
