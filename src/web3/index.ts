import { ethers } from "ethers";

import ensLookup from "./ensLookup";
import shortenAddress from "./shortenAddress";

const url = "https://mainnet.infura.io/v3/ac1f868a6b534b8ca80c988ed5617fb8"

/**
 * The mainnet provider of this project.
 * @type ethers.providers.StaticJsonRpcProvider
 */
const mainnetInfura = new ethers.providers.StaticJsonRpcProvider(url);

const INFURA_ID = "ac1f868a6b534b8ca80c988ed5617fb8"

export {shortenAddress, ensLookup, mainnetInfura, INFURA_ID}