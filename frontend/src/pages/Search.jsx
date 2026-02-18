import { useState } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const demoData = [
    {
      title: "Environmental Studies Notes",
      description: "Comprehensive notes covering climate change and sustainability.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      title: "Research Paper on Environment",
      description: "Detailed research on environmental conservation strategies.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    },
    {
      title: "Sustainable Development PDF",
      description: "Study material on sustainable development goals.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    }
  ];

  const handleSearch = () => {
    setLoading(true);

    setTimeout(() => {
      const filtered = demoData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 1200); // fake AI delay
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>
      <h2>Search Resources</h2>

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Search resources..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            marginLeft: "10px",
            backgroundColor: "#1d72b8",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer"
          }}
        >
          Search
        </button>
      </div>

      {loading && <p style={{ marginTop: "20px" }}>🔍 AI is analyzing...</p>}

      <div style={{ marginTop: "30px" }}>
        {results.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "20px",
              margin: "10px auto",
              width: "400px",
              borderRadius: "10px",
              boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
            }}
          >
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <a
              href={item.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                marginTop: "10px",
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "8px 15px",
                borderRadius: "6px",
                textDecoration: "none"
              }}
            >
              📄 Preview PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
