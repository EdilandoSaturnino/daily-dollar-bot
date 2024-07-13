const { Client, GatewayIntentBits } = require('discord.js')
const axios = require('axios')
const cron = require('node-cron')
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', () => {
  console.log(`Online!`)

  cron.schedule(
    '0 9 * * *',
    () => {
      sendDollarRate()
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  )

  cron.schedule(
    '0 12 * * *',
    () => {
      sendDollarRate()
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  )

  cron.schedule(
    '0 17 * * *',
    () => {
      sendDollarRate()
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  )

  cron.schedule(
    '0 19 * * *',
    () => {
      sendDollarRate()
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  )

  cron.schedule(
    '17 19 * * *',
    () => {
      sendDollarRate()
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  )

  cron.schedule(
    '0 21 * * *',
    () => {
      sendDollarRate()
    },
    {
      timezone: 'America/Sao_Paulo',
    }
  )
})

async function sendDollarRate() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
    const rate = response.data.rates.BRL

    const channel = client.channels.cache.get(process.env.CHANNEL_ID)
    if (channel) {
      channel.send(`A cotação atual do dólar é R$ ${rate.toFixed(2)}`)
    }
  } catch (error) {
    console.error('Erro ao buscar a cotação do dólar:', error)
  }
}

client.login(process.env.TOKEN)
