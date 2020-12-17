import React, { useState, useEffect } from "react";
import { useAuth0 } from "./react-auth0-spa";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";

let footerButtonStyles = {
  marginBottom: '15px',
  padding: '3px 8px',
  cursor: 'pointer',
  borderRadius: '50%',
  border: 'none',
  width: '30px',
  height: '30px',
  fontWeight: 'bold',
  alignSelf: 'flex-end',
  float: 'right'
}

let cardFooterStyles = {
  height: '50px',
}

const Content = () => {
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

  const edit = async (name, description, index) => {
    try {
      const token = await getTokenSilently();
      // Send a POST request to the Go server for the selected product
      // with the vote type
      const response = await fetch(
        `http://localhost:8080/data/${name}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ description: description }),
        }
      );
      // Since this is just for demonstration and we're not actually
      // persisting this data, we'll just set the product vote status here
      // if the product exists
      if (response.ok) {
      } else console.log(response.status);
    } catch (error) {
      console.error(error);
    }
  };

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
                  <div className="card-footer"  style={cardFooterStyles} >
                    {d.Permissions.includes("write") && (
                      <button onClick={() => edit(d.Name, d.Description, index)} style={footerButtonStyles}><AiFillEdit/></button>
                    )}
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

export default Content;