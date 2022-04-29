import React from "react";

const Form = ({ handleReset, handleSearch, inputValue, setInputValue }) => {
  return (
    <form
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
      }}
      onSubmit={handleSearch}
    >
      <input
        type="text"
        placeholder="Search"
        value={inputValue}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInputValue(e.target.value)
        }
      />
      <div className="button">
        <button className="search" type="submit">
          Search
        </button>
        <button className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
    </form>
  );
};

export default Form;
