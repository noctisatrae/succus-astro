/* jsxImportSource react-jsx */
import React, { useState, useEffect } from "react";
import TimeAgo from 'javascript-time-ago'

import { connectWallet, sendmessage, receiveMessageConstant, dbConf } from "succus";

import { SEA } from "db";

// English.
import en from 'javascript-time-ago/locale/en'

TimeAgo.addDefaultLocale(en)

const timeAgo = new TimeAgo('en-US')
const gunKeypair = await SEA.pair();

dbConf({
    peers:['https://gun-manhattan.herokuapp.com/gun', 'https://gun-us.herokuapp.com/gun', "https://gunpoint.herokuapp.com/gun"]
})

const Main = () => {

    const [keypair, setKeypair] = useState(gunKeypair);
    const [messages, setMessages] = useState([]);

    const updateMsg = async () => {

        const {address} = await connectWallet();
        await receiveMessageConstant([address], async ({encryptedMSG, date, from, ensFrom}) => {

            const decrypted = await SEA.decrypt(encryptedMSG, gunKeypair);
            await console.log(decrypted)

            await setMessages(prev => [...prev, { content:decrypted, sentAt:date, from: from, name: ensFrom }]);
        });
    }

    useEffect(() => {
        updateMsg()
    }, [])

    return <div>

        <button class="btn btn-secondary" onClick={async () => {
            
            const {address} = await connectWallet();

            await sendmessage("Hi from button", [address], keypair);
        }}>Send</button>

        {messages.map(({content, name, from, sentAt}) => (
            <li>{content} - {timeAgo.format(sentAt)}</li>
        ))}
    </div>
}

export default Main;