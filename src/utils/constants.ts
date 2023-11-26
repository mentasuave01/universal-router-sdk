import { ChainId } from '@uniswap/sdk-core'
import { BigNumber } from 'ethers'

type ChainConfig = {
  router: string
  creationBlock: number
  weth: string
}

const WETH_NOT_SUPPORTED_ON_CHAIN = '0x0000000000000000000000000000000000000000'

const CHAIN_CONFIGS: { [key: number]: ChainConfig } = {
  // mainnet
  [1]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
    creationBlock: 17143817,
  },
  // goerli
  [5]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: '0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6',
    creationBlock: 8940568,
  },
  // sepolia
  [11155111]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: '0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14',
    creationBlock: 3543575,
  },
  // polygon
  [137]: {
    router: '0x643770E279d5D0733F21d6DC03A8efbABf3255B4',
    weth: '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270',
    creationBlock: 46866777,
  },
  //polygon mumbai
  [80001]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    creationBlock: 35176052,
  },
  //optimism
  [10]: {
    router: '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
    weth: '0x4200000000000000000000000000000000000006',
    creationBlock: 108825869,
  },
  // optimism goerli
  [420]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: '0x4200000000000000000000000000000000000006',
    creationBlock: 8887728,
  },
  // arbitrum
  [42161]: {
    router: '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
    weth: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    creationBlock: 125861718,
  },
  // arbitrum goerli
  [421613]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: '0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3',
    creationBlock: 18815277,
  },
  // celo
  [42220]: {
    router: '0x88a3ED7F21A3fCF6adb86b6F878C5B7a02D20e9b',
    weth: WETH_NOT_SUPPORTED_ON_CHAIN,
    creationBlock: 21116361,
  },
  // celo alfajores
  [44787]: {
    router: '0x3fC91A3afd70395Cd496C647d5a6CC9D4B2b7FAD',
    weth: WETH_NOT_SUPPORTED_ON_CHAIN,
    creationBlock: 17566658,
  },
  // binance smart chain
  [56]: {
    router: '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
    weth: '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    creationBlock: 31254967,
  },
  // avalanche
  [43114]: {
    router: '0x82635AF6146972cD6601161c4472ffe97237D292',
    weth: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    creationBlock: 34491144,
  },
  // base goerli
  [84531]: {
    router: '0xd0872d928672ae2ff74bdb2f5130ac12229cafaf',
    weth: '0x4200000000000000000000000000000000000006',
    creationBlock: 6915289,
  },
  // base mainnet
  [8453]: {
    router: '0xeC8B0F7Ffe3ae75d7FfAb09429e3675bb63503e4',
    weth: '0x4200000000000000000000000000000000000006',
    creationBlock: 3229053,
  },
  // bittorrent mainnet
  [ChainId.BIT_TORRENT_MAINNET]: {
    router: '0xB27481AdC53077191b293f2BA1A589cc77802078',
    weth: '0x23181F21DEa5936e24163FFABa4Ea3B316B57f3C',
    creationBlock: 28132160,
  },
   // fantom mainnet
   [ChainId.FANTOM]: {
    router: '0xF491e7B69E4244ad4002BC14e878a34207E38c29',
    weth: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    creationBlock: 4242185,
  },
   // Horizen mainnet
   [ChainId.EON]: {
    router: '0xa7B257019fc65Be804fd5A2Aa2AFe64cBC9E7d37',
    weth: '0xF5cB8652a84329A2016A386206761f455bCEDab6',
    creationBlock: 513162,
  }
}

export const UNIVERSAL_ROUTER_ADDRESS = (chainId: number): string => {
  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)
  return CHAIN_CONFIGS[chainId].router
}

export const UNIVERSAL_ROUTER_CREATION_BLOCK = (chainId: number): number => {
  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)
  return CHAIN_CONFIGS[chainId].creationBlock
}

export const WETH_ADDRESS = (chainId: number): string => {
  if (!(chainId in CHAIN_CONFIGS)) throw new Error(`Universal Router not deployed on chain ${chainId}`)

  if (CHAIN_CONFIGS[chainId].weth == WETH_NOT_SUPPORTED_ON_CHAIN) throw new Error(`Chain ${chainId} does not have WETH`)

  return CHAIN_CONFIGS[chainId].weth
}


export const PERMIT2_ADDRESS = '0x000000000022D473030F116dDEE9F6B43aC78BA3'
export const BTT_PERMIT2_ADDRESS = '0x41846bd0E41dD42D80d00E99212040C871F40CB0';
 export const FTM_PERMIT2_ADDRESS = '0x838c010F57889195C88f2097488e49B7ad04EcB1';
 export const EOS_PERMIT2_ADDRESS = '0xd119eF12fdC22756c8Ce4F03E463607742e3A59f';

export const CONTRACT_BALANCE = BigNumber.from(2).pow(255)
export const ETH_ADDRESS = '0x0000000000000000000000000000000000000000'
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'
export const MAX_UINT256 = BigNumber.from(2).pow(256).sub(1)
export const MAX_UINT160 = BigNumber.from(2).pow(160).sub(1)

export const SENDER_AS_RECIPIENT = '0x0000000000000000000000000000000000000001'
export const ROUTER_AS_RECIPIENT = '0x0000000000000000000000000000000000000002'

export const OPENSEA_CONDUIT_SPENDER_ID = 0
export const SUDOSWAP_SPENDER_ID = 1
