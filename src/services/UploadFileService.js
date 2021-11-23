import http from "../http-common";

class UploadFileService {
    upload(file, onUploadProgress) {
        let formData = new FormData();
        formData.append("file", file);
        return http.post("/api/v1/file/upload-file", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress
        });
    }

    getFiles() {
        return http.get("/api/v1/file/files");
    }
}

export default new UploadFileService();