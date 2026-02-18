import { useState } from "react";
import API from "../Api";

function Admin() {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    fileType: ""
  });

  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", form.title);
      formData.append("summary", form.summary);
      formData.append("fileType", form.fileType);

      await API.post("/upload", formData);

      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        setForm({ title: "", summary: "", fileType: "" });
        setFile(null);
      }, 2000);
    } catch (error) {
      alert("Upload Failed ❌");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Admin Upload Panel</h2>
        <p style={styles.subtitle}>
          Upload academic resources to Smart Campus AI
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Resource Title"
            value={form.title}
            required
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            style={styles.input}
          />

          <textarea
            placeholder="Short Summary"
            value={form.summary}
            required
            onChange={(e) =>
              setForm({ ...form, summary: e.target.value })
            }
            style={styles.textarea}
          />

          <select
            value={form.fileType}
            required
            onChange={(e) =>
              setForm({ ...form, fileType: e.target.value })
            }
            style={styles.select}
          >
            <option value="">Select File Type</option>
            <option value="PDF">PDF</option>
            <option value="Notes">Notes</option>
            <option value="Research Paper">Research Paper</option>
            <option value="Presentation">Presentation</option>
          </select>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            style={styles.fileInput}
          />

          <button type="submit" style={styles.button}>
            {loading ? "Uploading..." : "Upload Resource"}
          </button>

          {success && (
            <p style={styles.success}>
              ✅ Resource Uploaded Successfully!
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "90vh",
    backgroundColor: "#f4f8ff",
    padding: "40px"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 15px 40px rgba(0,0,0,0.08)",
    width: "450px"
  },
  subtitle: {
    marginBottom: "25px",
    color: "#666"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  input: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },
  textarea: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    minHeight: "90px",
    resize: "none"
  },
  select: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  },
  fileInput: {
    padding: "8px"
  },
  button: {
    padding: "12px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "500"
  },
  success: {
    marginTop: "10px",
    color: "green",
    fontWeight: "500"
  }
};

export default Admin;
