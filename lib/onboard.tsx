import Onboard from 'bnc-onboard'
import { Subscriptions } from 'bnc-onboard/dist/src/interfaces'

import { readNetwork } from '../lib/constants/networks'

const appName = 'DAODash'
// const networkId = readNetwork.chainId
const networkId = 1

// const rpcUrl = readNetwork.rpcUrl
const dappId = process.env.REACT_APP_BLOCKNATIVE_API_KEY

// TODO(odd-amphora): Add support for Formatic, Portis, etc. if requested.
export function initOnboard(subscriptions: Subscriptions, darkMode: boolean) {
  return Onboard({
    dappId,
    hideBranding: true,
    networkId,
    darkMode,
    subscriptions,
    walletSelect: {
      wallets: [
        { walletName: 'metamask' },
        // {
        //   walletName: 'ledger',
        //   rpcUrl,
        // },
        // {
        //   walletName: 'walletConnect',
        //   infuraKey: `${process.env.REACT_APP_INFURA_ID}`,
        // },
        // { walletName: 'coinbase' },
        // { walletName: 'status' },
        // { walletName: 'walletLink', rpcUrl },
        // { walletName: 'gnosis' },
        // { walletName: 'keystone', appName: 'React Demo', rpcUrl },
        // {
        //   walletName: 'lattice',
        //   appName,
        //   rpcUrl,
        // },
        // { walletName: 'trust', rpcUrl },
        // { walletName: 'opera' },
        // { walletName: 'operaTouch' },
        // { walletName: 'imToken', rpcUrl },
        // { walletName: 'meetone' },
        // { walletName: 'tally' },
        // { walletName: 'authereum', disableNotifications: true },
      ],
    },
    walletCheck: [
      { checkName: 'derivationPath' },
      { checkName: 'connect' },
      { checkName: 'accounts' },
      { checkName: 'network' },
    ],
  })
}