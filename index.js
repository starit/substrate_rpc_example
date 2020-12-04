const { HttpProvider } = require('@polkadot/rpc-provider')
const { StorageKey } = require('@polkadot/types/primitive')
const { TypeRegistry } = require('@polkadot/types')
const Metadata = require('@polkadot/metadata/Decorated').default

const chainTypes = {}

const rpctest = async () => {
  try {
    const rpcUrl = '' // default 9933
    const provider = new HttpProvider(rpcUrl)
    const registry = new TypeRegistry()
    registry.register(chainTypes) // register chain types
    const chain_metadata = await provider.send('state_getMetadata', []) // get metadata from chain
    // console.log('rpc state_getMetadata', metadata)
    const metadata = new Metadata(registry, metadata) // produce metadata
    const storageKey = new StorageKey(
      registry,
      metadata
        .query
        .system
        .account('5DNzCdfuQH8XhLAiB2tv9SPfPEErgSvhq7GmbMv2mSVhrtw6')
    ).toHex() // generate storage key

    console.log('StorageKey', storageKey)
    const fromBlockHash = await provider.send('chain_getBlockHash', [0])
    // console.log('chain hash', hash)
    const result = await provider.send('state_queryStorage', [[storageKey], fromBlockHash])
    console.log('rpc state_queryStorage', JSON.stringify(result))
  } catch(error) {
    console.log(error.message)
  }
}


rpctest()

