import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/components/board/Board", () => ({
  __esModule: true,
  default: () => <div>BoardSection component</div>,
}));

describe("Home component", () => {
  it("renders correctly", () => {
    render(<Home />);
    expect(screen.getByText("Task Management Board")).toBeInTheDocument();
    expect(screen.getByText("BoardSection component")).toBeInTheDocument();
  });
});
