import * as request from "supertest";
import {app} from './app';

describe("Test the root path", () => {
  test("It should response with 505 to the empty GET method", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toEqual(505);
  });
});