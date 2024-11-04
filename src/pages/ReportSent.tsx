import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatedCheckmark } from "../icons/AnimatedCheckmark";

const ReportSent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || !location.state.fromSource) {
      navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col gap-3 items-center justify-center">
      <AnimatedCheckmark />
      <h1 className="text-5xl font-bold text-center">Report was sent</h1>
      <p className="text-xl font-medium pt-4 text-center">
        You chose "Testing school" as an option this helps you see how the
        reporting form works. If you want to report a real case of bullying,
        find your school and send report to them. In the event of a
        life-threatening situation, call 112.
      </p>
      <button className="btn btn-lg mt-8">
        <Link to="/">Back to home page</Link>
      </button>
    </div>
  );
};

export default ReportSent;
