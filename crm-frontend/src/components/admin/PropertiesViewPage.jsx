import React,
{
    useEffect,
    useState
}
from "react";

import PropertyService
from "../../services/PropertyService";

import {
    Modal,
    Button
}
from "react-bootstrap";

import "../../styles/viewPages.css";

function PropertiesViewPage() {

    const [properties,
        setProperties] =
        useState([]);

    const [search,
        setSearch] =
        useState("");

    const [selectedProperty,
        setSelectedProperty] =
        useState(null);

    const [show,
        setShow] =
        useState(false);

    useEffect(() => {

        loadProperties();

    }, []);

    const loadProperties =
        async () => {

            try {

                const response =
                    await PropertyService.getAllProperties();

                setProperties(
                    response.data
                );

            } catch(error) {

                console.log(error);
            }
        };

    const filteredProperties =
        properties.filter(
            property =>
                property.location
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
                        🏠 Properties Overview
                    </h1>

                    <p className="page-subtitle">
                        Manage all available properties
                    </p>

                </div>

                <div className="header-count">

                    {filteredProperties.length}

                    <span>
                        Properties
                    </span>

                </div>

            </div>

            <div className="search-wrapper">

                <i className="bi bi-search search-icon"></i>

                <input
                    type="text"
                    className="form-control search-box"
                    placeholder="Search By Location..."
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

                    filteredProperties.map(
                        property => (

                            <div
                                className="col-lg-4 col-md-6 mb-4"
                                key={
                                    property.propertyId
                                }
                            >

                                <div
                                    className="manager-card h-100"
                                    onClick={() => {

                                        setSelectedProperty(
                                            property
                                        );

                                        setShow(
                                            true
                                        );
                                    }}
                                >

                                    <img
                                        src={
                                            property.imageUrl ||
                                            "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                                        }
                                        alt=""
                                        className="property-img"
                                    />

                                    <div
                                        className="manager-content"
                                    >

                                        <h4>
                                            {
                                                property.name
                                            }
                                        </h4>

                                        <div
                                            className="city-badge"
                                        >

                                            {
                                                property.location
                                            }

                                        </div>

                                        <p>

                                            ₹
                                            {" "}
                                            {
                                                property.price
                                            }

                                        </p>

                                        <div
                                            className="d-flex justify-content-center gap-2 mt-2"
                                        >

                                            <span
                                                className="badge bg-success"
                                            >
                                                {
                                                    property.propertyStatus
                                                }
                                            </span>

                                            <span
                                                className="badge bg-primary"
                                            >
                                                {
                                                    property.type
                                                }
                                            </span>

                                        </div>

                                        <button
                                            className="view-btn mt-4"
                                        >
                                            View Property
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
                size="lg"
                centered
                onHide={() =>
                    setShow(false)
                }
            >

                <Modal.Header
                    closeButton
                >

                    <Modal.Title>

                        Property Details

                    </Modal.Title>

                </Modal.Header>

                <Modal.Body>

                    {

                        selectedProperty &&

                        <>

                            <img
                                src={
                                    selectedProperty.imageUrl ||
                                    "https://images.unsplash.com/photo-1560518883-ce09059eeffa"
                                }
                                alt=""
                                className="property-img"
                            />

                            <hr/>

                            <p>
                                <strong>Name :</strong>
                                {" "}
                                {
                                    selectedProperty.name
                                }
                            </p>

                            <p>
                                <strong>Price :</strong>
                                {" "}
                                ₹
                                {
                                    selectedProperty.price
                                }
                            </p>

                            <p>
                                <strong>Type :</strong>
                                {" "}
                                {
                                    selectedProperty.type
                                }
                            </p>

                            <p>
                                <strong>Location :</strong>
                                {" "}
                                {
                                    selectedProperty.location
                                }
                            </p>

                            <p>
                                <strong>Area :</strong>
                                {" "}
                                {
                                    selectedProperty.areaSqft
                                }
                                sqft
                            </p>

                            <p>
                                <strong>Builder :</strong>
                                {" "}
                                {
                                    selectedProperty.builderName
                                }
                            </p>

                            <p>
                                <strong>Status :</strong>
                                {" "}
                                {
                                    selectedProperty.propertyStatus
                                }
                            </p>

                            <p>
                                <strong>Description :</strong>
                                {" "}
                                {
                                    selectedProperty.description
                                }
                            </p>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${selectedProperty.location}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-primary mt-3"
                            >
                                🗺 View On Map
                            </a>

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

export default PropertiesViewPage;