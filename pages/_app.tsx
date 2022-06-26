import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layout'
import FirebaseProvider from '../lib/authContext'
import '../lib/firebaseConfig/init'
import { ChakraProvider } from '@chakra-ui/react'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import '../styles/main.css';
import {MoralisProvider} from "react-moralis";
import React from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return <ChakraProvider>
    <FirebaseProvider>
      {/* figrue out type error later */}
    <MoralisProvider appId="532JdiWYeFOwOS4ZxuJNn8QIBD8rszXrjTs8qrdm" serverUrl="https://vrlyrpqwr4yr.usemoralis.com:2053/server">
      {/* <NetworkProvider> */}
      <Layout>
        {/* {getLayout(<Component {...pageProps} />) }  */}
        <Component {...pageProps} />
      </Layout>
      {/* </NetworkProvider> */}

    </MoralisProvider>
    </FirebaseProvider>
    
  </ChakraProvider>
  
}
export default MyApp
