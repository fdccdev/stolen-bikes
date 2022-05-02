import Container from '../../components/container'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'

export default function Bike({ bike, api_key }) {
  const miliseconds = bike.date_stolen * 1000
  const date = new Date(miliseconds)
  const date_format = date.toLocaleString()

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: api_key,
  })

  let position = {}

  if (bike.stolen_coordinates !== null) {
    const { latitude, longitude } = bike.stolen_record

    position = {
      lat: latitude,
      lng: longitude,
    }
  }

  return (
    <Container>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h3 style={{ textTransform: 'capitalize' }}>
                {bike.status} {bike.title} ({bike.frame_colors})
              </h3>
              <h5>
                At: {date_format}, {bike.stolen_record.location}
              </h5>
              {/* <img className='img-fluid center' src={bike.large_img} alt={bike.name}/>
               */}
              <div style={{ height: '100vh' }}>
                {isLoaded ? (
                  <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={position}
                    zoom={15}
                  >
                    <Marker position={position} />
                  </GoogleMap>
                ) : null}
              </div>
            </div>
            <div className="card-body">
              <h3>DESCRIPTION OF INCIDENT</h3>
              <h5>
                {bike.description
                  ? bike.description
                  : `bicycle stolen in the urban perimeter near the place ${bike.stolen_record.location}`}
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export async function getServerSideProps(ctx) {
  const {API_GOOGLE_MAPS} = process.env
  const response = await fetch(
    `https://bikeindex.org/api/v3/bikes/${ctx.query.id}`
  )
  const data = await response.json()
  return {
    props: {
      bike: data.bike,
      api_key: API_GOOGLE_MAPS
    }
  }
}
