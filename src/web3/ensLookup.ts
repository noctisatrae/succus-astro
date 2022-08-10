import { ethers } from 'ethers'

/**
 * This function performs a lookup for a name associated to a probided ETH address.
 * @param addr The provided address for ENS lookup
 * @param mainnetProvider Your mainnet provider (eg. infuria)
 * @returns The associated name to the ETH address
 */
const ensLookup = async (addr, mainnetProvider) => {
    return await mainnetProvider.lookupAddress(addr);
}

export default ensLookup
