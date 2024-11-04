import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowLeft from "../icons/ArrowLeft";
import Download from "../icons/Download";
import ReportAPI, { Report } from "../api/report";
import FileAPI from "../api/file";
import { reportCategories } from "./CreateReport";

function ReportDetail() {
  const { id: reportId } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState<Report | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedReport, setEditedReport] = useState<
    Omit<Report, "files" | "id">
  >({
    category: "",
    senderName: "",
    senderAge: 0,
    description: "",
  });

  useEffect(() => {
    if (reportId) {
      fetchReport(parseInt(reportId));
    }
  }, [reportId]);

  const handleSave = () => {
    setIsEditing(false);
    if (reportId && report) {
      ReportAPI.updateReport(parseInt(reportId), {
        id: report.id,
        ...editedReport,
      })
        .then(() => {
          fetchReport(parseInt(reportId));
          setIsEditing(false);
        })
        .catch((err) => {
          console.error("Error while updating report", err);
        });
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    let { name, value } = e.target;
    setEditedReport((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchReport = (reportId: number) => {
    ReportAPI.getReportById(reportId)
      .then((res) => {
        setReport(res.data);
        setEditedReport({
          category: res.data.category,
          senderName: res.data.senderName,
          senderAge: res.data.senderAge,
          description: res.data.description,
        });
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const deleteReport = () => {
    if (reportId) {
      ReportAPI.deleteReport(reportId)
        .then(() => {
          navigate("/reports", { state: { fromSource: true } });
        })
        .catch(() => {
          console.error("Error while deleting report");
        });
    }
  };

  const removeFile = (fileId: number) => {
    FileAPI.deleteFile(fileId)
      .then(() => {
        if (reportId) {
          fetchReport(parseInt(reportId));
        }
        console.log("File removed");
      })
      .catch((err) => {
        console.error("Error while removing the file", err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        to="/reports"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Reports
      </Link>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">Report Details</h1>

          {report && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-gray-600">Category</p>
                  {isEditing ? (
                    <select
                      value={editedReport.category}
                      name="category"
                      onChange={handleChange}
                    >
                      <option disabled value="">
                        Select one
                      </option>
                      {reportCategories.map((opt, i) => (
                        <option value={opt} key={i}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <p className="font-semibold">{report.category}</p>
                  )}
                </div>
                <div>
                  <p className="text-gray-600">Sender</p>
                  {isEditing ? (
                    <input
                      type="text"
                      name="senderName"
                      value={editedReport.senderName}
                      onChange={handleChange}
                      className="border p-2 rounded"
                    />
                  ) : (
                    <p className="font-semibold">{report.senderName}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Age</h2>
                {isEditing ? (
                  <input
                    type="number"
                    name="senderAge"
                    value={editedReport.senderAge}
                    onChange={handleChange}
                    className="border p-2 rounded"
                  />
                ) : (
                  <p className="text-gray-700">{report.senderAge}</p>
                )}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                {isEditing ? (
                  <textarea
                    name="description"
                    value={editedReport.description}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                  />
                ) : (
                  <p className="text-gray-700">{report.description}</p>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">Attached Files</h2>
                {report.files.length > 0 ? (
                  report.files.map((file, i) => (
                    <div
                      key={i}
                      className="bg-gray-100 p-4 rounded-lg flex items-center justify-between"
                    >
                      <div>
                        <p className="font-semibold">{file.fileName}</p>
                        <p className="text-sm text-gray-600">{file.fileType}</p>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={file.downloadLink}
                          download={file.fileName}
                          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-flex items-center"
                        >
                          <Download
                            className="w-4 h-4 mr-2 text-white"
                            fill="#FFFFFF"
                          />
                          Download
                        </a>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded inline-flex items-center"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No attached files</p>
                )}
              </div>
            </>
          )}
          <div className="flex gap-3 pt-6">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-flex items-center"
              >
                Edit report
              </button>
            ) : (
              <button
                onClick={() => handleSave()}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded inline-flex items-center"
              >
                Save
              </button>
            )}
            <button
              onClick={() => deleteReport()}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded inline-flex items-center"
            >
              Delete report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetail;
