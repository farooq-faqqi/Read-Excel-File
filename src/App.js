import "./App.css";
import * as XLSX from "xlsx";
import { useState } from "react";
import Data from "./components/Data";

function App() {
  const [excelFile, setExcelFile] = useState(null);
  const [excelFileError, setExcelFileError] = useState(null);
  //On Submit
  const [excelData, setExcelData] = useState([]);

  let fileType = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      console.log(selectedFile.type);
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFileError(null);
          setExcelFile(e.target.result);
          console.log(selectedFile);
        };
      } else {
        setExcelFileError("Please Select only Excel file");
        setExcelFile([]);
      }
    } else {
      console.log("Please Select a File");
    }
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    } else {
      setExcelData(null);
    }
  };

  return (
    <div className="container">
      <div className="form">
        <form className="form-group" onSubmit={handleSubmit} autoComplete="off">
          <label>Upload your Files</label>
          <br />
          <br />
          <input
            type="file"
            className="form-control"
            onChange={handleFile}
            required
          ></input>
          {excelFileError && (
            <div className="text-danger">{excelFileError}</div>
          )}
          <br />
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </form>
      </div>
      <br />
      <hr />
      {/* View File Section */}

      <div className="viewer">
        {excelFile === null && <>No Files Selected</>}
        {excelFile !== null && (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <th scope="col">DEPTID</th>
                <th scope="col">EMPID</th>
                <th scope="col">NAME</th>
                <th scope="col">BONUS</th>
                {/* <th scope="col">Region</th>
                <th scope="col">InsuredValue</th>
                <th scope="col">Construction</th>
                <th scope="col">BusinessType</th>
                <th scope="col">Earthquake</th>
                <th scope="col">Flood</th> */}
              </thead>
              <tbody>
                <Data excelData={excelData} />
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
