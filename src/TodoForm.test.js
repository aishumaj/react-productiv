import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm"

let mock = jest.fn();

describe("productiv app", function () {
  it("renders without crashing", function () {
    render(<TodoForm handleSave={mock} />);
  });

  it("contains expected form and sections", function () {
    const { container} = render(<TodoForm handleSave={mock}/>);
    expect(container.querySelector(".NewTodoForm")).toBeInTheDocument();
    expect(container.querySelectorAll(".mb-3").length).toEqual(3);
    expect(container.querySelector("button")).toContainHTML("Gø!");
  });
  
  it("matches initial form snapshot", function () {
    const { asFragment } = render(<TodoForm handleSave={mock}/>);
    expect(asFragment()).toMatchSnapshot();
  });
  
  it("matches data-entered snapshot", function () {
    const { container } = render(<TodoForm handleSave={mock}/>);
  
    const titleInput = container.querySelector("[name=title]");
    const descriptionInput = container.querySelector("[name=description]");
    const priorityInput = container.querySelector("[name=priority]");
  
    fireEvent.input(titleInput, { target: { value: "changing" } });
    fireEvent.input(descriptionInput, { target: { value: "description here" } });
    fireEvent.input(priorityInput, { target: { value: "2" } });
  
    expect(container).toMatchSnapshot();
  });
  
  it("submitting form works", function () {
    const { container } = render(<TodoForm handleSave={mock}/>);
  
    const titleInput = container.querySelector("[name=title]");
    const descriptionInput = container.querySelector("[name=description]");
    const priorityInput = container.querySelector("[name=priority]");
  
    fireEvent.input(titleInput, { target: { value: "changing" } });
    fireEvent.input(descriptionInput, { target: { value: "description here" } });
    fireEvent.input(priorityInput, { target: { value: "2" } });
  
    expect(mock).toHaveBeenCalledTimes(0);
  
    fireEvent.click(container.querySelector(".NewTodoForm-addBtn"))
    expect(mock).toHaveBeenCalledTimes(1);
  
    // expect all form inputs to be empty
  
    expect(container.querySelectorAll("input[value='']")).toHaveLength(1);
    expect(container.querySelector("textarea")).toContainHTML("");
  });

});