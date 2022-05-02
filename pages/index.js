import Head from 'next/head'
import Container from '../components/container'
import Bikes from '../components/bikes'
import { useRouter } from 'next/router'

export default function Index({ bikes, page }) {
  const router = useRouter()
  return (
    <div>
      <Head>
        <title>Bike Stolen app</title>
      </Head>
      <Container>
        <Bikes bikes={bikes} />
      </Container>
      <div className="container d-flex flex-row justify-content-between" style={{padding: '20px 0'}}>
        <div className='col-md-4'></div>
        <div className='col-md-4'>
        <div className="d-flex flex-row justify-content-between">
            <button
              className="btn btn-primary"
              onClick={() => router.push(`?page=${page - 1}`)}
              disabled={page <= 1}
            >
              Previous
            </button>
            
            <button
              className="btn btn-primary"
              onClick={() => router.push(`?page=${page + 1}`)}
              disabled={page >= 9}
            >
              Next
            </button>
          </div>
        </div>
        <div className='col-md-4'></div>
      </div>
    </div>
  )
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const { API_URL } = process.env
  const response = await fetch(`${API_URL}&page=${page}`)
  const data = await response.json()
  return {
    props: {
      bikes: data.bikes,
      page: +page,
    },
  }
}
