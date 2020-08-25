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
