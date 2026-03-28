function JobList({ jobs, filter }) {
 
    const filteredJobs =
    filter === "All"
      ? jobs
      : jobs.filter(job => job.status === filter);

    return(
  <div>
    <h2>Jobs List</h2>
    {console.log(filter)}

      {filteredJobs.map((job, index, ) => 
                <div key={index}>
                <p>{job.company} {job.role} {job.status} {job.notes}</p>
                </div>
            )
        }
    </div>
    )
}

export default JobList;