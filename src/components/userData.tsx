import React, { useState, useEffect } from "react";
import axios from "axios";
import "./table.css";
import Form from "./Form";
import Table from "./Table";
import { User } from "./types";

const UserData = () => {
  const [data, setData] = useState<User[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [sortValue, setSortValue] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageLimit] = useState<number>(4);
  const [sortFilterValue, setSortFilterValue] = useState<string>("");
  const [operation, setOperation] = useState<string>("");

  const sortOption = ["name", "address", "email", "status"];

  useEffect(() => {
    loadUsersData(0, 4, 0);
  }, []);

  const loadUsersData = async (
    start: number,
    end: number,
    increase: number,
    optType?: string | null,
    filterOrSortValue?: string
  ) => {
    switch (optType) {
      case "search":
        setOperation(optType);
        setSortValue("");
        return await axios
          .get(
            `http://localhost:5000/users?q=${inputValue}&_start=${start}&_end=${end}`
          )
          .then((res) => {
            setData(res.data);
            setCurrentPage(currentPage + increase);
          })

          .catch((e) => console.log(e));
      case "sort":
        setOperation(optType);
        if (filterOrSortValue) setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:5000/users?_sort=${filterOrSortValue}&_order=asc&_start=${start}&_end=${end}`
          )
          .then((res) => {
            setData(res.data);
            setCurrentPage(currentPage + increase);
          })
          .catch((e) => console.log(e));
      case "filter":
        setOperation(optType);
        if (filterOrSortValue) setSortFilterValue(filterOrSortValue);
        return await axios
          .get(
            `http://localhost:5000/users?status=${filterOrSortValue}&_start=${start}&_end=${end}`
          )
          .then((res) => {
            setData(res.data);
            setCurrentPage(currentPage + increase);
            console.log(currentPage);
          })
          .catch((e) => console.log(e));

      default:
        return await axios
          .get(`http://localhost:5000/users?_start=${start}&_end=${end}`)
          .then((res) => {
            setData(res.data);
            setCurrentPage(currentPage + increase);
          });
    }
  };

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    loadUsersData(0, 4, 0, "search");
  };
  const handleReset = () => {
    setOperation("");
    setInputValue("");
    setSortFilterValue("");
    setSortValue("");
    loadUsersData(0, 4, 0);
  };
  const handleSort = async (e) => {
    let value = e.target.value;
    setSortValue(value);
    loadUsersData(0, 4, 0, "sort", value);
  };
  const handleFilter = async (value: string) => {
    loadUsersData(0, 4, 0, "filter", value);
  };

  const renderPagination = () => {
    if (data.length < 4 && currentPage === 0) return null;
    if (currentPage === 0) {
      return (
        <div className="flex">
          <p>1</p>
          <button
            className="next"
            onClick={() => loadUsersData(4, 8, 1, operation, sortFilterValue)}
          >
            Next
          </button>
        </div>
      );
    } else if (currentPage < pageLimit - 1 && data.length === pageLimit) {
      return (
        <div className="flex">
          <button
            className="next"
            onClick={() =>
              loadUsersData(
                (currentPage - 1) * 4,
                currentPage * 4,
                -1,
                operation,
                sortFilterValue
              )
            }
          >
            Prev
          </button>
          <p>{currentPage + 1}</p>
          <button
            className="next"
            onClick={() =>
              loadUsersData(
                (currentPage + 1) * 4,
                (currentPage + 2) * 4,
                1,
                operation,
                sortFilterValue
              )
            }
          >
            Next
          </button>
        </div>
      );
    } else {
      return (
        <div className="flex">
          <button
            className="next"
            onClick={() =>
              loadUsersData(
                (currentPage - 1) * 4,
                currentPage * 4,
                -1,
                operation,
                sortFilterValue
              )
            }
          >
            Prev
          </button>
          <p>{currentPage + 1}</p>
        </div>
      );
    }
  };

  return (
    <div>
      <div className="form-container">
        <Form
          handleReset={handleReset}
          handleSearch={handleSearch}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <Table data={data} />

      <div>{renderPagination()}</div>

      <div className="filter-sort">
        <div>
          <h3>Sort By:</h3>
          <select className="input" onChange={handleSort} value={sortValue}>
            <option>Please Select Value</option>
            {sortOption.map((item: string, index: number) => {
              return (
                <option value={item} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h3>Filter by Status:</h3>
          <button className="search" onClick={() => handleFilter("Active")}>
            Active
          </button>
          <button className="reset" onClick={() => handleFilter("InActive")}>
            InActive
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserData;
