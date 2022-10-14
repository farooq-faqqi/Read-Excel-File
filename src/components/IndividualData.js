import React from "react";

const IndividualData = ({ individualExcelData }) => {
  //   console.log(individualExcelData);
  return (
    <>
      <th>{individualExcelData.DEPTID}</th>
      <th>{individualExcelData.EMPID}</th>
      <th>{individualExcelData.NAME}</th>
      <th>{individualExcelData.BONUS}</th>
      {/* <th>{individualExcelData.Region}</th>
      <th>{individualExcelData.InsuredValue}</th>
      <th>{individualExcelData.Construction}</th>
      <th>{individualExcelData.BusinessType}</th>
      <th>{individualExcelData.Earthquake}</th>
      <th>{individualExcelData.Flood}</th> */}
    </>
  );
};

export default IndividualData;
