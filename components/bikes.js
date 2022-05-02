import Router from 'next/router'

const Bikes = ({ bikes }) => {
  const total = bikes.length

  return (
    <>
      <h2>Bikes list</h2>
      <p className='text-right'><b>{total ? 'Total: ' + total : ''}</b></p>
      <ul>
        {bikes.map((bike) => {
          const miliseconds = bike.date_stolen * 1000
          const date = new Date(miliseconds)
          const date_format = date.toLocaleString()

          return (
            <div className="card mb-3 w-100 p-3" style={{cursor: 'pointer'}} key={bike.id} onClick={e => Router.push(`/case/${bike.id}`)}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img style={{ maxWidth: '50%' }}
                    src={bike.thumb ? bike.thumb : 'https://seeklogo.com/images/B/bicycle-traffic-forbidden-logo-505B7DDA01-seeklogo.com.png'}
                    className="img-thumbnail"
                    alt={bike.title}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h4 className="card-title primary"><u>{bike.title} ({bike.frame_colors})</u></h4>
                    <p className="card-text">{bike.description ? bike.description : 'bicycle stolen in the urban perimeter'}</p>
                    <p className="card-text">
                      <small className="text-muted">{date_format}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

      </ul>
    </>
  )
}

export default Bikes
