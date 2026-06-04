import EnquiryForm from "../components/leads/EnquiryForm";
import "../styles/Enquiry.css";

function EnquiryPage() {

  return (

    <div className="enquiry-page">

      <div className="container">

        <div className="hero-section">

          <h1>
            Find Your Dream Property
          </h1>

          <p>
            Fill out the enquiry form and our experts will contact you shortly.
          </p>

        </div>

        <EnquiryForm />

      </div>

    </div>
  );
}

export default EnquiryPage;