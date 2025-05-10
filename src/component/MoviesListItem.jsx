import React from 'react'
import './MoviesListItem.css'
import Genre from './Genre.jsx'
import description from '../utils/utils.js'

import { Rate } from 'antd'
import MyRating from './UI/MyRating.jsx'
import { addRating } from '../api/api.js'
import { format } from 'date-fns'

const MoviesListItem = ({
  title,
  image,
  date,
  overview,
  genre,
  id,
  rating,
  session,
  defaultRaring = 0,
  addRate,
  rate,
}) => {
  let formatDate
  if (!!date) {
    formatDate = format(new Date(date), 'MMMM dd, yyyy')
  } else {
    formatDate = 'Unknown Date'
  }

  async function handleRateChange(value) {
    addRate(id, value)
    try {
      await addRating(id, session, value)
    } catch (err) {
      console.error('Ошибка при добавлении рейтинга', err)
    }
  }
  return (
    <div className="movie">
      <img
        alt={title}
        className={'movie__image'}
        src={image ? 'https://image.tmdb.org/t/p/original' + image : '/nullPhoto.jpg'}
      />
      <div className="movie__header">
        <h3 className={'movie__title'}>{description(title, 15)}</h3>
        <MyRating className={'movie__rating'} rating={rating} />
      </div>
      <span className={'movie__date'}>{formatDate}</span>
      <Genre className={'movie__genre'} genre={genre} />
      <span className={'movie__description'}>{description(overview, 210)}</span>
      <Rate
        className="movie__rate"
        allowHalf
        count={10}
        value={(rate && rate[id]) ?? defaultRaring}
        onChange={handleRateChange}
        style={{ fontSize: '16px' }}
      />
    </div>
  )
}

export default MoviesListItem
