# Asylum-app

## Prerequisites

1. **Node.js**
2. **Solana Tool Suite** - You can find the installation instructions [here](https://docs.solana.com/cli/install-solana-cli-tools). 
3. **Anchor** (including the [Mocha](https://project-serum.github.io/anchor/getting-started/installation.html#install-mocha) installation) - You can find the installation instructions [here](https://project-serum.github.io/anchor/getting-started/installation.html).
4. Solana browser wallet - [**Phantom**](https://phantom.app/)

## Build

### Solana programs

To build the solana programs:

```anchor build```

After that you might what to test your program with:

```anchor test```

and then deploy with:

```anchor deploy```

> Note 1: your program will be deployed according the solana tools config - you can check if via `solana config get`.
It is worth to verify that you have the right network settings (localnet/devnet).
To change it you can use following commands:

```
# set to localhost
solana config set --url localhost

# set to devnet
solana config set --url devnet
```

> Note 2: if you whant to deploy locally, you should start local net with running `solana-test-validator`

### Client

To work with client app go to the `app` directory:

```cd ./app``` 

To install deps:

```npm install```

To start app:

```npm start```

> Note: after building the Solana program, when a contract was changed, a new idl file is generated at `./target/deploy/idl/asylum.json`. You should update the `./app/src/idl.json` file according to it: just copy&paste all content, except the `metadata` property. 