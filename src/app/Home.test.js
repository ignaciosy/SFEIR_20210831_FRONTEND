/**
 * @jest-environment jsdom
 */
import React from "react";
import 'regenerator-runtime/runtime'
import faker from 'faker';
import { render, waitFor } from "@testing-library/react";
import { MockedProvider } from '@apollo/client/testing';
import Home from "./Home";
import { FETCH_CATEGORIES } from "./home/graphql";

describe('<Home />', () => {
    let wrapper;
    let mocks;

    const categoryMock = {
        id: '1',
        name: faker.company.companyName(),
        videos: [
            {
                id: '1',
                title: faker.name.jobTitle(),
                url: faker.image.imageUrl()
            }
        ]
    };

    mocks = [
        {
            request: {
                query: FETCH_CATEGORIES,
                variables: {}
            },
            result: {
                data: {
                    categoryResolver: [categoryMock]
                }
            }
        }
    ];

    beforeEach(() => {
        wrapper = render(
            <MockedProvider mocks={mocks} addTypename={false}>
                <Home />
            </MockedProvider>
        )
    });

    describe("when still loading data", () => {
        it("displays loading wheel", async () => {
            await waitFor(() => wrapper.getByTestId("loading wheel"));
        });
    });

    describe("when data is successfully loaded", () => {
        it("renders correctly", async () => {
            // it display the title
            await waitFor(() => wrapper.getByText("Example Video List"));

            // it displays categories
            wrapper.getByText(categoryMock.name);

            // it displays videos
            categoryMock.videos.map(video => {
                wrapper.getByText(video.title);
                wrapper.getByTestId(`video-${video.id}`);
            });
        });
    });
});