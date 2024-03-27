import { address, toNano } from "ton-core";
import { MainContract } from "../wrappers/MainContract";
import { compile, NetworkProvider } from "@ton-community/blueprint";

export async function run(provider: NetworkProvider) {
  const myContract = MainContract.createFromConfig(
    {
      number: 0,
      address: address("kQBWkmxwDder8y8xRbapCO9u9lGqzTR0b0pn_SIEFG4YEt0e"),
      owner_address: address(
        "kQBWkmxwDder8y8xRbapCO9u9lGqzTR0b0pn_SIEFG4YEt0e"
      ),
    },
    await compile("MainContract")
  );

  const openedContract = provider.open(myContract);

  openedContract.sendDeploy(provider.sender(), toNano("0.01"));

  await provider.waitForDeploy(myContract.address);
}
