# address-resolver

This hardhat plugin mainly resolves supplied `project`, `network`, `name` to an address based on contents of json files.

## What

This plugin provides you with easy integration on different blockchain, without the need to look for the address of a specific contract. For token contracts, can return `Token` types defined in _@uniswap/sdk-core_. Based on this template [repo](https://github.com/NomicFoundation/hardhat-ts-plugin-boilerplate).

## Installation

- Step 1

```bash
# Right now settle for submodule route, after todo 2, can run:
# npm install address-resolver hardhat

# In your hardhat project root directory
git submodule add https://github.com/monkeyboiii/address-resolver plugins/address-resolver
```

- Step 2

```json
// In your package.json file, add this line inside
"dependencies": {
  ...
  "address-resolver": "file:./plugins/address-resolver/src/"
}

```

- Step 3

Import the plugin in your `hardhat.config.js`:

```js
require("address-resolver");
```

Or if you are using TypeScript, in your `hardhat.config.ts`:

```ts
import "address-resolver";
```

## Required plugins

None.

## Tasks

This plugin creates no additional tasks.

## Environment extensions

This plugin extends the Hardhat Runtime Environment by adding an `addressResolver` field
whose type is `AddressResolver`. This is the main entry point for interaction.

## Configuration

This plugin extends the `HardhatUserConfig`'s `HardhatConfig` object with an optional
`addressResolver` field, which has an optional `assets` field.

This is an example of how to set it:

```js
module.exports = {
  addressResolver: {
    // customizable complying asset files
    assets: ["/path/to/asset/file", "/path/to/asset/file/2"],
  },
};
```

## Usage

```ts
hre.addressResolver.resolveProjectName("uniswap", "Quoter");

hre.addressResolver.resolveProjectNetworkName(
  "timeswap",
  "arbitrum",
  "OptionFactory"
);
```

## TODOs

- [ ] Add a task of CLI resolver.
- [ ] Change ReservedCategory from `token` to others.
- [ ] Publish to npm registry.
