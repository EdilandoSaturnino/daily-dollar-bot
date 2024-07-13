const { Client, GatewayIntentBits, REST, Routes } = require('discord.js')
const axios = require('axios')
const cron = require('node-cron')
require('dotenv').config()

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once('ready', async () => {
  console.log(`Online!`)

  const commands = [
    {
      name: 'cotacao',
      description: 'Obtenha a cotação atual do dólar',
    },
  ]

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)
  try {
    console.log('Started refreshing application (/) commands.')

    await rest.put(Routes.applicationGuildCommands(client.user.id, process.env.GUILD_ID), { body: commands })

    console.log('Successfully reloaded application (/) commands.')
  } catch (error) {
    console.error(error)
  }

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
    '10 19 * * *',
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

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const { commandName } = interaction

  if (commandName === 'cotacao') {
    await interaction.deferReply()
    const rateMessage = await getDollarRate()
    await interaction.editReply(rateMessage)
  }
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

async function getDollarRate() {
  try {
    const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD')
    const rate = response.data.rates.BRL
    return `A cotação atual do dólar é R$ ${rate.toFixed(2)}`
  } catch (error) {
    console.error('Erro ao buscar a cotação do dólar:', error)
    return 'Erro ao buscar a cotação do dólar'
  }
}

client.login(process.env.TOKEN)
