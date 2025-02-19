import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Editor, EditorState, RichUtils } from "draft-js";
import "draft-js/dist/Draft.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../userSlice";
import { nanoid } from "@reduxjs/toolkit";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UserDashboard = () => {
  // Counter State
  const [count, setCount] = useState(0);

  // Rich Text Editor State
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (blockType) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // user Data

  const dispatch = useDispatch();
  const savedUser = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    id: nanoid(),
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue =
          "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (savedData) {
      setFormData(savedData);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    localStorage.setItem("userData", JSON.stringify(formData));
    alert("Data saved successfully!");
    setIsDirty(false);
  };

  return (
    <div>
      <header className="m-5">
        <h1>User Dashboard</h1>
      </header>

      <section>
        <Container className="my-5">
          <Row>
            <Col className="first">
              <div className="card text-center my-5">
                <div className="card-body">
                  <h3>Counter</h3>
                  <div className="my-5">
                    <h1 className="my-5">{count}</h1>
                    <button
                      className=" m-3 btn btn-success"
                      onClick={() => setCount(count + 1)}
                    >
                      +
                    </button>
                    <button
                      className=" m-3 btn btn-primary"
                      onClick={() => setCount(0)}
                    >
                      Reset
                    </button>

                    <button
                      className=" m-3 btn btn-danger"
                      onClick={() => setCount(count - 1)}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            </Col>
            <Col className="second">
              <div className="card text-center my-5">
                <div className="card-body">
                  <h3>Rich Text Editiors</h3>
                  <div className="my-5">
                    <button
                      className=" m-1 btn btn-secondary"
                      onClick={() => toggleInlineStyle("BOLD")}
                    >
                      Bold
                    </button>
                    <button
                      className="m-1 btn btn-secondary"
                      onClick={() => toggleInlineStyle("ITALIC")}
                    >
                      Italic
                    </button>
                    <button
                      className=" m-3 btn btn-secondary"
                      onClick={() => toggleInlineStyle("UNDERLINE")}
                    >
                      Underline
                    </button>
                    <button
                      className=" m-1 btn btn-secondary"
                      onClick={() => toggleBlockType("unordered-list-item")}
                    >
                      Lists
                    </button>
                  </div>
                </div>
                <div className="editorbox">
                  <Editor
                    editorState={editorState}
                    handleKeyCommand={handleKeyCommand}
                    onChange={setEditorState}
                    placeholder="Start typing..."
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container fluid="md" className="my-5">
          <Row>
            <Col className="userData">
              <div className="card text-center my-5">
                <div className="card-body">
                  <h3>User Data Form</h3>
                  <div>
                    <Form onSubmit={handleSubmit}>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom01"
                        >
                          <Form.Label className="formlabel">Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            onChange={handleChange}
                            className="formcontrol"
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom02"
                        >
                          <Form.Label className="formlabel">Address</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Address"
                            onChange={handleChange}
                            className="formcontrol"
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom03"
                        >
                          <Form.Label className="formlabel">Email</Form.Label>
                          <Form.Control
                            required
                            type="email"
                            placeholder="Email"
                            onChange={handleChange}
                            className="formcontrol"
                          />
                        </Form.Group>
                        <Form.Group
                          as={Col}
                          md="6"
                          controlId="validationCustom04"
                        >
                          <Form.Label className="formlabel">Phone</Form.Label>
                          <Form.Control
                            required
                            type="tel"
                            placeholder="Phone"
                            onChange={handleChange}
                            className="formcontrol"
                          />
                        </Form.Group>
                      </Row>
                      <Button type="submit" className="m-5">
                        Save
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default UserDashboard;
