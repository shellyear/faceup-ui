import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReportAPI from "../api/report";
import FileUpload, { useFileUpload } from "../components/FileUpload";

export const reportCategories = [
  "Bullying, bad behaviour",
  "Learning difficulties",
  "Problems at home",
  "Something else",
];

const defaultFormData = {
  category: "",
  senderName: "",
  senderAge: "",
  description: "",
};

const CreateReport = () => {
  const navigate = useNavigate();
  const { handleFileChange, files, fileError } = useFileUpload();

  const [formData, setFormData] = useState(defaultFormData);
  const [errors, setErrors] = useState(defaultFormData);
  const [expandForm, setExpandForm] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      ...defaultFormData,
    };
    if (!formData.senderName) newErrors.senderName = "Name is required";
    if (!formData.hasOwnProperty("senderAge"))
      newErrors.senderAge = "Age is required";
    setErrors(newErrors);
    return Object.values(newErrors).every((value) => !value);
  };

  const sendReport = async () => {
    if (validateForm()) {
      try {
        const { senderAge, ...rest } = formData;
        await ReportAPI.createReport({
          ...rest,
          senderAge: Number(senderAge),
          files,
        });
      } catch (error) {
        console.error("Error when sending a report", error);
      }
      navigate("/sent", { state: { fromSource: true } });
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-5xl font-bold mt-12 text-center">New report</h2>

      <form className="form-control w-full max-w-3xl mt-6">
        <div className="label">
          <span className="label-text text-xl font-bold">
            Category <span className="text-red-500">*</span>
          </span>
        </div>
        <select
          value={formData.category}
          onChange={handleChange}
          className="select select-info w-full text-xl"
          name="category"
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

        {expandForm && (
          <>
            <div className="label mt-6">
              <span className="label-text text-xl font-bold">
                Who needs help? <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              required
              name="senderName"
              type="text"
              className="input input-bordered input-info text-xl w-full max-w-3xl"
              value={formData.senderName}
              onChange={handleChange}
            />
            {errors.senderName && (
              <div className="label">
                <span className="label-text-alt text-red-500 text-xl">
                  {errors.senderName}
                </span>
              </div>
            )}

            <div className="label mt-6">
              <span className="label-text text-xl font-bold">
                Age <span className="text-red-500">*</span>
              </span>
            </div>
            <input
              required
              name="senderAge"
              type="number"
              value={formData.senderAge}
              onChange={handleChange}
              className="input input-bordered input-info text-xl w-full max-w-3xl"
            />
            {errors.senderAge && (
              <div className="label">
                <span className="label-text-alt text-red-500 text-xl">
                  {errors.senderAge}
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
              value={formData.description}
              onChange={handleChange}
            ></textarea>
            <FileUpload
              className="mt-6"
              fileError={fileError}
              handleFileChange={handleFileChange}
            />
          </>
        )}
      </form>

      {!expandForm ? (
        <button
          className={`${
            !formData.category ? "btn-disabled opacity-50" : ""
          } mt-6 w-full p-4 max-w-screen-md bg-lightblue hover:bg-darkblue text-white font-bold text-xl rounded-lg`}
          onClick={() => setExpandForm(true)}
        >
          <span>Continue</span>
        </button>
      ) : (
        <button
          className="mt-6 w-full p-4 max-w-screen-md bg-lightblue hover:bg-darkblue text-white font-bold text-xl rounded-lg"
          onClick={() => sendReport()}
        >
          <span>Send</span>
        </button>
      )}
    </div>
  );
};

export default CreateReport;
