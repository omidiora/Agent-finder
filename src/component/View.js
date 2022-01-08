import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { data } from "../data";
import { MDBCol } from "mdbreact";
import { filter } from "lodash";
import SearchInput, { createFilter } from "react-search-input";
import axios from "axios";
import CurrentLocation from "react-current-location-address";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const KEYS_TO_FILTERS = ["name", "state", "year"];


const View = () => {
  const [values, setValue] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState([]);

  

 
  useEffect(() => {
    setValue(data);
    axios
      .get("https://nigerian-states-info.herokuapp.com/api/v1/states")
      .then(function (response) {
        setState(response.data.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  const detailValues = data.filter(createFilter(searchTerm, KEYS_TO_FILTERS));
  console.log(detailValues, "filter");

  return (
    <div className="mt-4">
      <MDBCol md="6" className="mt-4 mb-4" style={{ alignItems: "center" }}>
        <div
          style={{ border: 1, borderColor: "green !important" }}
          className="offset-2"
        >
          <input
            type="text"
            class="form-control"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search"
          />
        </div>
      </MDBCol>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th> Name</th>
            <th>State</th>
            <th>Year </th>
          </tr>
        </thead>
        <tbody>
          {detailValues.map((value) => {
            return (
              <tr>
                <td>{value.name}</td>
                <td>{value.state}</td>
                <td>{value.year}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      
    </div>
  );
};

export default View;
