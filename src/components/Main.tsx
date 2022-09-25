/* jsxImportSource react-jsx */
import React, { useState, useEffect } from "react";
import TimeAgo from 'javascript-time-ago'

import { sendmessage, receiveMessage, SEA, getKeypair, registerKeypair, getProvider } from "succus";

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const ethRegex = /^0x[a-fA-F0-9]{40}$/g

const isEthAddress = (address:string) => {
    if (ethRegex.test(address)) return true
    else return false
}

const Main = () => {

    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState([]);

    const [addressInput, setAddressInput] = useState("");
    const [gunKeypair, setGunKeypair] = useState("");

    const updateMsg = async () => {
        if (isEthAddress(addressInput)) {

            console.log("Is an ETH address.")

            await setGunKeypair(await getKeypair(addressInput)); 

            await receiveMessage([addressInput], async ({encryptedMSG, date, from, ensFrom}) => {

                console.log(encryptedMSG)
    
                const decrypted = await SEA.decrypt(encryptedMSG, gunKeypair);
                await console.log(decrypted)
    
                await setMessages(prev => [...prev, { content:decrypted, sentAt:date, from: from, name: ensFrom }]);
            });
        } else {
            console.log("Is not an ETH address.")
         }
    }

    useEffect(() => {
        updateMsg()
    }, [setMessages, addressInput])

    return <div>

        <div>
            <div>
                <input type="text" className="input input-primary" onInput={(e) => {
                    setMsgInput(e.target.value);
                }}  placeholder="msg..."/>

                <button className="btn btn-secondary" onClick={async () => {
                    console.log("[output]: ", await sendmessage(msgInput, [addressInput], gunKeypair));
                }}>Send</button> 
                <br /><br />

                <input type="text" className="input input-primary" onInput={(e) => {
                    setAddressInput(e.target.input);
                }} placeholder="receiver..." />
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
            <li>{content} - {timeAgo.format(sentAt)} by {name}</li>
        ))}
    </div>
}

export default Main;