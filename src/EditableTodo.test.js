import React from "react";
import { fireEvent, render } from "@testing-library/react";
import EditableTodo from "./EditableTodo";
import { testTodo } from "./_testCommon";


let mock = jest.fn();

describe("EditableTodo app", function () {
  it("renders without crashing", function () {
    render(<EditableTodo todo={testTodo} update={mock} remove={mock}/>);
  });

  it("displays editable todo list", function () {
    const result =
      render(<EditableTodo todo={testTodo} update={mock} remove={mock}/>)

    expect(result.queryByText("hello")).toBeInTheDocument();
    expect(result.queryByText("test")).toBeInTheDocument();
    expect(result.container.querySelector(".EditableTodo-toggle")).toBeInTheDocument();
    expect(result.container.querySelector(".EditableTodo-delBtn")).toBeInTheDocument();
  });

  it("displays editable form when edit clicked", function () {
    const { container } =
      render(<EditableTodo todo={testTodo} update={mock} remove={mock}/>)
    const editBtn = container.querySelector(".EditableTodo-toggle");

    fireEvent.click(editBtn);
    expect(editBtn).not.toBeInTheDocument();
    expect(container.querySelector(".EditableTodo-delBtn")).not.toBeInTheDocument();
    expect(container.querySelector(".NewTodoForm")).toBeInTheDocument();
    expect(container.querySelector("#newTodo-title")).toContainHTML("hello");
  });

  test("matches snapshot", function () {
    const { container } = render(<EditableTodo todo={testTodo} update={mock} remove={mock}/>);
    expect(container).toMatchSnapshot();
  });


});