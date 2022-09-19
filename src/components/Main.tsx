/* jsxImportSource react-jsx */
import React, { useState, useEffect } from "react";
import TimeAgo from 'javascript-time-ago'

import { connectWallet, sendmessage, receiveMessageConstant, dbConf } from "succus";

import { SEA } from "db";

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')
const gunKeypair = {pub: '24sFqelMjISareVwxjBzEis1GsVyBL82P1sxUbLB_JI.wGBPSof3EwGHw6ITReATTUco0INz5-qFZA_TFEV5i9U', priv: 'UOOT4jK0V-5G7HaOWCEKy529rEmWjxe9BnUewG55a7o', epub: 'GhjvQH2DcJip7kIhvrcGZPQBv7gSSZ7aLJOG96anZ10.u-oN-R7p8xmbiBjSyodssX9yaJTOGPEWnfQrSuBZNZw', epriv: 'gaKPOm_Wlv7GLB36iNcBAOr8TIGU17qtw71bYej6pk8'}

await dbConf({ radisk: false, peers:["http://localhost:4397/gun", "https://gun-manhattan.herokuapp.com/gun"] })

const Main = () => {

    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState([]);

    const updateMsg = async () => {

        const {address} = await connectWallet();
        await receiveMessageConstant([address], async ({encryptedMSG, date, from, ensFrom}) => {


            console.log(encryptedMSG)

            const decrypted = await SEA.decrypt(encryptedMSG, gunKeypair);
            await console.log(decrypted)

            await setMessages(prev => [...prev, { content:decrypted, sentAt:date, from: from, name: ensFrom }]);
        });
    }

    useEffect(() => {
        updateMsg()
    }, [])

    return <div>

        <input type="text" class="input" onInput={(e) => {
            setMsgInput(e.target.value);
        }}  placeholder="msg..."/>

        <p>{msgInput}</p>
        <button class="btn btn-secondary" onClick={async () => {
            
            const {address} = await connectWallet();

            await sendmessage(msgInput, [address], gunKeypair);
        }}>Send</button>

        {messages.map(({content, name, from, sentAt}) => (
            <li>{content} - {timeAgo.format(sentAt)} by {name}</li>
        ))}
    </div>
}

export default Main;