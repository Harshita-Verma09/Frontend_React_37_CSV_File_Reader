import React, { useState } from "react";
import Papa from "papaparse";

const CsvReader = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: (result) => {
        setData(result.data);
      },
      header: true, // If CSV has headers
      skipEmptyLines: true,
    });
  };

  return (
    <div>
      <h2>CSV File Reader</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      
      {data.length > 0 && (
        <table border="1">
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                {Object.values(row).map((val, i) => (
                  <td key={i}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CsvReader;
