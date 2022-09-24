/* jsxImportSource react-jsx */
import React, { useState, useEffect } from "react";
import TimeAgo from 'javascript-time-ago'

import { sendmessage, receiveMessage, SEA, getKeypair, registerKeypair } from "succus";

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const gunKeypair = {pub: '24sFqelMjISareVwxjBzEis1GsVyBL82P1sxUbLB_JI.wGBPSof3EwGHw6ITReATTUco0INz5-qFZA_TFEV5i9U', priv: 'UOOT4jK0V-5G7HaOWCEKy529rEmWjxe9BnUewG55a7o', epub: 'GhjvQH2DcJip7kIhvrcGZPQBv7gSSZ7aLJOG96anZ10.u-oN-R7p8xmbiBjSyodssX9yaJTOGPEWnfQrSuBZNZw', epriv: 'gaKPOm_Wlv7GLB36iNcBAOr8TIGU17qtw71bYej6pk8'}

const address = "0x84673f99d9807780ce5Db4c3A980d708535d9604"

const Main = () => {

    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState([]);

    const updateMsg = async () => {

        await receiveMessage([address], async ({encryptedMSG, date, from, ensFrom}) => {

            console.log(encryptedMSG)

            const decrypted = await SEA.decrypt(encryptedMSG, gunKeypair);
            await console.log(decrypted)

            await setMessages(prev => [...prev, { content:decrypted, sentAt:date, from: from, name: ensFrom }]);
        });
    }

    useEffect(() => {

        (async () => {
            await registerKeypair(address, gunKeypair);

            const {epub, pub} = await getKeypair(address)
            
            console.log({epub, pub})
        })();

    }, [])

    useEffect(() => {
        updateMsg()
    }, [setMessages])

    return <div>

        <input type="text" class="input" onInput={(e) => {
            setMsgInput(e.target.value);
        }}  placeholder="msg..."/>

        <p>{msgInput}</p>
        <button class="btn btn-secondary" onClick={async () => {
            console.log("[output]: ", await sendmessage(msgInput, [address], gunKeypair));
        }}>Send</button>

        {messages.map(({content, name, from, sentAt}) => (
            <li>{content} - {timeAgo.format(sentAt)} by {name}</li>
        ))}
    </div>
}

export default Main;