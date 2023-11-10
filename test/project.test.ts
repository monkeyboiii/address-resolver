// tslint:disable-next-line no-implicit-dependencies
import { assert } from "chai";

import { useEnvironment } from "./helpers";
import { AddressResolver } from "../src/AddressResolver";

describe("Integration tests examples", function () {
  describe("Hardhat Runtime Environment extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the addressResolver field", function () {
      assert.instanceOf(this.hre.addressResolver, AddressResolver);
    });

    it("The addressResolver field should resolveProjectName", function () {
      assert.equal(
        this.hre.addressResolver.resolveProjectName("uniswap", "PoolFactory"),
        "0x1F98431c8aD98523631AE4a59f267346ea31F984"
      );
    });

    it("The addressResolver field should resolveProjectMetworkName", function () {
      assert.equal(
        this.hre.addressResolver.resolveProjectNetworkName(
          "uniswap",
          "arbitrum",
          "UniversalRouter"
        ),
        "0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4"
      );
    });
  });

  describe("HardhatConfig extension", function () {
    useEnvironment("hardhat-project");

    it("Should add the addressReolver and assets to the config", function () {
      assert.instanceOf(this.hre.config.addressResolver.assets, Array<string>);
    });
  });
});

describe("Unit tests examples", function () {
  describe("AddressResolverField", function () {
    describe("resolveProjectName", function () {
      it("Should resolve project and name to an address", function () {
        const field = new AddressResolver(this.hre);
        assert.equal(
          field.resolveProjectName("uniswap", "PoolFactory"),
          "0x1F98431c8aD98523631AE4a59f267346ea31F984"
        );
      });
    });
  });
});
