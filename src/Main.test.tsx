import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import Main from "./components/Main";
import type { Country } from "./types";
import BookMarks from "./BookMarks";

const mockCountry = {
  name: "France",
  population: 67000000,
  region: "Europe",
  capital: "Paris",
  flags: {
    png: "flag.png",
    svg: "flag.svg",
  },
} as Country;

describe("Main", () => {
  it("renders a country card", () => {
    render(
      <MemoryRouter>
        <Main
          data={[mockCountry]}
          searchTerm=""
          searchRegion=""
          setSearchTerm={vi.fn()}
          setSearchRegion={vi.fn()}
          list={[]}
          setList={vi.fn()}
          favorite={[]}
          setFavorite={vi.fn()}
        />
      </MemoryRouter>,
    );

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText(/Population:/i)).toBeInTheDocument();
    expect(screen.getByText(/Region:/i)).toBeInTheDocument();
    expect(screen.getByText(/Capital:/i)).toBeInTheDocument();
  });
});

describe("Main", () => {
  it("renders a country card", () => {
    render(
      <MemoryRouter>
        <BookMarks list={[mockCountry]} setList={vi.fn()} />
      </MemoryRouter>,
    );

    expect(screen.getByText("France")).toBeInTheDocument();
    expect(screen.getByText(/Population:/i)).toBeInTheDocument();
    expect(screen.getByText(/Region:/i)).toBeInTheDocument();
    expect(screen.getByText(/Capital:/i)).toBeInTheDocument();
  });
});
