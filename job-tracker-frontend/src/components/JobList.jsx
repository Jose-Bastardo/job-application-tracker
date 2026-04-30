import Pagination from './Pagination';

function JobList({ jobs, onDelete, editJob, currentPage, setCurrentPage, isLoading }) {

  const pageJobLimit = 7;
  const numberOfPages = Math.ceil(jobs.length / pageJobLimit);
  const startIndex = (currentPage - 1) * pageJobLimit
  const endIndex = startIndex + pageJobLimit
  const currentPageJobs = jobs.slice(startIndex, endIndex)

  function JobStatus(status) {
    switch (status.status) {
      case 'Applied': return <td><div className="bg-blue-400/30 text-blue-700 p-2 rounded-3xl text-center">Applied</div></td>
      case 'Interviewing': return <td><div className="bg-purple-400/30 text-purple-700 p-2 rounded-3xl text-center">Interviewing</div></td>
      case 'Rejected': return <td><div className="bg-red-400/30 text-red-700 p-2 rounded-3xl text-center">Rejected</div></td>
      case 'Offer': return <td><div className="bg-green-400/30 text-green-700 p-2 rounded-3xl text-center">Offer</div></td>
      default: return <td><div className="">status.status</div></td>
    }
  }

  const options = { year: 'numeric', month: 'long', day: 'numeric' };


  function formatDate(date) {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', options)
  }

  function List() {
    if (isLoading) {
      return (<h2>Loading...</h2>)
    }
    if (jobs.length == 0) {
      return (<h2>No job applications yet. Add one above.</h2>)
    }
    else {
      return (
        <div className="flex flex-col h-full w-full">
          <table className="w-full">
            <thead className="bg-[#F6F8FB]">
              <tr className="[&_th]:py-2 [&_th]:px-5 [&_th]:text-left border-t border-b border-[#E5E7EB] h-15">
                <th>Company</th>
                <th>Role</th>
                <th>Status</th>
                <th>Date Applied</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPageJobs.map((job, index) =>
                <tr className="[&_td]:py-2 [&_td]:px-5 border-b border-[#E5E7EB] h-20" key={index}>
                  <td>{job.Company}</td>
                  <td>{job.Role}</td>
                  <JobStatus status={job.Status} />
                  <td>{formatDate(job.dateApplied)}</td>
                  <td>
                    <button className="text-[#2563EB] hover:underline" name="Edit" onClick={() => editJob(job)}>Edit</button>
                    <p className="inline"> · </p>
                    <button className="text-red-600 hover:underline" name="Delete" onClick={() => onDelete(job.Id)}>Delete</button>
                  </td>
                </tr>
              )
              }
            </tbody>
          </table>
          <Pagination numberOfPages={numberOfPages} currentPage={currentPage} onCurrentPageChange={setCurrentPage} start={startIndex + 1} end={currentPageJobs.length + startIndex} total={jobs.length}/>

        </div>
      )
    }
  }

  return (
    <div className="flex h-full w-full">
      <List />
    </div>
  )
}

export default JobList;