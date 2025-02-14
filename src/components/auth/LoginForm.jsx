import React, { useState } from "react"
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axiosInstance from "../../axios/axiosConfig";
import authStore from "../../store/userStore";

const SignupForm = () => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { setUserDetails, setIsAuthenticated } = authStore();

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/auth/login", data);
            const { message, token, user } = response.data;
            setUserDetails(user);
            setIsAuthenticated(true);
            alert(message);
            localStorage.setItem("Authorization", token);
            navigate("/");

        } catch (error) {
            const message = error.response?.data.message || error.message;
            alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Login</h1>
            <p>Not registered yet? <Link to="/signup">Signup</Link></p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Please enter valid email" } })} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters long" } })} type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </div>
                <button disabled={isLoading} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignupForm