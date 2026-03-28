function JobList({ jobs, filter, onDelete }) {
 
    const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(job => job.Status === filter);

    return(
  <div>
    <h2>Jobs List</h2>
    {console.log(jobs)}
    {console.log(filteredJobs)}
      {filteredJobs.map((job, index ) => 
                <div key={index}>
                <p>{job.Company} {job.Role} {job.Status} {job.Notes}
                <button name="Delete" onClick={() => onDelete(job.Id)}>Delete</button>
                </p>
                </div>
            )
        }
    </div>
    )
}

export default JobList;