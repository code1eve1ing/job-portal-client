import React, { useState } from "react"
import AddJobForm from "./AddJobForm";

const AddJob = () => {

    const [showForm, setShowForm] = useState(false);
    return (
        <div className="container mt-5">
            <button className="btn btn-primary" onClick={() => { setShowForm(true) }}>Add JOB</button>
            {showForm && <AddJobForm handleClose={()=>{setShowForm(false)}}/>}
        </div>
    )
}

export default AddJob