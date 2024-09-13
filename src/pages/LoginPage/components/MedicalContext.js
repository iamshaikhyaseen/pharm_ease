import React, { createContext, useState } from 'react';

// Create a Context for Medical Data
export const MedicalContext = createContext();

// Create a Provider component
export const MedicalProvider = ({ children }) => {
  const [medicalData, setMedicalData] = useState(null);  // Medical data state

  const setMedical = (data) => {
    setMedicalData(data);
  };

  return (
    <MedicalContext.Provider value={{ medicalData, setMedical }}>
      {children}
    </MedicalContext.Provider>
  );
};
