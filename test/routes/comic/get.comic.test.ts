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
describe("get comic tests", () => {
  describe("get comic  Happy Flows", () => {
    test("get first comic record", async () => {
      const response = await request(serviceUrl)
        .get("/1/info.0.json")
        .expect(200);

      let expectedResults = {
        month: "1",
        num: 1,
        link: "",
        year: "2006",
        news: "",
        safe_title: "Barrel - Part 1",
        transcript:
          "[[A boy sits in a barrel which is floating in an ocean.]]\n" +
          "Boy: I wonder where I'll float next?\n" +
          "[[The barrel drifts into the distance. Nothing else can be seen.]]\n" +
          "{{Alt: Don't we all.}}",
        alt: "Don't we all.",
        img: "https://imgs.xkcd.com/comics/barrel_cropped_(1).jpg",
        title: "Barrel - Part 1",
        day: "1",
      };

      expect(response.headers).toHaveProperty(
        "content-type",
        "application/json"
      );

      expect(response.body).toStrictEqual(expectedResults);
      expect(Object.keys(response.body).length).toBe(FULL_BODY_LENGTH);
      expect(Object.keys(response.headers).length).toBe(FULL_HEADER_LENGTH);
    });

    test("get last comic record", async () => {
      const response = await request(serviceUrl)
        .get(`/2518/info.0.json`)
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

    test("get a random comic record", async () => {
      let number = Math.floor(Math.random() * 2518);
      const response = await request(serviceUrl)
        .get(`/${number}/info.0.json`)
        .expect(200);

      expect(response.headers).toHaveProperty(
        "content-type",
        "application/json"
      );

      expect(response.body.num).toBeTruthy();
      expect(Object.keys(response.body).length).toBe(FULL_BODY_LENGTH);
      expect(Object.keys(response.headers).length).toBe(FULL_HEADER_LENGTH);
    });
  });

  describe("get comic unhappy Flows", () => {
    test("get a 0 index record", async () => {

        const response = await request(serviceUrl)
          .get(`/0/info.0.json`)
          .expect(404);
  
        expect(response.headers).toHaveProperty(
          "content-type",
          "text/html; charset=UTF-8"
        );
  
        expect(response.body.num).toBeFalsy();
        expect(Object.keys(response.body).length).toBe(0);
        expect(Object.keys(response.headers).length).toBe(14);
      });

    test("get a random comic record outside the existing boundries", async () => {
      let number = Math.floor(Math.random() * 2518) + 2500;
      const response = await request(serviceUrl)
        .get(`/${number}/info.0.json`)
        .expect(404);

      expect(response.headers).toHaveProperty(
        "content-type",
        "text/html; charset=UTF-8"
      );

      expect(response.body.num).toBeFalsy();
      expect(Object.keys(response.body).length).toBe(0);
      expect(Object.keys(response.headers).length).toBe(14);
    });

    test("incorrect operation", async () => {
      const response = await request(serviceUrl)
        .post(`/1/info.0.json`)
        .expect(405);

      expect(Object.keys(response.headers).length).toBe(
        FULL_HEADER_LENGTH_failure
      );
    });
    test("wrong service Url", async () => {
      const response = await request(serviceUrl)
        .post(`/1/info.1.json`)
        .expect(404);

      expect(Object.keys(response.headers).length).toBe(13);
    });
  });
});
