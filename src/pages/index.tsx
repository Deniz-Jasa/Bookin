import Head from 'next/head'
import Navbar from '../components/NavbarFull'
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelGallery from '@/components/HotelGallery'

export default function Home() {

  return (
    <>
      <Head>
        <title>Blockin - Compare Hundreds of Hotels!</title>
      </Head>

      <Navbar />
      <HotelGallery />
    </>
  )
}
