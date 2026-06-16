import React from "react";

function ManagerStats() {

    return (

        <div className="row">

            <div className="col-md-3">

                <div className="card shadow">

                    <div className="card-body">

                        <h6>Total Leads</h6>

                        <h3>0</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow">

                    <div className="card-body">

                        <h6>New Leads</h6>

                        <h3>0</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow">

                    <div className="card-body">

                        <h6>Interested</h6>

                        <h3>0</h3>

                    </div>

                </div>

            </div>

            <div className="col-md-3">

                <div className="card shadow">

                    <div className="card-body">

                        <h6>Booked</h6>

                        <h3>0</h3>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ManagerStats;