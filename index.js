const Discord = require('discord.js')
const client = new Discord.Client()

import * as PushAPI from "@pushprotocol/restapi";
import * as ethers from "ethers";

require('dotenv').config()


const PK = process.env.PRIVATEKEY; // channel private key
const Pkey = `0x${PK}`;
const signer = new ethers.Wallet(Pkey);


client.on("ready", () => {
    console.log("Bot is started!")
  })
  
client.on("message", msg  => {

    if(msg.content ==='$broadCast'){
        sendNotification(msg.content)
    }
})

const sendNotification = async(msg) => {
    try {
      
        const apiResponse = await PushAPI.payloads.sendNotification({
            signer,
            type: 1, // broadcast
            identityType: 2, // direct payload
            notification: {
              title: `New Update`,
              body: `${msg}`
            },
            payload: {
              title: `New Update`,
              body: `${msg}`,
              cta: '',
              img: ''
            },
            channel: 'eip155:5:0x5CE607643f52E9C150375694e4AaDBaEb48D3cCE', // your channel address
            env: 'staging'
          });
      

      // apiResponse?.status === 204, if sent successfully!
      console.log('API repsonse: ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
}

// ##########



client.login(process.env.TOKEN)
