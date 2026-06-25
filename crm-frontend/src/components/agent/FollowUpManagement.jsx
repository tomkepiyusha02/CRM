import React,
{
    useEffect,
    useState
}
from "react";

import FollowUpService
from "../../services/FollowUpService";

import LeadService
from "../../services/LeadService";

import { toast }
from "react-toastify";

function FollowUpManagement() {

    const [followUps,setFollowUps] =
        useState([]);

    const [leads,setLeads] =
        useState([]);

    const [leadId,setLeadId] =
        useState("");

    const [followupDate,setFollowupDate] =
        useState("");

    const [followupTime,setFollowupTime] =
        useState("");

    const [remarks,setRemarks] =
        useState("");

    useEffect(() => {

        loadData();

    }, []);

    const loadData = async () => {

    try {

        const userId =
            localStorage.getItem("userId");

        const followResponse =
            await FollowUpService.getByAgent(
                userId
            );

        setFollowUps(
            followResponse.data
        );

        const leadResponse =
            await LeadService.getAssignedLeads(
                userId
            );

        setLeads(
            leadResponse.data
        );

    }
    catch(error){

        console.log(error);

    }
};
    const addFollowUp =
        async () => {

            if(
                !leadId ||
                !followupDate
            ){

                toast.error(
                    "Fill Required Fields"
                );

                return;
            }

            try {

                const data = {

    leadId,

    agentId:
        localStorage.getItem(
            "userId"
        ),

    followupDate,

    followupTime,

    notes: remarks,

    status: "SCHEDULED",

    reminderType: "CALL"


};

                await FollowUpService
                    .addFollowUp(
                        data
                    );

                toast.success(
                    "Follow Up Scheduled"
                );

                setLeadId("");
                setFollowupDate("");
                setFollowupTime("");
                setRemarks("");

                loadData();

            }
            catch(error){

                console.log(error);

                toast.error(
                    "Failed To Schedule Follow Up"
                );

            }
        };

    const markCompleted =
        async (followup) => {

            try {

                await FollowUpService.update(
                    followup.followupId,
                    {
                        ...followup,
                        status:
                            "COMPLETED"
                    }
                );

                toast.success(
                    "Follow Up Completed"
                );

                loadData();

            }
            catch(error){

                toast.error(
                    "Update Failed"
                );

            }
        };

    const markMissed =
        async (followup) => {

            try {

                await FollowUpService.update(
                    followup.followupId,
                    {
                        ...followup,
                        status:
                            "MISSED"
                    }
                );

                toast.success(
                    "Marked As Missed"
                );

                loadData();

            }
            catch(error){

                toast.error(
                    "Update Failed"
                );

            }
        };

    return (

        <div className="chart-card">

            <h4>
                📞 Follow Up Management
            </h4>

            <div className="row mt-4">

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={leadId}
                        onChange={(e)=>
                            setLeadId(
                                e.target.value
                            )
                        }
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

                <div className="col-md-2">

                    <input
                        type="date"
                        className="form-control"
                        value={followupDate}
                        onChange={(e)=>
                            setFollowupDate(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-2">

                    <input
                        type="time"
                        className="form-control"
                        value={followupTime}
                        onChange={(e)=>
                            setFollowupTime(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-3">

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Remarks"
                        value={remarks}
                        onChange={(e)=>
                            setRemarks(
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="col-md-2">

                    <button
                        className="btn btn-primary w-100"
                        onClick={
                            addFollowUp
                        }
                    >
                        Add
                    </button>

                </div>

            </div>

            <div className="table-responsive mt-4">

                <table className="table">

                    <thead>

                        <tr>

                            <th>Lead</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Remarks</th>
                            <th>Status</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

{
    followUps.length > 0 ?

    followUps.map((item) => (

        <tr
            key={item.followupId}
        >

            <td>
                {
                    item.lead?.name ||
                    "N/A"
                }
            </td>

            <td>
                {
                    item.followupDate
                }
            </td>

            <td>
                {
                    item.followupTime
                }
            </td>

            <td>
                {
                    item.notes ||
                    "-"
                }
            </td>

            <td>

                <span
                    className={`badge ${
                        item.status === "COMPLETED"
                        ? "bg-success"
                        : item.status === "MISSED"
                        ? "bg-danger"
                        : "bg-warning"
                    }`}
                >
                    {item.status}
                </span>

            </td>

            <td>

                {
                    item.status ===
                    "SCHEDULED" && (

                        <>
                            <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                    markCompleted(item)
                                }
                            >
                                Complete
                            </button>

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                    markMissed(item)
                                }
                            >
                                Missed
                            </button>
                        </>
                    )
                }

            </td>

        </tr>

    ))

    :

    <tr>
        <td
            colSpan="6"
            className="text-center"
        >
            No Follow Ups Found
        </td>
    </tr>
}

</tbody>

                </table>

            </div>

        </div>

    );
}

export default FollowUpManagement;