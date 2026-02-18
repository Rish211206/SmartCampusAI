import { useState } from "react";
import { Document, Page } from "react-pdf";
import API from "../Api";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await API.get(`/search?q=${query}`);
    setResults(res.data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {results.map((item) => (
        <div key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <a
            href={`https://your-render-url.onrender.com${item.fileUrl}`}
            target="_blank"
            rel="noreferrer"
          >
            View Full PDF
          </a>

          <Document
            file={`https://your-render-url.onrender.com${item.fileUrl}`}
          >
            <Page pageNumber={1} />
          </Document>
        </div>
      ))}
    </div>
  );
}

export default Search;
