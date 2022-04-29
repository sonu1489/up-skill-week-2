import React from "react";
import UserData from "./components/userData";
const App: React.FC = () => {
  return (
    <div className="App">
      <h2 style={{ textAlign: "center", fontStyle: "italic" }}>
        Pagination Sorting Searching Filter
      </h2>
      <div>
        <UserData />
      </div>
    </div>
  );
};

export default App;
