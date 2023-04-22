import Layout from '@/components/Layout'
import Head from 'next/head'
import LayoutContextProvider from '@/context/selection/SelectionContext'
import Map from '../components/Map'

export default function Home() {
  return (
    <>
      <Head>
        <title>Rockets Star Map</title>
        <meta name="description" content="Rockets - browser strategy game and star map" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LayoutContextProvider>
        <Layout>
          <Map/>
        </Layout>
      </LayoutContextProvider>
    </>
  )
}