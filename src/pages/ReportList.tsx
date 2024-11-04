import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReportAPI, { Report } from "../api/report";
import ArrowRight from "../icons/ArrowRight";

const ReportList = () => {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    ReportAPI.getReports()
      .then((res) => {
        setReports(res.data);
      })
      .catch((err) => console.error(err.message));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Reports</h1>
      <ul className="space-y-4">
        {reports.map((report) => (
          <li key={report.id}>
            <Link
              to={`/reports/${report.id}`}
              className="block bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">
                    {report.category}
                  </span>
                  <h2 className="text-xl font-semibold mt-2">
                    {report.senderName}
                  </h2>
                  <p className="text-gray-600">Age: {report.senderAge}</p>
                </div>
                <ArrowRight />
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReportList;
