import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addTodoRequest } from "./thunks";
import "./NewTodoForm.css";

const NewTodoForm = ({ todos, onCreatePressed }) => {
  const [values, setValues] = useState({
    title: "",
    subtitle: "",
    description: "",
    review_rate: "",
    image: "",
    review_comment: "",
    formData: "",
    review_app_user_id: 1,
  });
  useEffect(() => {
    setValues({
      ...values,
      formData: new FormData(),
    });
  }, []);

  const {
    title,
    subtitle,
    image,
    description,
    review_app_user_id,
    review_rate,
    review_comment,
    formData,
  } = values;

  const handleChange = (name) => (event) => {
    const value = name === "image" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };
  const clickSubmit = (event) => {
    event.preventDefault();
    onCreatePressed(values);
  };
  return (
    <form className="mb-3" onSubmit={clickSubmit}>
      <div className="new-todo-form">
        <input
          className="new-todo-input"
          type="file"
          onChange={handleChange("image")}
          placeholder="Image"
          name="image"
          accept="image/*"
        />
        <input
          className="new-todo-input"
          type="text"
          name="title"
          placeholder="Title"
          value={title}
          onChange={handleChange("title")}
        />
        <input
          className="new-todo-input"
          type="text"
          placeholder="subtitle"
          name="subtitle"
          value={subtitle}
          onChange={handleChange("subtitle")}
        />
        <input
          className="new-todo-input"
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleChange("description")}
        />
        <input
          className="new-todo-input"
          type="hidden"
          placeholder="review_app_user_id"
          name="review_app_user_id"
          value="1"
        />
        <input
          className="new-todo-input"
          type="text"
          placeholder="review comment"
          name="review_comment"
          value={review_comment}
          onChange={handleChange("review_comment")}
        />
        <input
          className="new-todo-input"
          type="text"
          placeholder="review Rate"
          name="review_rate"
          value={review_rate}
          onChange={handleChange("review_rate")}
        />
        <button className="new-todo-button">Create Todo</button>
      </div>
    </form>
  );
};

const mapStateToProps = (state) => ({
  todos: state.todos,
});

const mapDispatchToProps = (dispatch) => ({
  onCreatePressed: (text) => dispatch(addTodoRequest(text)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewTodoForm);
