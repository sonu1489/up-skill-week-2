import React from "react";
import { User } from "./types";

const Table = ({ data }) => {
  return (
    <table id="customers">
      <thead>
        <tr>
          <th>No.</th>
          <th>Name</th>
          <th>Email</th>
          <th>Address</th>
          <th>Status</th>
        </tr>
      </thead>

      {data.length === 0 ? (
        <tbody>
          <tr>
            <td colSpan={8}>No data Found</td>
          </tr>
        </tbody>
      ) : (
        data.map((item: User) => (
          <tbody key={item.id}>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.address}</td>
              <td>{item.status}</td>
            </tr>
          </tbody>
        ))
      )}
    </table>
  );
};

export default Table;
