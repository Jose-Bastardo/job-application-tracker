import React, { useEffect, useState } from 'react';

import add from '../assets/add.png';

function JobForm({ onAddJob, onJobUpdate, editableJob, clearForm }) {

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Default');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('Default');
  const [location, setLocation] = useState('');


  useEffect(() => {
    function fillForm() {
      setCompany(editableJob.Company);
      setRole(editableJob.Role);
      setStatus(editableJob.Status);
      setNotes(editableJob.Notes);
      setDate(editableJob.dateApplied);
      setLink(editableJob.Link);
      setLocation(editableJob.Location);
      setType(editableJob.Type);
    }

    fillForm();
  }, [editableJob])

  function handleSubmit() {

    const job = { company: company, role: role, status: status, notes: notes, dateApplied: date, location: location, link: link, type: type };
    if (checkForError(job) === 1) {
      return
    }

    onAddJob(job);

    clearForm();

  }

  function handleUpdate() {

    const job = { Id: editableJob.Id, company: company, role: role, status: status, notes: notes, dateApplied: date, location: location, link: link, type: type };
    if (checkForError(job) === 1) {
      return
    }

    onJobUpdate(job);

    clearForm();
  }

  function handleCancel() {

    clearForm();
  }

  function Buttons() {
    if (editableJob.Id == '') {
      return (

        <button className=" flex flex-row w-full space-x-2 bg-[#2563EB] active:bg-blue-900 hover:cursor-pointer text-white rounded-lg justify-center place-items-center text-center py-3 shadow-sm" onClick={handleSubmit}>
          <img alt="Add Job" src={add} className="h-10"/>
          <p>Add Job</p>
        </button>
      )}
    if (editableJob.Id != '') {
      return (
        <div className=" flex flex-row w-full space-x-2 text-white rounded-lg justify-center place-items-center text-center">
          <button className="bg-[#2563EB] active:bg-blue-900 p-3 rounded-lg w-full h-16 shadow-sm hover:cursor-pointer" onClick={handleUpdate}>Update</button>
          <button className="bg-red-600 active:bg-red-900 p-3 rounded-lg w-full h-16 shadow-sm hover:cursor-pointer" onClick={handleCancel}>Cancel</button>
        </div>
      );
    }
  }

  function checkForError(job) {
    if (job.company === "") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    if (job.role === "") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    if (job.dateApplied === "") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    if (job.status === "Default") {
      alert("Company, role, date applied, and status must be filled out")
      return 1
    }
    return 0
  }

  return (
    <div className="space-y-4 grow [&_label]:font-normal">
      <div className="flex flex-col">
        <label className="" htmlFor="company">Company Name</label>
        <input
          className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
          placeholder="Enter company name"
          value={company}
          id="company"
          required={true}
          onChange={(e) => setCompany(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="role">Job Title</label>
        <input
          className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
          placeholder="Enter job title"
          value={role}
          id="role"
          required={true}
          onChange={(e) => setRole(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="location">Job Location</label>
        <input
            className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
            placeholder="Enter job location (eg., New York, Remote)"
            value={location}
            id="location"
            required={true}
            onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="type">Job Type</label>
        <select
            className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
            name="type"
            id="type"
            value={type}
            required={true}
            onChange={(e) => setType(e.target.value)}>
          <option value="Default" disabled hidden>Select Type</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="status">Application Status:</label>
        <select
          className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
          name="status"
          id="status"
          value={status}
          required={true}
          onChange={(e) => setStatus(e.target.value)}>
          <option value="Default" disabled hidden>Select Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Rejected">Rejected</option>
          <option value="Offer" >Offer</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="date">Application Date</label>
        <input
          className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
          type="date"
          id="date"
          value={date}
          required={true}
          onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="link">Job Link</label>
        <input
            className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
            placeholder="https://company.com/careers/job/123"
            value={link}
            id={"link"}
            required={true}
            onChange={(e) => setLink(e.target.value)} />
      </div>
      <div className="flex flex-col">
        <label className="" htmlFor="notes">Notes</label>
        <textarea
          className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs max-h-min"
          placeholder="Add any notes about this application"
          value={notes}
          rows={3}
          id="notes"
          onChange={(e) => setNotes(e.target.value)} />
      </div>
      <Buttons />


    </div>
  );
}

export default JobForm;