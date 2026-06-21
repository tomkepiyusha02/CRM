import React,
{
    useEffect,
    useState
}
from "react";

import LeadService
from "../../services/LeadService";

import LeadNoteService
from "../../services/LeadNoteService";

import { toast }
from "react-toastify";

function LeadNotes() {

    const [leads,
        setLeads] =
        useState([]);

    const [selectedLead,
        setSelectedLead] =
        useState("");

    const [notes,
        setNotes] =
        useState([]);

    const [noteText,
        setNoteText] =
        useState("");

    useEffect(() => {

        loadAssignedLeads();

    }, []);

    const loadAssignedLeads =
        async () => {

            try {

                const userId =
                    localStorage.getItem(
                        "userId"
                    );

                const response =
                    await LeadService
                        .getAssignedLeads(
                            userId
                        );

                setLeads(
                    response.data
                );

            }

            catch(error){

                console.log(error);

            }
        };

    const loadNotes =
        async (leadId) => {

            try {

                const response =
                    await LeadNoteService
                        .getByLead(
                            leadId
                        );

                setNotes(
                    response.data
                );

            }

            catch(error){

                console.log(error);

            }
        };

    const addNote =
        async () => {

            if(
                !selectedLead ||
                !noteText
            ){
                return;
            }

            try {

                const note = {

                    note:
                        noteText,

                    lead: {
                        leadid:
                            selectedLead
                    },

                    user: {
                        userId:
                            localStorage.getItem(
                                "userId"
                            )
                    }

                };

                await LeadNoteService
                    .addNote(note);

                toast.success(
                    "Note Added"
                );

                setNoteText("");

                loadNotes(
                    selectedLead
                );

            }

            catch(error){

                toast.error(
                    "Failed"
                );

            }
        };

    const deleteNote =
        async (id) => {

            try {

                await LeadNoteService
                    .deleteNote(id);

                toast.success(
                    "Deleted"
                );

                loadNotes(
                    selectedLead
                );

            }

            catch(error){

                toast.error(
                    "Failed"
                );

            }
        };

    return (

        <div className="chart-card">

            <h4>
                📝 Lead Notes
            </h4>

            <div className="row mt-4">

                <div className="col-md-4">

                    <select
                        className="form-select"
                        value={
                            selectedLead
                        }
                        onChange={(e)=>{

                            setSelectedLead(
                                e.target.value
                            );

                            loadNotes(
                                e.target.value
                            );

                        }}
                    >

                        <option value="">
                            Select Lead
                        </option>

                        {
                            leads.map(
                                lead => (

                                    <option
                                        key={
                                            lead.leadid
                                        }
                                        value={
                                            lead.leadid
                                        }
                                    >

                                        {lead.name}

                                    </option>

                                )
                            )
                        }

                    </select>

                </div>

            </div>

            <div className="mt-3">

                <textarea
                    rows="4"
                    className="form-control"
                    placeholder="Write follow-up notes..."
                    value={noteText}
                    onChange={(e)=>
                        setNoteText(
                            e.target.value
                        )
                    }
                />

            </div>

            <button
                className="btn btn-primary mt-3"
                onClick={addNote}
            >
                Add Note
            </button>

            <hr />

            <h5>
                Notes History
            </h5>

            {
                notes.length === 0 ? (

                    <p>
                        No Notes Found
                    </p>

                ) : (

                    notes.map(
                        note => (

                            <div
                                key={
                                    note.noteId
                                }
                                className="card mb-3"
                            >

                                <div className="card-body">

                                    <p>
                                        {
                                            note.note
                                        }
                                    </p>

                                    <small>

                                        {
                                            note.createdAt
                                        }

                                    </small>

                                    <br />

                                    <button
                                        className="btn btn-danger btn-sm mt-2"
                                        onClick={() =>
                                            deleteNote(
                                                note.noteId
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </div>

                            </div>

                        )
                    )

                )
            }

        </div>
    );
}

export default LeadNotes;