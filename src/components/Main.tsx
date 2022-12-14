/* jsxImportSource react-jsx */
import React, { useState, useEffect } from "react";
import TimeAgo from 'javascript-time-ago'
import Blockies from 'react-blockies';

import { sendmessage, receiveMessage, SEA, getKeypair, registerKeypair, getProvider, dbConf } from "succus";

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const ethRegex = /^0x[a-fA-F0-9]{40}$/g

const isEthAddress = (address:string) => {
    if (ethRegex.test(address)) return true
    else return false
}

const shortenAddress = (address: string) => {
    return `${address.slice(0, 6)}...`
}

dbConf({
    peers:["https://gunpoint.herokuapp.com/gun"]
})

const Main = ({chat}) => {
    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [isitEthAddress, setisitEthaddres] = useState();

    const [gunKeypair, setGunKeypair] = useState();

    const updateMsg = async () => {
        await console.log(gunKeypair)
        await receiveMessage([chat], async ({encryptedMSG, date, from, ensFrom}) => {
            
            const decrypted = await SEA.decrypt(encryptedMSG, gunKeypair);

            if (decrypted != undefined) await setMessages(prev => [...prev, { content:decrypted, sentAt:date, from: from, name: ensFrom }]);
            else console.log("string empty")
        });
    }

    useEffect(() => {

        setisitEthaddres(isEthAddress(chat));

        (async () => {
            await setGunKeypair(await getKeypair(chat));
        })();
    }, [])

    useEffect(() => {
        updateMsg()
    }, [gunKeypair])

    return (isitEthAddress ? <div>
    <div>
        <div>
            <input type="text" className="input input-primary" onInput={(e) => {
                setMsgInput(e.target.value);
            }}  placeholder="msg..."/>

            <button className="btn btn-secondary" onClick={async () => {
                console.log("[output]: ", await sendmessage(msgInput, [chat], gunKeypair));
            }}>Send</button> 

            <br />

            <br /><br />
            <button className="btn btn-secondary" onClick={async () => {
                const address = await (await getProvider()).getSigner().getAddress();
                console.log(address)
                await registerKeypair(address, await SEA.pair())
            }}>Register keypair for address.</button>
            <br /><br />
            <button className="btn btn-secondary" onClick={async () => {
                console.log(await getKeypair(await (await getProvider()).getSigner().getAddress()))
            }}>Get keypair</button>
        </div>
    </div>

    {messages.map(({content, name, from, sentAt}) => (
        <li className="list-none">
            <div className="inline">
                <Blockies className="rounded-full" seed={from}></Blockies> <h2>{(name === null ? shortenAddress(from) : name)}</h2>

                <p className="inline">{content}</p>
            </div>
        </li>
    ))}
</div> : <p>not an eth address</p> )
}

export default Main;