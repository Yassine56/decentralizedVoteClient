module.exports = {
  PORT: 4000,
  // Connectivity details for the node
  // ** Make sure you take the "-connect" URL for your node here, which is the REST API Gateway **
  KALEIDO_REST_GATEWAY_URL: "https://abcd1234-bcde2345-connect.us0-aws.kaleido.io",
  KALEIDO_AUTH_USERNAME: "XXXXXXXX",
  KALEIDO_AUTH_PASSWORD: "XXXXXXXX",
  // The "from" address to sign the transactions. Must exist in the node's wallet
  FROM_ADDRESS: "0x012345abcdef012345abcdef012345abcdef0123",
  // Details of the contract source code in the contracts directory
  // ** if you pull in pre-reqs like OpenZeppelin, just put them all inside the contracts directory **
  CONTRACT_MAIN_SOURCE_FILE: "simplestorage.sol", // filename
  CONTRACT_CLASS_NAME: "simplestorage" // Solidity class within the file
}