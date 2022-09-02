import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoApp from "./TodoApp";
import { testTodos } from "./_testCommon";

// const testTodos = [{id:1, title:"hello", description: "test", priority:2},
//   {id:1, title:"top priority", description: "test2", priority:1},
//   {id:1, title:"hello", description: "test3", priority:3}]

describe("TodoApp", function () {
  it("renders without crashing", function () {
    render(<TodoApp initialTodos={testTodos}/>);
  });

  it("displays editable todo list", function () {
    const result =
      render(<TodoApp initialTodos={testTodos}/>)

    expect(result.queryByText("test")).toBeInTheDocument();
    expect(result.queryAllByText("test2").length).toEqual(2);
    expect(result.queryByText("test3")).toBeInTheDocument();
    expect(result.container.querySelector(".EditableTodo-toggle")).toBeInTheDocument();
    expect(result.container.querySelector(".EditableTodo-delBtn")).toBeInTheDocument();
  });

  it("displays add form and top priority", function () {
    const { container } =
      render(<TodoApp initialTodos={testTodos}/>)

    expect(container.querySelector(".mb-3")).toBeInTheDocument();
    expect(container.querySelector(".mb-4")).toContainHTML("top priority");
  });

  it("displays no to dos", function () {
    const { container } =
      render(<TodoApp initialTodos={[]}/>)

    expect(container.querySelector(".text-muted")).toContainHTML("You have no todos.");
  });

  test("matches snapshot", function () {
    const { container } = render(<TodoApp initialTodos={testTodos}/>);
    expect(container).toMatchSnapshot();
  });


});