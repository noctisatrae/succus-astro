
/**
 * This function shorten a ETH address.
 * @param address The ETH address to shorten. 
 * @returns The ETH address shortened.
 */
const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(
      address.length - 4,
      address.length
    )}`;
}

export default shortenAddress;