import "jest";
import * as request from "supertest";
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
} from "@jest/globals";
import { serviceUrl } from "../../utils";
/*
 * Module
 */
let FULL_BODY_LENGTH = 11;
let FULL_HEADER_LENGTH = 18;
let FULL_HEADER_LENGTH_failure = 11;

describe("get info tests", () => {
  describe("get xkcd info Happy Flows", () => {
    test("get all the existing xkcd info", async () => {
      const response = await request(serviceUrl)
        .get(`/info.0.json`)
        .expect(200);

      let expectedResults = {
        month: "9",
        num: 2518,
        link: "",
        year: "2021",
        news: "",
        safe_title: "Lumpers and Splitters",
        transcript: "",
        alt: "Anna Karenina is a happy family lumper and unhappy family splitter.",
        img: "https://imgs.xkcd.com/comics/lumpers_and_splitters.png",
        title: "Lumpers and Splitters",
        day: "20",
      };

      expect(response.headers).toHaveProperty(
        "content-type",
        "application/json"
      );

      expect(response.body).toStrictEqual(expectedResults);
      expect(Object.keys(response.body).length).toBe(FULL_BODY_LENGTH);
      expect(Object.keys(response.headers).length).toBe(FULL_HEADER_LENGTH);
    });
  });
  describe("get xkcd info unhappy Flows", () => {
    test("incorrect operation", async () => {
      const response = await request(serviceUrl)
        .post(`/info.0.json`)
        .expect(405);
      expect(Object.keys(response.headers).length).toBe(
        FULL_HEADER_LENGTH_failure
      );
    });
    test("wrong service Url", async () => {
      const response = await request(serviceUrl)
        .get(`/info.1.json`)
        .expect(404);
      expect(Object.keys(response.headers).length).toBe(14);
    });
  });
});
