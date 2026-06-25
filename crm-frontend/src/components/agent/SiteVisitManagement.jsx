
import React, { useEffect, useState } from "react";

import LeadService from "../../services/LeadService";
import SiteVisitService from "../../services/SiteVisitService";
import PropertyService from "../../services/PropertyService";

import { toast } from "react-toastify";

function SiteVisitManagement() {

    const [leads, setLeads] = useState([]);
    const [properties, setProperties] = useState([]);

    const [selectedLead, setSelectedLead] = useState("");
    const [selectedProperty, setSelectedProperty] = useState("");

    const [visitDate, setVisitDate] = useState("");
    const [visitTime, setVisitTime] = useState("");

    const [remarks, setRemarks] = useState("");
    const [customerFeedback, setCustomerFeedback] = useState("");

    const [visits, setVisits] = useState([]);

    useEffect(() => {

    const loadData = async () => {

        await loadLeads();

        await loadProperties();

    };

    loadData();

}, []);
    const loadLeads = async () => {

        try {

            const userId =
                localStorage.getItem("userId");

            const response =
                await LeadService.getAssignedLeads(
                    userId
                );

            setLeads(response.data);

        }
        catch (error) {

            console.log(error);

        }
    };

   const loadProperties = async () => {

    try {

        const userId =
            localStorage.getItem("userId");

        const response =
            await PropertyService.getAssignedProperties(
                userId
            );

        setProperties(
            response.data
        );

    }

    catch(error){

        console.log(error);

    }

};

    const loadVisits = async (leadId) => {

        try {

            const response =
                await SiteVisitService.getByLead(
                    leadId
                );

            setVisits(response.data);

        }
        catch (error) {

            console.log(error);

        }
    };

    const scheduleVisit = async () => {

        try {

            if (!selectedLead) {

                toast.error(
                    "Please Select Lead"
                );

                return;
            }

            if (!selectedProperty) {

                toast.error(
                    "Please Select Property"
                );

                return;
            }

            if (!visitDate) {

                toast.error(
                    "Please Select Date"
                );

                return;
            }

            if (!visitTime) {

                toast.error(
                    "Please Select Time"
                );

                return;
            }

            const propertyAssigned = properties.find(

    p => p.propertyId === selectedProperty

);

if(!propertyAssigned){

    toast.error(
        "Please select a property assigned to you."
    );

    return;
}

            const visit = {

                leadId: selectedLead,

                agentId:
                    localStorage.getItem(
                        "userId"
                    ),

                propertyId:
                    selectedProperty,

                visitDate,

                visitTime,

                remarks,

                customerFeedback,

                status: "SCHEDULED"
            };

            console.log(
                "Visit Payload => ",
                visit
            );

            await SiteVisitService.addVisit(
                visit
            );

            toast.success(
                "Site Visit Scheduled Successfully"
            );

            loadVisits(
                selectedLead
            );

            setSelectedProperty("");
            setVisitDate("");
            setVisitTime("");
            setRemarks("");
            setCustomerFeedback("");

        }
        catch (error) {

            console.log(error);

            toast.error(
                error.response?.data ||
                "Failed To Schedule Visit"
            );
        }
    };

    return (

        <div className="chart-card">

            <h4>
                🏠 Site Visit Management
            </h4>

            <div className="row mt-4">

                {/* Lead */}

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={selectedLead}
                        onChange={(e) => {

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
                            leads.map((lead) => (

                                <option
                                    key={lead.leadid}
                                    value={lead.leadid}
                                >
                                    {lead.name}
                                </option>

                            ))
                        }

                    </select>

                </div>

                {/* Property */}

                <div className="col-md-3">

                    <select
                        className="form-select"
                        value={selectedProperty}
                        onChange={(e) =>
                            setSelectedProperty(
                                e.target.value
                            )
                        }
                    >

                        <option value="">
                            Select Property
                        </option>

                        {
                            properties.map(
                                (property) => (

                                    <option
    key={property.propertyId}
    value={property.propertyId}
>
    {property.name}
    {" | "}
    {property.location}
    {" | ₹"}
    {property.price?.toLocaleString()}
</option>
                                )
                            )
                        }

                    </select>

                </div>

                {/* Date */}

                <div className="col-md-3">

                    <input
                        type="date"
                        className="form-control"
                        value={visitDate}
                        onChange={(e) =>
                            setVisitDate(
                                e.target.value
                            )
                        }
                    />

                </div>

                {/* Time */}

                <div className="col-md-3">

                    <input
                        type="time"
                        className="form-control"
                        value={visitTime}
                        onChange={(e) =>
                            setVisitTime(
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            {/* Remarks */}

            <textarea
                className="form-control mt-3"
                rows="3"
                placeholder="Visit Remarks..."
                value={remarks}
                onChange={(e) =>
                    setRemarks(
                        e.target.value
                    )
                }
            />

            {/* Feedback */}

            <textarea
                className="form-control mt-3"
                rows="3"
                placeholder="Customer Feedback..."
                value={customerFeedback}
                onChange={(e) =>
                    setCustomerFeedback(
                        e.target.value
                    )
                }
            />

          <button
    className="btn btn-primary mt-3"
    onClick={scheduleVisit}
    disabled={
        !selectedLead ||
        !selectedProperty ||
        !visitDate ||
        !visitTime
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
                        <th>Time</th>
                        <th>Status</th>
                        <th>Remarks</th>
                        <th>Feedback</th>

                    </tr>

                </thead>

                <tbody>

                    {
                        visits.map((visit) => (

                            <tr
                                key={visit.visitId}
                            >

                                <td>
                                    {visit.visitDate}
                                </td>

                                <td>
                                    {visit.visitTime}
                                </td>

                                <td>
                                    {visit.status}
                                </td>

                                <td>
                                    {visit.remarks}
                                </td>

                                <td>
                                    {visit.customerFeedback}
                                </td>

                            </tr>

                        ))
                    }

                </tbody>

            </table>

        </div>
    );
}

export default SiteVisitManagement;

