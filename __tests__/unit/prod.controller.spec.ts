import UniversitiesController from "./test"
import * as AllServiceMethods from "../services/universities"

describe("UniversitiesController", () => {
  describe("getList", () => {
    it("fetches list with no params", async () => {
      const spy = jest
        .spyOn(AllServiceMethods, "getFilteredByCountryList")
        .mockResolvedValueOnce([]);
      const controller = new UniversitiesController();
      const items = await controller.getList("");
      expect(items).toEqual([]);
      expect(spy).toHaveBeenCalledWith('United Kingdom');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });

    it("fetches list with filter", async () => {
      const spy = jest
        .spyOn(AllServiceMethods, "getFilteredByCountryList")
        .mockResolvedValueOnce([]);
      const controller = new UniversitiesController();
      const items = await controller.getList("Ireland");
      expect(items).toEqual([]);
      expect(spy).toHaveBeenCalledWith('Ireland');
      expect(spy).toHaveBeenCalledTimes(1);
      spy.mockRestore();
    });
  })
})    
