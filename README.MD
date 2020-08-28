<h1 align="center">Solbot</h1>

<div align="center">
  🏎️🏎️🏎️
</div>
<div align="center">
  <strong>Crypto Tipping Bot for the Solana Discord</strong>
</div>

<br />

<div align="center">
  <a href="https://opensource.org/licenses/MIT">
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg"></a>
</div>

## Table of Contents
- [Features](#features)
- [Architecture](#architecture)
- [Deployment](#deployment)

## Features
* send SOL to public keys or by tagging a discord user
* switch between clusters
* check your account balance
* one day (maybe :) ): ledger support, monikers (e.g. send 1 coffee)

## Architecture
![High Level Architecture](docs/images/high_level_architecture.png)

#### Discord Command Handler
This component faces the user and accept commands which it forwards to the other components.
#### DiscordId -> Public Key Storage
This is a persistent db. All it does is map discordIds to public keys. A user can use a command
to save a public key for their discordId here. Then, users can send that user currency by simply
tagging them in a message instead of having to write the public key.
#### Wallet
Regular wallet offering functions such as inspecting balance or sending currency. Forwards calls to
the selected Solana cluster. Saves private key in memory while user is logged in.
#### PriceAPI
Provides the current USD value of SOL and some other price-related functions.

## Deployment

### Discord Setup

1. Go to the discord developer portal and create a new application
2. Create a new bot. You can also give it an avatar. You'll need the bot token for later!
3. Go to `https://discord.com/oauth2/authorize?client_id=<YOUR_APPLICATION_CLIENT_ID>&scope=bot` to add the bot to your server.

### Local Deployment

1. Start a local postgresql for the PublicKeyStorage 

    ```
    docker run -d -p 5432:5432 -e POSTGRES_USER=tipping-bot -e POSTGRES_PASSWORD=tipping-bot-postgresql -e POSTGRES_DB=tipping-bot-postgresql --name tipping-bot-postgresql postgres:12.4-alpine
    ```

2. add a new `secret` folder inside `src`, add an `.env` file inside with the following content (DO NOT COMMIT THIS FILE):
   ```
   DISCORD_TOKEN=<YOUR_BOT_TOKEN>
   ```
   
3. run `npm install`
4. run `npm run migrate`
5. run `npm start`

### Cloud Deployment
coming soon...
