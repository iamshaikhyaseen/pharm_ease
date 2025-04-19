import React, { createContext, useState, useEffect } from 'react';

// Create a Context for Medical Data
export const MedicalContext = createContext();

// Create a Provider component
export const MedicalProvider = ({ children }) => {
  const [medicalData, setMedicalData] = useState(
    JSON.parse(sessionStorage.getItem('medicalData')) ||
    null);  // Medical data state

    useEffect(() => {
      if (medicalData) {
        sessionStorage.setItem('medicalData', JSON.stringify(medicalData));
      }
    }, [medicalData]);

  return (
    <MedicalContext.Provider value={{ medicalData, setMedicalData }}>
      {children}
    </MedicalContext.Provider>
  );
};
