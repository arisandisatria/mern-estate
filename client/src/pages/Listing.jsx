import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing() {
  SwiperCore.use([Navigation])
  const [listing, setListing] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const params = useParams()

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true)
        const res = await fetch(`/api/listing/get/${params.listingId}`)
        const data = await res.json()
        if (data.success == false) {
          setError(true)
          setLoading(false)
          return
        }
        setListing(data)
        setLoading(false)
        setError(false)
      } catch (error) {
        setError(true)
        setLoading(false)
      }
    }

    fetchListing()
  },[params.listingId])

  return (
    <main>
      {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
      {error && (<div className='text-center my-7 '>
        <p className='text-2xl'>Something went wrong!</p>
        <Link to={`/profile`}>
          <button className="my-7 text-slate-700 uppercase hover:underline">Back to Profile</button>
        </Link>
      </div>)}
      {listing && 
      <>
        <Swiper navigation>
            {listing.imageUrls?.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
      </>}
    </main>
  )
}
