import React from 'react';
import EnquiryForm from '../components/leads/EnquiryForm';
import '../styles/Enquiry.css';

function EnquiryPage() {

  return (

    <div className="enquiry-page">

      <div className="enquiry-container">

        <h1 className="title">
          Property Enquiry
        </h1>

        <p className="subtitle">
          Submit your requirements and our team will contact you shortly.
        </p>

        <EnquiryForm />

      </div>

    </div>

  );
}

export default EnquiryPage;