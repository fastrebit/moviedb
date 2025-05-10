import React from 'react'
import MoviesListItem from './MoviesListItem.jsx'
import './MoviesList.css'

const MoviesList = ({ movies, session, rate, addRate }) => {
  return (
    <ul className="MoviesList">
      {movies.map((item) => {
        return (
          <li key={item.id}>
            <MoviesListItem
              title={item['original_title']}
              id={item['id']}
              rating={item['vote_average']}
              image={item['backdrop_path']}
              date={item['release_date']}
              overview={item['overview']}
              genre={item['genre_ids']}
              session={session}
              defaultRaring={item['rating']}
              rate={rate}
              addRate={addRate}
            />
          </li>
        )
      })}
    </ul>
  )
}

export default MoviesList
