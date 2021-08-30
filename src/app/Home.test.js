/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, waitFor } from "@testing-library/react";
import Home from "./Home";

describe('<Home />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = render(<Home />)
    });

    it("displays title", async () => {
        await waitFor(() => wrapper.getByText("Example Video List"));
    });
});