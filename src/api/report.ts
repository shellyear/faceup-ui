import api from ".";

export type Report = Omit<ReportData, "files"> & {
  id: number;
  files: {
    id: number;
    fileName: string;
    fileType: string;
    downloadLink: string;
  }[];
};

export type ReportData = {
  category: string;
  senderName: string;
  senderAge: number;
  description: string;
  files: File[];
};

const path = "/reports";

const ReportAPI = {
  getReports: () => api.get<Report[]>(path),
  getReportById: (id: number) => api.get<Report>(`${path}/${id}`),
  createReport: (data: ReportData) => {
    const formData = new FormData();
    console.log({ data });
    formData.append("category", data.category);
    formData.append("senderName", data.senderName);
    formData.append("senderAge", String(data.senderAge));
    formData.append("description", data.description);

    if (data.files) {
      data.files.forEach((file) => {
        formData.append("files", file);
      });
    }
    return api.post<Report>(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  updateReport: (id: number, data: Omit<Report, "files">) =>
    api.put<Report>(`${path}/${id}`, data),
  deleteReport: (id: string) => api.delete(`${path}/${id}`),
};

export default ReportAPI;
