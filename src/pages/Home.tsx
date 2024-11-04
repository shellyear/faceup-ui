import { Link } from "react-router-dom";
import PlusIcon from "../icons/PlusIcon";

const Home = () => {
  return (
    <div className="pt-6 pb-12">
      <div className="py-6 border-b border-gray-200">
        <h2 className="text-5xl font-bold pb-6">Test online trust box</h2>
        <p className="text-2xl font-bold">
          This trust box is not real. However, you can use it to send a test
          report and see how it works.
        </p>
        <p className="text-2xl pt-4">
          Anyone who is a witness or victim of bullying, inappropriate behaviour
          or has a problem they are ashamed to talk about personally can reach
          out through the FaceUp online trust box. The reports are anonymous, so
          students do not have to worry about the report being used against
          them.
        </p>
        <p className="text-2xl pt-4">
          If you want to report a <strong>real case of bullying</strong>, look
          for your school and send the report to that school. In case of a
          life-threatening situation, call 112.
        </p>
      </div>
      <div className="flex space-x-4 pt-6 pb-6">
        <Link
          to="/create"
          className="flex-1 p-4 bg-lightblue hover:bg-darkblue text-white font-bold text-xl rounded-lg"
        >
          <div className="flex justify-center align-center gap-2">
            <PlusIcon />
            <span>Create test report</span>
          </div>
        </Link>
        <Link
          to="/reports"
          className="p-4 flex-1 bg-lightblue hover:bg-darkblue text-white text-center font-bold text-xl rounded-lg"
        >
          View all reports
        </Link>
      </div>
    </div>
  );
};

export default Home;
