import React, {
    useEffect,
    useState
} from "react";

import UserService
from "../../services/UserService";

import {
    Modal,
    Button
}
from "react-bootstrap";

import "../../styles/viewPages.css";

function AgentsViewPage() {

    const [agents,
        setAgents] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    const [selectedAgent,
        setSelectedAgent] =
        useState(null);

    const [show,
        setShow] =
        useState(false);

    useEffect(() => {

        loadAgents();

    }, []);

    const loadAgents =
        async () => {

            try {

                const response =
                    await UserService.getAgents();

                setAgents(
                    response.data
                );

            } catch (error) {

                console.error(error);
            }
        };

    const filteredAgents =
        agents.filter(
            agent =>
                agent.assignedCity
                    ?.toLowerCase()
                    .includes(
                        search.toLowerCase()
                    ) ||

                agent.assignedArea
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
                        👨‍💻 Agents Overview
                    </h1>

                    <p className="page-subtitle">
                        Monitor agents city-wise and area-wise
                    </p>

                </div>

                <div className="header-count">

                    {filteredAgents.length}

                    <span>
                        Agents
                    </span>

                </div>

            </div>

            <div className="search-wrapper">

                <i className="bi bi-search search-icon"></i>

                <input
                    type="text"
                    className="form-control search-box"
                    placeholder="Search By City Or Area..."
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

                    filteredAgents.map(
                        agent => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={
                                    agent.userId
                                }
                            >

                                <div
                                    className="manager-card h-100"
                                    onClick={() => {

                                        setSelectedAgent(
                                            agent
                                        );

                                        setShow(
                                            true
                                        );
                                    }}
                                >

                                    <div className="manager-banner"></div>

                                    <div className="manager-avatar">

                                        <img
                                            src={`https://ui-avatars.com/api/?name=${agent.name}&background=16a34a&color=ffffff&size=256`}
                                            alt=""
                                        />

                                    </div>

                                    <div className="manager-content">

                                        <h4>
                                            {agent.name}
                                        </h4>

                                        <div className="city-badge">

                                            {
                                                agent.assignedCity
                                            }

                                        </div>

                                        <p>

                                            {
                                                agent.assignedArea
                                            }

                                        </p>

                                        <p>

                                            {
                                                agent.email
                                            }

                                        </p>

                                        <div className="d-flex justify-content-center gap-2 mt-3">

                                            <span className="badge bg-success">
                                                Active
                                            </span>

                                            <span className="badge bg-dark">
                                                Agent
                                            </span>

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

                        👨‍💻 Agent Details

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {

                        selectedAgent &&

                        <>

                            <div className="text-center mb-4">

                                <img
                                    src={`https://ui-avatars.com/api/?name=${selectedAgent.name}&background=16a34a&color=ffffff&size=256`}
                                    alt=""
                                    style={{
                                        width: "100px",
                                        height: "100px",
                                        borderRadius: "50%"
                                    }}
                                />

                            </div>

                            <p>

                                <strong>
                                    Name :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.name
                                }

                            </p>

                            <p>

                                <strong>
                                    Email :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.email
                                }

                            </p>

                            <p>

                                <strong>
                                    Mobile :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.mobile
                                }

                            </p>

                            <p>

                                <strong>
                                    City :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.assignedCity
                                }

                            </p>

                            <p>

                                <strong>
                                    Area :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.assignedArea
                                }

                            </p>

                            <p>

                                <strong>
                                    Location :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.location
                                }

                            </p>

                            <p>

                                <strong>
                                    Manager Id :
                                </strong>

                                {" "}

                                {
                                    selectedAgent.assignedManagerId
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

export default AgentsViewPage;