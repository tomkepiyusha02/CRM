import React, {
    useEffect,
    useState
}
from "react";

import LeadService
from "../../services/LeadService";

import {
    Modal,
    Button
}
from "react-bootstrap";

import "../../styles/viewPages.css";

function LeadsViewPage() {

    const [leads,
        setLeads] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    const [selectedLead,
        setSelectedLead] =
        useState(null);

    const [show,
        setShow] =
        useState(false);

    useEffect(() => {

        loadLeads();

    }, []);

    const loadLeads =
        async () => {

            try {

                const response =
                    await LeadService.getAllLeads();

                setLeads(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    const filteredLeads =
        leads.filter(
            lead =>
                lead.name
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                lead.location
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    )
        );

    return (

        <div className="view-page">

            <div className="page-header">

                <div>

                    <h1 className="page-title">
                        📋 Leads Overview
                    </h1>

                    <p className="page-subtitle">
                        Monitor all customer enquiries and leads
                    </p>

                </div>

                <div className="header-count">

                    {filteredLeads.length}

                    <span>
                        Leads
                    </span>

                </div>

            </div>

            <div className="search-wrapper">

                <i className="bi bi-search search-icon"></i>

                <input
                    type="text"
                    className="form-control search-box"
                    placeholder="Search By Name Or Location..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="row mt-4">

                {

                    filteredLeads.map(
                        lead => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={
                                    lead.leadid
                                }
                            >

                                <div
                                    className="manager-card h-100"
                                    onClick={() => {

                                        setSelectedLead(
                                            lead
                                        );

                                        setShow(
                                            true
                                        );
                                    }}
                                >

                                    <div className="manager-banner"></div>

                                    <div className="manager-avatar">

                                        <img
                                            src={`https://ui-avatars.com/api/?name=${lead.name}&background=f59e0b&color=ffffff&size=256`}
                                            alt=""
                                        />

                                    </div>

                                    <div className="manager-content">

                                        <h4>
                                            {lead.name}
                                        </h4>

                                        <div className="city-badge">

                                            {
                                                lead.location
                                            }

                                        </div>

                                        <p>

                                            {
                                                lead.email
                                            }

                                        </p>

                                        <div
                                            className={`status-badge ${lead.status}`}
                                        >

                                            {
                                                lead.status
                                            }

                                        </div>

                                        <button
                                            className="view-btn mt-4"
                                        >
                                            View Details
                                        </button>

                                    </div>

                                </div>

                            </div>

                        )
                    )

                }

            </div>

            <Modal
                show={show}
                centered
                onHide={() =>
                    setShow(false)
                }
            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        📋 Lead Details

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {

                        selectedLead &&

                        <>

                            <div className="text-center mb-4">

                                <img
                                    src={`https://ui-avatars.com/api/?name=${selectedLead.name}&background=f59e0b&color=ffffff&size=256`}
                                    alt=""
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%"
                                    }}
                                />

                            </div>

                            <p>
                                <strong>Name :</strong>
                                {" "}
                                {selectedLead.name}
                            </p>

                            <p>
                                <strong>Email :</strong>
                                {" "}
                                {selectedLead.email}
                            </p>

                            <p>
                                <strong>Mobile :</strong>
                                {" "}
                                {selectedLead.mobileNo}
                            </p>

                            <p>
                                <strong>Location :</strong>
                                {" "}
                                {selectedLead.location}
                            </p>

                            <p>
                                <strong>Property Type :</strong>
                                {" "}
                                {selectedLead.property_type}
                            </p>

                            <p>
                                <strong>Budget :</strong>
                                {" "}
                                ₹ {selectedLead.budget}
                            </p>

                            <p>
                                <strong>Status :</strong>
                                {" "}
                                {selectedLead.status}
                            </p>

                            <p>
                                <strong>Requirement :</strong>
                                {" "}
                                {
                                    selectedLead.Additional_requirement
                                }
                            </p>

                            <p>
                                <strong>Created :</strong>
                                {" "}
                                {
                                    selectedLead.createdAt
                                }
                            </p>

                        </>

                    }

                </Modal.Body>

                <Modal.Footer>

                    <Button
                        variant="secondary"
                        onClick={() =>
                            setShow(false)
                        }
                    >
                        Close
                    </Button>

                </Modal.Footer>

            </Modal>

        </div>

    );
}

export default LeadsViewPage;