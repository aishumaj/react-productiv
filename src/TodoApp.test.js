import React from "react";
import { fireEvent, render } from "@testing-library/react";
import TodoApp from "./TodoApp";
import { testTodos } from "./_testCommon";


/** Convenience method for adding a todo in these tests. */
function create(container, title="This is a new todo", description="adding", priority=2) {
  const titleInput = container.querySelector("[name=title]");
  const descriptionInput = container.querySelector("[name=description]");
  const priorityInput = container.querySelector("[name=priority]");

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(descriptionInput, { target: { value: description } });
  fireEvent.change(priorityInput, { target: { value: priority } });

  const button = container.querySelector(".NewTodoForm-addBtn");
  fireEvent.click(button);
}

function update(container, title="This is updated", description="updating", priority=2) {
  const titleInput = container.querySelector("[name=title]");
  const descriptionInput = container.querySelector("[name=description]");
  const priorityInput = container.querySelector("[name=priority]");

  fireEvent.change(titleInput, { target: { value: title } });
  fireEvent.change(descriptionInput, { target: { value: description } });
  fireEvent.change(priorityInput, { target: { value: priority } });

  const button = container.querySelector(".col-md-6 .NewTodoForm-addBtn");
  fireEvent.click(button);
}



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
  
  
  it("creates a new todo", function () {
    const { container } =
      render(<TodoApp initialTodos={testTodos}/>)
    
    create(container);
    
    const list = container.querySelector(".col-md-6");
    expect(list).toContainHTML("This is a new todo");
  });
  
  it("updates a new todo", function () {
    const { container } =
      render(<TodoApp initialTodos={testTodos}/>)
    
    let editBtn = container.querySelector(".EditableTodo-toggle");
    fireEvent.click(editBtn);
    
    update(container);
    
    const list = container.querySelector(".col-md-6");
    expect(list).toContainHTML("This is updated");
  });
  
  it("deletes a todo", function () {
    const { container } =
      render(<TodoApp initialTodos={testTodos}/>)
    
    let delBtn = container.querySelector(".EditableTodo-delBtn");
    
    fireEvent.click(delBtn);
    
    expect(container.querySelector(".col-md-6")).not.toContainHTML("test");
    
    fireEvent.click(delBtn);
    fireEvent.click(delBtn);
    
    expect(container.querySelector(".text-muted")).toContainHTML("You have no todos.");
    
  });

  test("matches snapshot", function () {
    const { container } = render(<TodoApp initialTodos={testTodos}/>);
    expect(container).toMatchSnapshot();
  });


});