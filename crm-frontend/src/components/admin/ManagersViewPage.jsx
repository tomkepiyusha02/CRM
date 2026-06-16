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

function ManagersViewPage() {

    const [managers,
        setManagers] =
        useState([]);

    const [searchCity,
        setSearchCity] =
        useState("");

    const [selectedManager,
        setSelectedManager] =
        useState(null);

    const [show,
        setShow] =
        useState(false);

    useEffect(() => {

        loadManagers();

    }, []);

    const loadManagers =
        async () => {

            try {

                const response =
                    await UserService.getManagers();

                setManagers(
                    response.data
                );

            } catch (error) {

                console.error(
                    error
                );
            }
        };

    const filteredManagers =
        managers.filter(
            manager =>
                manager.assignedCity
                    ?.toLowerCase()
                    .includes(
                        searchCity.toLowerCase()
                    )
        );

    return (

        <div className="view-page">

            {/* Header */}

            <div className="page-header">

                <div>

                    <h1 className="page-title">
                        👨‍💼 Managers Overview
                    </h1>

                    <p className="page-subtitle">
                        Monitor and manage all managers across cities
                    </p>

                </div>

                <div className="header-count">

                    {filteredManagers.length}

                    <span>
                        Managers
                    </span>

                </div>

            </div>

            {/* Search */}

            <div className="search-wrapper mb-4">

                <i className="bi bi-search search-icon"></i>

                <input
                    type="text"
                    className="form-control search-box"
                    placeholder="Search Managers By City..."
                    value={searchCity}
                    onChange={(e) =>
                        setSearchCity(
                            e.target.value
                        )
                    }
                />

            </div>

            {/* Cards */}

            <div className="row">

                {

                    filteredManagers.map(
                        manager => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={
                                    manager.userId
                                }
                            >

                                <div
                                    className="manager-card h-100"
                                    onClick={() => {

                                        setSelectedManager(
                                            manager
                                        );

                                        setShow(
                                            true
                                        );
                                    }}
                                >

                                    <div className="manager-banner"></div>

                                    <div className="manager-avatar">

                                        <img
                                            src={`https://ui-avatars.com/api/?name=${manager.name}&background=2563eb&color=ffffff&size=256`}
                                            alt=""
                                        />

                                    </div>

                                    <div className="manager-content">

                                        <h4>
                                            {manager.name}
                                        </h4>

                                        <div className="city-badge">

                                            {
                                                manager.assignedCity
                                            }

                                        </div>

                                        <p>

                                            {
                                                manager.email
                                            }

                                        </p>

                                        <div className="d-flex justify-content-center gap-2 mt-3">

                                            <span className="badge bg-success">
                                                Active
                                            </span>

                                            <span className="badge bg-primary">
                                                Manager
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

            {/* Modal */}

            <Modal
                show={show}
                centered
                onHide={() =>
                    setShow(false)
                }
            >

                <Modal.Header closeButton>

                    <Modal.Title>

                        👨‍💼 Manager Details

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {

                        selectedManager &&

                        <>

                            <div className="text-center mb-4">

                                <img
                                    src={`https://ui-avatars.com/api/?name=${selectedManager.name}&background=2563eb&color=ffffff&size=256`}
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
                                    selectedManager.name
                                }

                            </p>

                            <p>

                                <strong>
                                    Email :
                                </strong>

                                {" "}

                                {
                                    selectedManager.email
                                }

                            </p>

                            <p>

                                <strong>
                                    Mobile :
                                </strong>

                                {" "}

                                {
                                    selectedManager.mobile
                                }

                            </p>

                            <p>

                                <strong>
                                    Assigned City :
                                </strong>

                                {" "}

                                {
                                    selectedManager.assignedCity
                                }

                            </p>

                            <p>

                                <strong>
                                    Location :
                                </strong>

                                {" "}

                                {
                                    selectedManager.location
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

export default ManagersViewPage; 