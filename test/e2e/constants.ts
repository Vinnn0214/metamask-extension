/** Address of the first account generated by the default Ganache mnemonic. */
export const GANACHE_ACCOUNT = '0xe18035bf8712672935fdb4e5e431b1a0183d2dfc';

/** Private key for the Ganache account. */
export const GANACHE_PRIVATE_KEY =
  '0x4cfd3e90fc78b0f86bf7524722150bb8da9c60cd532564d7ff43f5716514f553';

/** Address of the account derived from the default onboarding fixture. */
export const DEFAULT_FIXTURE_ACCOUNT =
  '0x5CfE73b6021E818B776b421B1c4Db2474086a7e1';

/* Address of the 4337 entrypoint smart contract. */
export const ENTRYPOINT = '0x18b06605539dc02ecD3f7AB314e38eB7c1dA5c9b';

/* Address of the generated ERC-4337 account. */
export const ERC_4337_ACCOUNT = '0x8FCd29A7887f82463E0eA7332CB1ce431A4430F7';

/* URL of the local bundler server. */
export const BUNDLER_URL = 'http://localhost:3000/rpc';

/* URL of the 4337 account snap site. */
export const ERC_4337_ACCOUNT_SNAP_URL =
  'https://metamask.github.io/snap-account-abstraction-keyring/0.4.2/';

/* Salt used to generate the 4337 account. */
export const ERC_4337_ACCOUNT_SALT = '0x1';

/* Address of the SimpleAccountFactory smart contract deployed to Ganache. */
export const SIMPLE_ACCOUNT_FACTORY =
  '0x4aFf835038b16dccDb1670103C4877A8F93E5219';

/* URL of the Snap Simple Keyring site. */
export const TEST_SNAPS_SIMPLE_KEYRING_WEBSITE_URL =
  'https://metamask.github.io/snap-simple-keyring/1.1.6/';

/* Address of the VerifyingPaymaster smart contract deployed to Ganache. */
export const VERIFYING_PAYMASTER = '0xbdbDEc38ed168331b1F7004cc9e5392A2272C1D7';

/* Default ganache ETH balance in decimal when first login */
export const DEFAULT_GANACHE_ETH_BALANCE_DEC = '25';

/* Dapp host addresses and URL*/
export const DAPP_HOST_ADDRESS = '127.0.0.1:8080';
export const DAPP_URL_LOCALHOST = 'http://localhost:8080';
export const DAPP_URL = `http://${DAPP_HOST_ADDRESS}`;
export const DAPP_ONE_URL = 'http://127.0.0.1:8081';

/* Default BTC address created using test SRP */
export const DEFAULT_BTC_ACCOUNT = 'bc1qg6whd6pc0cguh6gpp3ewujm53hv32ta9hdp252';

/* Default (mocked) BTC balance used by the Bitcoin RPC provider */
export const DEFAULT_BTC_BALANCE = 1; // BTC

/* Default BTC fees rate */
export const DEFAULT_BTC_FEES_RATE = 0.00001; // BTC

/* Default BTC conversion rate to USD */
export const DEFAULT_BTC_CONVERSION_RATE = 62000; // USD


/* Default SOL conversion rate to USD */
export const DEFAULT_SOL_CONVERSION_RATE = 226; // USD

/* Default BTC transaction ID */
export const DEFAULT_BTC_TRANSACTION_ID =
  'e4111a707317da67d49a71af4cbcf6c0546f900ca32c3842d2254e315d1fca18';

/* Number of sats in 1 BTC */
export const SATS_IN_1_BTC = 100000000; // sats

/* Default (mocked) SOLANA address created using test SRP */
export const DEFAULT_SOLANA_ACCOUNT =
  'E6Aa9DDv7zsePJHosoqiNb3cFuup3fkXTyRH2pZ1nVzP';

/* Default (mocked) SOLANA balance used by the Solana RPC provider */
export const DEFAULT_SOLANA_BALANCE = 1; // SOL
