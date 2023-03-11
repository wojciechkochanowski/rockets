import Head from 'next/head'
import Map from '../components/Map'

export default function Home() {
  return (
    <>
      <Head>
        <title>Rockets</title>
        <meta name="description" content="Rockets - browser strategy game and star map" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Map/>
    </>
  )
}