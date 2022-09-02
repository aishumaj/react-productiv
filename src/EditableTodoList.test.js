import React from "react";
import { fireEvent, render } from "@testing-library/react";
import EditableTodoList from "./EditableTodoList";
import { testTodos } from "./_testCommon";

let mock = jest.fn();

describe("EditableTodoList app", function () {
  it("renders without crashing", function () {
    render(<EditableTodoList todos={testTodos} update={mock} remove={mock} />);
  });

  it("displays editable todo list", function () {
    const result =
      render(<EditableTodoList todos={testTodos} update={mock} remove={mock} />);

    expect(result.queryByText("test")).toBeInTheDocument();
    expect(result.queryByText("test2")).toBeInTheDocument();
    expect(result.queryByText("test3")).toBeInTheDocument();
    expect(result.container.querySelectorAll(".EditableTodo-toggle").length).toEqual(3);
    expect(result.container.querySelectorAll(".EditableTodo-delBtn").length).toEqual(3);
  });

  it("displays editable form when edit clicked", function () {
    const { container } =
      render(<EditableTodoList todos={testTodos} update={mock} remove={mock} />);
    const editBtn = container.querySelector(".EditableTodo-toggle");

    fireEvent.click(editBtn);
    expect(editBtn).not.toBeInTheDocument();
    expect(container.querySelectorAll(".EditableTodo-toggle").length).toEqual(2);
    expect(container.querySelector(".NewTodoForm")).toBeInTheDocument();
    expect(container.querySelector("#newTodo-title")).toContainHTML("hello");
  });

  test("matches snapshot", function () {
    const { container } =
      render(<EditableTodoList todos={testTodos} update={mock} remove={mock} />);
    expect(container).toMatchSnapshot();
  });

});