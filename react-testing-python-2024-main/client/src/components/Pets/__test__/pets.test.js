// import { rest } from '/node_modules/msw/lib/core/index';
import { render, screen } from "@testing-library/react";
// import { setupServer } from "/node_modules/msw/lib/node/index";
import catsMock from "../../../mocks/cats.json";
import Pets from "../Pets";
import { setupServer } from "msw/node";
import { rest } from "msw";
import userEvent from '@testing-library/user-event'
import Checkbox from './file';


//msw
// faking server
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

  // Reset handlers so that each test could alter them
  // without affecting other, unrelated tests.
  afterEach(() => server.resetHandlers());

  // Don't forget to clean up afterwards.
  afterAll(() => server.close());

  test("initial show 5 cats cards", async () => {
    const cards = await screen.findAllByRole("article");
    expect(cards.length).toEqual(5);
  });

  test('should render 3 female cats after filter by femail gender',async()=>{
    const cards = await screen.findAllByRole("article");
    userEvent.selectOptions(screen.getByLabelText(/Gender/i),'female')
    expect(screen.getAllByRole('article').length).toEqual(3)
    expect(screen.getAllByRole('article')).toStrictEqual([cards[0],cards[2],cards[4]])
  })
});



test ('Conditional Rendering' , () =>{
  render (<Checkbox lableOn={"On"} lableOff={"Off"} />)
  expect(screen.queryByLabelText(/"On"/i)).not.toBeInTheDocument();
})