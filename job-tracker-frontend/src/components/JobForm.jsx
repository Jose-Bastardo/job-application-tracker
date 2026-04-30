import React, { useEffect, useState } from 'react';

import add from '../assets/add.png';

function JobForm({ onAddJob, onJobUpdate, editableJob, onFormClear }) {

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [status, setStatus] = useState('Default');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function fillForm() {
      setCompany(editableJob.Company);
      setRole(editableJob.Role);
      setStatus(editableJob.Status);
      setNotes(editableJob.Notes);
      setDate(editableJob.dateApplied);
    }
    fillForm();
  }, [editableJob])

  function handleSubmit() {

    const job = { company: company, role: role, status: status, notes: notes, dateApplied: date }
    if (checkForError(job) === 1) {
      return
    }

    onAddJob(job);

    const clearForm = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    onFormClear(clearForm);

  }

  function handleUpdate() {

    const job = { Id: editableJob.Id, company: company, role: role, status: status, notes: notes, dateApplied: date }
    if (checkForError(job) === 1) {
      return
    }

    onJobUpdate(job);

    const clearForm = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    onFormClear(clearForm);
  }

  function handleCancel() {

    const clearForm = { Id: '', Company: '', Role: '', Status: 'Default', Notes: '', dateApplied: '' }
    onFormClear(clearForm);
  }

  function Buttons() {
    if (editableJob.Id == '') {
      return (<div className=" flex flex-row w-full space-x-2 bg-[#2563EB] text-white rounded-lg justify-center place-items-center text-center py-3 shadow-sm">
        <img alt="Add Job" src={add} className="h-10"/>
        <button onClick={handleSubmit}>Add Job</button>
      </div>);
    }
    if (editableJob.Id != '') {
      return (
        <div className=" flex flex-row w-full space-x-2 text-white rounded-lg justify-center place-items-center text-center">
          <button className="bg-[#2563EB] p-3 rounded-lg shadow-sm" onClick={handleUpdate}>Update</button>
          <button className="bg-red-600 p-3 rounded-lg shadow-sm" onClick={handleCancel}>Cancel</button>
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
    <div className="space-y-5 grow">
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
        <label className="" htmlFor="notes">Notes</label>
        <input
          className="border border-[#E5E7EB] py-2 px-4 rounded-lg mt-1 shadow-xs"
          placeholder="Add any notes about this application"
          value={notes}
          id="notes"
          onChange={(e) => setNotes(e.target.value)} />
      </div>
      <Buttons />


    </div>
  );
}

export default JobForm;