import React from "react";
import { render } from "@testing-library/react";
import Todo from "./Todo"
import { testTodo } from "./_testCommon";

describe("productiv app", function () {
  it("renders without crashing", function () {
    render(<Todo todo={testTodo} />);
  });

  it("contains expected title and description", function () {
    const result = render(<Todo todo={testTodo}/>);
    expect(result.queryByText("hello")).toBeInTheDocument();
    expect(result.queryByText("test")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const { container } = render(<Todo todo={testTodo}/>);
    expect(container).toMatchSnapshot();
  });

});