import api from ".";

const path = "/files";

const FileAPI = {
  deleteFile: (id: number) => api.delete(`${path}/${id}`),
};

export default FileAPI;
