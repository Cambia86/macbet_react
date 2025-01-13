import React, { useState } from "react";
import PrevisionList from  './previsionList';
import MultiplaStatistica from './multiplaStatistica'
import CreaPrevisione from './creaPrevisione'

function Tabs() {
  const [activeTab, setActiveTab] = useState(0); // Stato per tracciare il tab attivo

  // Contenuti per ogni tab
  const tabContent = [
    { title: "Prevision List", content:  <PrevisionList />},
    { title: "Mult. Statistiche", content: <MultiplaStatistica />},
    { title: "Crea Previsione", content: <CreaPrevisione />},
  ];

  return (
    <div>
      {/* Header delle Tab */}
      <div style={styles.tabHeader}>
        {tabContent.map((tab, index) => (
          <button
            key={index}
            style={{
              ...styles.tabButton,
              ...(activeTab === index ? styles.activeTab : {}),
            }}
            onClick={() => setActiveTab(index)} // Cambia tab attiva
          >
            {tab.title}
          </button>
        ))}
      </div>

       {/* Contenuto della Tab */}
       <div style={styles.tabContent}>
        <p>{tabContent[activeTab].content}</p>
      </div>
    </div>
  );
}

// Stili inline per l'esempio
const styles = {
  tabHeader: {
    display: "flex",
    borderBottom: "2px solid #ccc",
  },
  tabButton: {
    padding: "10px 20px",
    cursor: "pointer",
    backgroundColor: "#f1f1f1",
    border: "none",
    borderBottom: "2px solid transparent",
    outline: "none",
  },
  activeTab: {
    borderBottom: "2px solid #007bff",
    fontWeight: "bold",
  },
  tabContent: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
};

export default Tabs;