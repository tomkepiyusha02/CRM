import React from "react";

function DashboardStats({
    title,
    value,
    icon,
    bgClass,
    onClick
}) {

    return (

        <div
            className="col-lg-3 col-md-6 mb-4"
            onClick={onClick}
            style={{
                cursor: "pointer"
            }}
        >

            <div
                className={`stats-card ${bgClass}`}
            >

                <div>

                    <h6>{title}</h6>

                    <h2>{value}</h2>

                </div>

                <div className="stats-icon">

                    {icon}

                </div>

            </div>

        </div>

    );
}

export default DashboardStats;