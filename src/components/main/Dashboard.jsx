import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import AddJob from "./AddJobModal";
import authStore from "../../store/userStore";
import axiosInstance from "../../axios/axiosConfig";
import jobStore from "../../store/jobStore";

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();
    const { user, resetState } = authStore();
    const { jobs, setJobs, removeJob, resetJobs } = jobStore();

    const token = localStorage.getItem("Authorization");
    const logout = () => {
        localStorage.removeItem("Authorization");
        navigate("/login");
        resetState();
        resetJobs();
    };
    const handleDelete = async (jobId) => {
        try {
            setDisabled(true);
            await axiosInstance.delete(`/job/${jobId}`, {
                headers: {
                    Authorization: token
                }
            });
            alert("Job deleted successfully");
            removeJob(jobId);
        } catch (error) {
            const message = error.response?.data.message || error.message;
            alert(message);
        } finally {
            setDisabled(false);
        }
    }

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axiosInstance.get("/job", {
                    headers: {
                        Authorization: token
                    }
                });
                const { jobs } = response.data;
                setJobs(jobs);
            } catch (error) {
                const message = error.response?.data.message || error.message;
                alert(message);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [])

    return (
        <div>
            {user.role === "admin" && <AddJob />}
            <button className="btn btn-primary position-fixed top-0 end-0 m-5" onClick={logout}>Logout</button>
            {
                loading
                    ? <div> loading... </div>
                    : <div className="container mt-5">
                        {
                            jobs && jobs.length > 0 
                            ? <>
                                <h1>Jobs</h1>
                                <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#job_id</th>
                                    <th scope="col">#job_name</th>
                                    <th scope="col">#company</th>
                                    <th scope="col">#job_description</th>
                                    {user.role === "admin" && <th scope="col">#action</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    jobs.map(job => {
                                        return (

                                            <tr key={job._id}>
                                                <td>{job._id}</td>
                                                <td>{job.name}</td>
                                                <td>{job.company}</td>
                                                <td>@{job.description}</td>
                                                {user.role === "admin" && <td >
                                                    <button disabled={disabled} onClick={() => { handleDelete(job._id) }} className="btn btn-danger">delete</button>
                                                </td>}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        </>
                        : <> No jobs found </>
                        }
                    </div>
            }
        </div >
    )
}

export default Dashboard