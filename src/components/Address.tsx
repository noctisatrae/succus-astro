import React, { useState, useEffect } from "react";

import { ensLookup, shortenAddress, mainnetInfura } from "&";

const Address = (props) => {
    
    const [ensAddress, setEnsAddress] = useState();

    useEffect(() => {
        ensLookup(props.ethAddress, mainnetInfura).then((lookup) => {
            setEnsAddress(lookup);
        })
    })

    return (
        <div class="flex">
            <h4 className="p-3">{(ensAddress === null) ? shortenAddress(props.ethAddress) : ensAddress}</h4>
        </div>
    )
}

export default Address;