import Head from 'next/head'
import Navigation from '../components/navigation'

const Container = (props) => {
  return (
    <div className=''>
      <Head>
        <title>Stolen bikes App</title>
        <link rel="stylesheet" href='https://cdn.jsdelivr.net/npm/bootswatch@4.5.2/dist/sandstone/bootstrap.min.css' />
      </Head>
      <Navigation />
      <div className='container p-4'>{props.children}</div>
    </div>
  )
}

export default Container
