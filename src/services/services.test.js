import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react'
import getData from '../api/APIsiit';
import '@testing-library/jest-dom/extend-expect';
import Services from './services';

jest.mock('../api/APIsiit')

const service = [{
    id: 1,
    name: "Google",
    website_url: "https://www.google.com/",
    logo_url: "https://cdn.iconscout.com/icon/free/png-256/google-160-189824.png",
    price: {
        cost_per_user: 5,
        flat_cost: 0,
        nb_users_included: 0
    }
}]

describe("Fetch services from the API", () => {
    it("Loads Services on mount", async () => {
        getData.mockResolvedValueOnce(service)
        await act(async () => render(<Services />));
        await waitFor(() => expect(screen.getByText("Google")).toBeInTheDocument());
    })
})