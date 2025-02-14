import React, { useState } from "react"
import { useForm } from "react-hook-form";
import axiosInstance from "../../axios/axiosConfig";
import jobStore from "../../store/jobStore";

const AddJobForm = (props) => {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            name: "",
            company: "",
            description: "",
        }
    });

    const [isLoading, setIsLoading] = useState(false);
    const { addJob } = jobStore();

    const token = localStorage.getItem("Authorization");

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post("/job", data, {
                headers: {
                    Authorization: token
                }
            });
            const { message, job } = response.data;
            addJob(job);
            props.handleClose();
            alert(message);

        } catch (error) {
            const message = error.response?.data.message || error.message;
            alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-job-form rounded mt-3">
            <h1>Add Job</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="exampleInputName">Name</label>
                    <input {...register("name", { required: "Name is required" })} type="text" className="form-control" id="exampleInputName" placeholder="Enter name" />
                    {errors.name && <p className="text-danger">{errors.name.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputCompany">Company</label>
                    <input {...register("company", { required: "Company is required" })} type="text" className="form-control" id="exampleInputCompany" placeholder="Enter company" />
                    {errors.company && <p className="text-danger">{errors.company.message}</p>}
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputDescription">Description</label>
                    <input {...register("description", { required: "Description is required" })} type="text" className="form-control" id="exampleInputDescription" placeholder="Enter description" />
                    {errors.description && <p className="text-danger">{errors.description.message}</p>}
                </div>
                <button disabled={isLoading} onClick={props.handleClose} type="submit" className="my-4 me-4 btn btn-danger">Close</button>
                <button disabled={isLoading} type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default AddJobForm