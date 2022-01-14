import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react'
import Users from './users';
import  { getUsers } from '../api/APIsiit';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../api/APIsiit')

const user = [{
    avatar_url: "https://eu.ui-avatars.com/api/?name=Chalom Malka",
    id: 1,
    name: "Chalom Malka",
    position: "CEO",
    service_ids: [1, 2, 3, 4, 5, 7]
}]

describe("Users", () => {
    it("Loades users on mount", async () => {
        getUsers.mockResolvedValueOnce(user)
        await act(async () => render(<Users />));
        await waitFor(() => expect(screen.getByText("Chalom Malka")).toBeInTheDocument());
    })
})