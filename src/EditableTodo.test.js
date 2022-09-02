import React from "react";
import { render } from "@testing-library/react";
import EditableTodo from "./EditableTodo"

const testTodo = {id:1, title:"hello", description: "test", priority:1}

// describe("productiv app", function () {
//   it("renders without crashing", function () {
//     render(<EditableTodo todo={testTodo} />);
//   });

//   it("contains expected title and description", function () {
//     const result = render(<EditableTodo todos={testTodos}/>);
//     expect(result.queryByText("top priority")).toBeInTheDocument();
//     expect(result.queryByText("test2")).toBeInTheDocument();
//   });
  
//   test("matches snapshot", function () {
//     const { container } = render(<EditableTodo todos={testTodos}/>);
//     expect(container).toMatchSnapshot();
//   });
  
// });