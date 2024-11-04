import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReportAPI from "../api/report";
import FileUpload, { useFileUpload } from "../components/FileUpload";

export const reportCategories = [
  "Bullying, bad behaviour",
  "Learning difficulties",
  "Problems at home",
  "Something else",
];

const CreateReport = () => {
  const navigate = useNavigate();
  const { handleFileChange, files, fileError } = useFileUpload();

  const [expandForm, setExpandForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      category: "",
      senderName: "",
      senderAge: "",
      description: "",
    },
    validationSchema: Yup.object({
      category: Yup.string().required("Category is required"),
      senderName: Yup.string().required("Name is required"),
      senderAge: Yup.number().required("Age is required").positive().integer(),
      description: Yup.string(),
    }),
    onSubmit: async (values) => {
      try {
        await ReportAPI.createReport({
          ...values,
          senderAge: Number(values.senderAge),
          files,
        });
        navigate("/sent", { state: { fromSource: true } });
      } catch (error) {
        console.error("Error when sending a report", error);
      }
    },
  });

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-5xl font-bold mt-12 text-center">New report</h2>

      <form
        className="form-control w-full max-w-3xl mt-6"
        onSubmit={formik.handleSubmit}
      >
        <div className="label">
          <span className="label-text text-xl font-bold">
            Category <span className="text-red-500">*</span>
          </span>
        </div>
        <select
          name="category"
          className="select select-info w-full text-xl"
          onChange={formik.handleChange}
          value={formik.values.category}
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
        {formik.errors.category && (
          <div className="label">
            <span className="label-text-alt text-red-500 text-xl">
              {formik.errors.category}
            </span>
          </div>
        )}

        {expandForm && (
          <>
            <div className="label mt-6">
              <span className="label-text text-xl font-bold">
                Who needs help? <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              name="senderName"
              type="text"
              className="input input-bordered input-info text-xl w-full max-w-3xl"
              onChange={formik.handleChange}
              value={formik.values.senderName}
            />
            {formik.errors.senderName && (
              <div className="label">
                <span className="label-text-alt text-red-500 text-xl">
                  {formik.errors.senderName}
                </span>
              </div>
            )}

            <div className="label mt-6">
              <span className="label-text text-xl font-bold">
                Age <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              name="senderAge"
              type="number"
              className="input input-bordered input-info text-xl w-full max-w-3xl"
              onChange={formik.handleChange}
              value={formik.values.senderAge}
            />
            {formik.errors.senderAge && (
              <div className="label">
                <span className="label-text-alt text-red-500 text-xl">
                  {formik.errors.senderAge}
                </span>
              </div>
            )}

            <div className="label mt-6">
              <span className="label-text flex items-center gap-2 text-xl font-bold">
                More information
              </span>
            </div>
            <textarea
              className="textarea textarea-info text-xl"
              name="description"
              placeholder="Please provide as much detail as possible..."
              rows={6}
              onChange={formik.handleChange}
              value={formik.values.description}
            ></textarea>
            <FileUpload
              className="mt-6"
              fileError={fileError}
              handleFileChange={handleFileChange}
            />
          </>
        )}
        {!expandForm ? (
          <button
            className={`${
              !formik.values.category ? "btn-disabled opacity-50" : ""
            } mt-6 w-full p-4 max-w-screen-md bg-lightblue hover:bg-darkblue text-white font-bold text-xl rounded-lg`}
            onClick={() => setExpandForm(true)}
            disabled={!formik.values.category}
          >
            <span>Continue</span>
          </button>
        ) : (
          <button
            type="submit"
            className="mt-6 w-full p-4 max-w-screen-md bg-lightblue hover:bg-darkblue text-white font-bold text-xl rounded-lg"
          >
            <span>Send</span>
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateReport;
