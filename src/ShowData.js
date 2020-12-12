import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";

const ShowData = () => {
  const [data, setData] = useState([]);

  const {
    getTokenSilently,
    loading,
    user,
  } = useAuth0();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = await getTokenSilently();
        // Send a GET request to the server and add the signed in user's
        // access token in the Authorization header
        const response = await fetch("http://localhost:8080/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const responseData = await response.json();

        setData(responseData);
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="jumbotron text-center mt-5">
        <div className="row">
          {data.map(function (d, index) {
            return (
              <div className="col-sm-4" key={index}>
                <div className="card mb-4">
                  <div className="card-header">{d.Name}</div>
                  <div className="card-body">{d.Description}</div>
                  <div className="card-footer">
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowData;