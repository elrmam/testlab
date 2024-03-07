import { render, screen } from "@testing-library/react";
import catsMock from "../../../mocks/cats.json";
import Pets from "../Pets";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from '@testing-library/user-event'

const server = setupServer(
    rest.get("http://localhost:4000/cats", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(catsMock));
    })
);

describe("Test Pets component", () => {
    beforeEach(() => {

        render(<Pets />);
    });
    beforeAll(() => server.listen());


    afterEach(() => server.resetHandlers());


    afterAll(() => server.close());

    test("initial show 5 cats cards", async () => {
        const cards = await screen.findAllByRole("article");
        expect(cards.length).toEqual(5);
    });

    test('should render 3 female cats after filter by femail gender', async () => {
        const cards = await screen.findAllByRole("article");
        userEvent.selectOptions(screen.getByLabelText(/Gender/i), 'female')
        expect(screen.getAllByRole('article').length).toEqual(3)
        expect(screen.getAllByRole('article')).toStrictEqual([cards[0], cards[2], cards[4]])
    })
    test("the number of favoured cats ByLabelText", async () => {
        await screen.findAllByRole("article");
        const favSelect = screen.getByLabelText("Favourite");
        userEvent.selectOptions(favSelect, "favoured");
        const favoredCats = screen.getAllByRole("article");
        expect(favoredCats.length).toEqual(3);
    });
});
