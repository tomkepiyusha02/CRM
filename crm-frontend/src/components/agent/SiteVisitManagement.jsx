import React,
{
    useEffect,
    useState
}
from "react";

import LeadService
from "../../services/LeadService";

import SiteVisitService
from "../../services/SiteVisitService";

import { toast }
from "react-toastify";

function SiteVisitManagement() {

    const [leads,
        setLeads] =
        useState([]);

    const [selectedLead,
        setSelectedLead] =
        useState("");

    const [visitDate,
        setVisitDate] =
        useState("");

    const [remarks,
        setRemarks] =
        useState("");

    const [visits,
        setVisits] =
        useState([]);

    useEffect(() => {

        loadLeads();

    }, []);

    const loadLeads =
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

    const loadVisits =
        async (leadId) => {

            try {

                const response =
                    await SiteVisitService
                        .getByLead(
                            leadId
                        );

                setVisits(
                    response.data
                );

            }

            catch(error){

                console.log(error);

            }
        };

    const scheduleVisit =
        async () => {

            try {

                const visit = {

                    visitDate,

                    remarks,

                    lead: {
                        leadid:
                            selectedLead
                    },

                    agent: {
                        userId:
                            localStorage.getItem(
                                "userId"
                            )
                    }

                };

                await SiteVisitService
                    .addVisit(
                        visit
                    );

                toast.success(
                    "Site Visit Scheduled"
                );

                loadVisits(
                    selectedLead
                );

                setRemarks("");

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
                🏠 Site Visit Management
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

                            loadVisits(
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

                <div className="col-md-4">

                    <input
                        type="datetime-local"
                        className="form-control"
                        value={
                            visitDate
                        }
                        onChange={(e)=>
                            setVisitDate(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            <textarea
                className="form-control mt-3"
                rows="4"
                placeholder="Visit Remarks..."
                value={remarks}
                onChange={(e)=>
                    setRemarks(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-primary mt-3"
                onClick={
                    scheduleVisit
                }
            >
                Schedule Visit
            </button>

            <hr />

            <h5>
                Visit History
            </h5>

            <table className="table">

                <thead>

                    <tr>

                        <th>Date</th>

                        <th>Status</th>

                        <th>Remarks</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        visits.map(
                            visit => (

                                <tr
                                    key={
                                        visit.visitId
                                    }
                                >

                                    <td>
                                        {
                                            visit.visitDate
                                        }
                                    </td>

                                    <td>
                                        {
                                            visit.status
                                        }
                                    </td>

                                    <td>
                                        {
                                            visit.remarks
                                        }
                                    </td>

                                </tr>

                            )
                        )
                    }

                </tbody>

            </table>

        </div>
    );
}

export default SiteVisitManagement;