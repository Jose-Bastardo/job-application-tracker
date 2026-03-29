function JobList({ jobs, filter, sort, onDelete, editJob }) {
 
  console.log(jobs);
    const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(job => job.Status === filter);



function List(){
  if(jobs.length == 0){
    return(<h2>No job applications yet. Add one above.</h2>)
  }
  else{
    return(
      <div>
        <h2>Jobs List</h2>
        {filteredJobs.map((job, index ) => 
                <div key={index}>
                <p>{job.Company} {job.Role} {job.Status} {job.Notes} {job.dateApplied}
                <button name="Edit" onClick={() => editJob(job)}>Edit</button>
                <button name="Delete" onClick={() => onDelete(job.Id)}>Delete</button>
                </p>
                </div>
            )
        }
      </div>
    )
  }
}

    return(
  <div>
    <List />
    </div>
    )
}

export default JobList;