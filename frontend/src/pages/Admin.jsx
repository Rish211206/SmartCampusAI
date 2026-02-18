import { useState } from "react";
import API from "../Api";

function Admin() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);

    await API.post("/upload", formData);

    alert("Uploaded Successfully!");
  };

  return (
    <div>
      <h2>Upload PDF</h2>

      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default Admin;
