import Pagination from './Pagination';

import link from '../assets/link.svg';

function JobList({ jobs, onDelete, editJob, currentPage, setCurrentPage, clearForm, isLoading, selectedRowId }) {

  const pageJobLimit = 7;
  const numberOfPages = Math.ceil(jobs.length / pageJobLimit);
  const startIndex = (currentPage - 1) * pageJobLimit
  const endIndex = startIndex + pageJobLimit
  const currentPageJobs = jobs.slice(startIndex, endIndex)

  function JobStatus(status) {
    switch (status.status) {
      case 'Applied': return <td className="w-fit"><div className="bg-blue-400/30 text-blue-700 px-2 py-1 rounded-3xl text-center w-24">Applied</div></td>
      case 'Interviewing': return <td className="w-fit"><div className="bg-purple-400/30 text-purple-700 px-2 py-1 rounded-3xl text-center w-24">Interview</div></td>
      case 'Rejected': return <td className="w-fit"><div className="bg-red-400/30 text-red-700 px-2 py-1 rounded-3xl text-center w-24">Rejected</div></td>
      case 'Offer': return <td className="w-fit"><div className="bg-green-400/30 text-green-700 px-2 py-1 rounded-3xl text-center w-24">Offer</div></td>
      default: return <td className="w-fit"><div className="w-30">status.status</div></td>
    }
  }

  const options = { year: 'numeric', month: 'short', day: 'numeric' };

  function formatDate(date) {
    const newDate = new Date(date + "T00:00:00");
    console.log("Date: " + date);
    console.log("New Date: " + newDate);
    return newDate.toLocaleDateString('en-US', options);
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
          <div className="w-full h-full flex flex-col">
        <div className="w-full h-full flex overflow-x-scroll mb-8">
          <table className=" w-full h-full border-collapse">
            <thead className="bg-[#F6F8FB] text-[#6B7280]">
              <tr className="[&_th]:py-2 xl:[&_th]:px-4 font-thin [&_th]:px-2 [&_th]:font-medium [&_th]:w-fit [&_th]:whitespace-nowrap border-t border-b border-[#E5E7EB] h-15">
                <th className="text-left">Company</th>
                <th className="text-left">Role</th>
                <th className="text-left">Location</th>
                <th className="text-left">Type</th>
                <th className="text-left">Status</th>
                <th className="text-left">Date Applied</th>
                <th className="text-left">Link</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="h-120 2xl:h-full w-full">
              {currentPageJobs.map((job, index) =>
                <tr className={`${selectedRowId === job.Id ? "bg-blue-100" : "odd:bg-white even:bg-gray-50"} [&_td]:py-2 xl:[&_td]:px-4 [&_td]:px-2 w-full [&_td]:whitespace-nowrap border-b border-[#E5E7EB] h-1/7`}
                key={index}
                >
                  <td className="truncate min-w-30 w-5/12 max-w-0">{job.Company}</td>
                  <td className="truncate min-w-30 w-7/12 max-w-0">{job.Role}</td>
                  <td className="w-fit">{job.Location}</td>
                  <td className="w-fit">{job.Type}</td>
                  <JobStatus status={job.Status} />
                  <td className="text-left w-fit" >{formatDate(job.dateApplied)}</td>
                  <td className="w-fit">
                    <a href={job.Link} target="_blank" className="text-blue-500 active:text-blue-900 hover:border-b border-current">
                      <span className="space-x-0.5 whitespace-nowrap">
                        <p className="inline" >View</p>
                        <svg className="h-5 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M14 7H16C18.7614 7 21 9.23858 21 12C21 14.7614 18.7614 17 16 17H14M10 7H8C5.23858 7 3 9.23858 3 12C3 14.7614 5.23858 17 8 17H10M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </span>
                    </a>
                  </td>
                  <td className="w-fit">
                    <button className="text-blue-500 active:text-blue-900 hover:underline hover:cursor-pointer" name="Edit" onClick={() => editJob(job)}>Edit</button>
                    <p className="inline"> · </p>
                    <button className="text-red-600  active:text-red-900 hover:underline hover:cursor-pointer" name="Delete" onClick={() => onDelete(job.Id)}>Delete</button>
                  </td>
                </tr>
                  )}
              <tr className="h-full"><td></td></tr>
            </tbody>
          </table>
        </div>
            <Pagination numberOfPages={numberOfPages} currentPage={currentPage} onCurrentPageChange={setCurrentPage} clearForm={clearForm} start={startIndex + 1} end={currentPageJobs.length + startIndex} total={jobs.length}/>
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