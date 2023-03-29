import Head from 'next/head'
import Navbar from '../components/NavbarFull'
import 'bootstrap/dist/css/bootstrap.min.css';
import HotelGallery from '@/components/HotelGallery'


export default function HomePage() {

  return (
    <>
      <Head>
        <title>Blockin - Compare Hundreds of Hotel Results!</title>
      </Head>

      <Navbar />
      <HotelGallery />
    </>
  )
}