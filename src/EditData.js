import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const EditData = (props) => {
  const [description, setDescription] = useState("");

  useEffect(() => {
      setDescription(props.item.Description)
  }, [props]);

  const onSubmit = (e) => {
    e.preventDefault();
    var newItem = props.item
    newItem.Description = description
    props.onUpdate(newItem);
  };

  return (
    <Form onSubmit={onSubmit}>

      <Form.Group controlId="formBasicEdit">
        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" block>Submit</Button>
    </Form>
  );
};

export default EditData;

