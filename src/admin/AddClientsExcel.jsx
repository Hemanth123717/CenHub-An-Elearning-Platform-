// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import './css/AddClientExcel.css'; // Ensure your CSS is imported

// const AddClientsExcel = () => {
//   const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
//   const [loading, setLoading] = useState(false);
//   const [progress, setProgress] = useState(0);

//   const handleFileUpload = async (event) => {
//     const file = event.target.files[0];
//     if (!file) return;

//     setLoading(true);
//     setProgress(0);

//     const reader = new FileReader();

//     reader.onload = async (e) => {
//       const data = new Uint8Array(e.target.result);
//       const workbook = XLSX.read(data, { type: 'array' });

//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];

//       const jsonData = XLSX.utils.sheet_to_json(worksheet);

//       // Optional: Transform Excel keys to match API if needed
//       const transformedData = jsonData.map((row) => ({
//         name: row.name || '',
//         mailId: row.mailId || '',
//         password: row.password || '',
//         cenId: row.cenId || 0,
//         contactNo: row.contactNo || '',
//         totalMarks: row.totalMarks || 0,
//       }));

//       const total = transformedData.length;

//       for (let i = 0; i < total; i++) {
//         try {
//           await fetch(`${clientApiUrl}/api/public/client/addClient`, {
//             method: 'POST',
//             headers: {
//               "Authorization": `Bearer ${localStorage.getItem("token")}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(transformedData[i]),
//           });
//         } catch (err) {
//           console.error(`Error sending row ${i}:`, err);
//         }

//         setProgress(Math.round(((i + 1) / total) * 100));
//       }

//       setLoading(false);
//       alert('Upload completed');
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <h2>Upload Client Excel</h2>
//       <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />

//       {loading && (
//         <div className="loading-overlay">
//           <div>Uploading... {progress}%</div>
//           <div className="progress-bar-container">
//             <div
//               className="progress-bar"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AddClientsExcel;


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './css/AddClientExcel.css';

const AddClientsExcel = () => {
  const clientApiUrl = import.meta.env.VITE_CLIENT_API_URL;
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      // Transform and add status
      const transformedData = jsonData.map((row, index) => ({
        id: index,
        name: row.name || '',
        mailId: row.mailId || '',
        password: row.password || '',
        cenId: row.cenId || 0,
        contactNo: row.contactNo || '',
        totalMarks: row.totalMarks || 0,
        status: 'Pending',
      }));

      setRows(transformedData);
    };

    reader.readAsArrayBuffer(file);
  };

  const uploadRow = async (rowIndex) => {
    const row = rows[rowIndex];
    try {
      const res = await fetch(`${clientApiUrl}/api/public/client/clientSignUp`, {
        method: 'POST',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(row),
      });

      const updatedRows = [...rows];
      if (res.ok) {
        updatedRows[rowIndex].status = 'Uploaded';
      } else {
        updatedRows[rowIndex].status = 'Failed';
      }
      setRows(updatedRows);
    } catch (err) {
      console.error(err);
      const updatedRows = [...rows];
      updatedRows[rowIndex].status = 'Error';
      setRows(updatedRows);
    }
  };

  const handleUploadAll = async () => {
    setLoading(true);
    for (let i = 0; i < rows.length; i++) {
      await uploadRow(i);
      setProgress(Math.round(((i + 1) / rows.length) * 100));
    }
    setLoading(false);
  };

  const handleFieldChange = (e, rowIndex, field) => {
    const updatedRows = [...rows];
    updatedRows[rowIndex][field] = e.target.value;
    setRows(updatedRows);
  };

  return (
    <div className="excel-upload-container">
      <h2>Upload Client Excel</h2>
      <input type="file" accept=".xlsx, .xls, .csv" onChange={handleFileUpload} />

      {
        rows.length == 0 && (
          <>
            <h3>Format</h3>
            <table className="excel-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Mail ID</th>
                  <th>Password</th>
                  <th>Cen ID</th>
                  <th>Contact No</th>
                  {/* <th>Total Marks</th> */}
                </tr>
              </thead>
            </table>
          </>
        )
      }

      {rows.length > 0 && (
        <>
          <table className="excel-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mail ID</th>
                <th>Password</th>
                <th>Cen ID</th>
                <th>Contact No</th>
                {/* <th>Total Marks</th> */}
                <th>Status</th>
                <th>Upload</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={index}>
                  <td>
                    <input
                      value={row.name}
                      onChange={(e) => handleFieldChange(e, index, 'name')}
                    />
                  </td>
                  <td>
                    <input
                      value={row.mailId}
                      onChange={(e) => handleFieldChange(e, index, 'mailId')}
                    />
                  </td>
                  <td>
                    <input
                      value={row.password}
                      onChange={(e) => handleFieldChange(e, index, 'password')}
                    />
                  </td>
                  <td>
                    <input
                      value={row.cenId}
                      onChange={(e) => handleFieldChange(e, index, 'cenId')}
                    />
                  </td>
                  <td>
                    <input
                      value={row.contactNo}
                      onChange={(e) => handleFieldChange(e, index, 'contactNo')}
                    />
                  </td>
                  {/* <td>
                    <input
                      value={row.totalMarks}
                      onChange={(e) => handleFieldChange(e, index, 'totalMarks')}
                    />
                  </td> */}
                  <td>{row.status}</td>
                  <td>
                    <button onClick={() => uploadRow(index)}>Upload</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="upload-all-btn" onClick={handleUploadAll}>
            Upload All
          </button>

          {loading && (
            <div className="loading-overlay">
              <div>Uploading... {progress}%</div>
              <div className="progress-bar-container">
                <div
                  className="progress-bar"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AddClientsExcel;
