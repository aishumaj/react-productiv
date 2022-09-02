import React from "react";
import { render } from "@testing-library/react";
import Footer from "./Footer";

describe("footer renders", function () {
  it("renders without crashing", function () {
    render(<Footer />);
  });

  it("contains expected phrase", function () {
    const result = render(<Footer />);
    expect(result.queryByText("Prødutïv is copyright ©2020 by Flüffy Data Enterprises, Inc.")).toBeInTheDocument();
  });

  test("matches snapshot", function () {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
  
});