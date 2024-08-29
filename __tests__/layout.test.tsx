import { render } from "@testing-library/react";
import RootLayout from "@/app/layout"; // Adjust the import path as needed

describe("RootLayout", () => {
  it("renders the html element with the correct lang attribute", () => {
    const { container } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    const htmlElement = container.querySelector("html");
    expect(htmlElement).toHaveAttribute("lang", "en");
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <RootLayout>
        <div>Test Content</div>
      </RootLayout>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
