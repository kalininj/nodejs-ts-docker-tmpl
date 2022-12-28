import request from "supertest";
import app from "../../app"
import { University } from "../../types"
import express, { Request, Response } from "express"

describe("Integrational tests", () => {
  describe("Make requests to get universities", () => {
    it("fetches list", async () => {
      const res = await request(app)
        .get("/universities")
      expect(res.body.length).toEqual(348)
      expect(res.statusCode).toEqual(200)
    })
    it("fetches list filtered by country", async () => {
      const res = await request(app)
        .get("/universities?country=Ireland")
      expect(res.body.length).toEqual(48)
      expect(res.statusCode).toEqual(200)
    })
    it("fetches one university by name", async () => {
      const res = await request(app)
        .get("/universities/Athlone%20Institute%20of%20Technology")
      expect(res.body.name).toEqual('Athlone Institute of Technology')
      expect(res.statusCode).toEqual(200)
    })
  })  
})    
