import React, { useContext } from 'react'
import GenreContext from '../context/GenreContext.js'
import './Genre.css'
import { Tag } from 'antd'

const Genre = ({ genre }) => {
  const genreContext = useContext(GenreContext)
  const filteredGenres = genreContext.filter((elem) => genre.includes(elem.id))

  return (
    <div>
      {filteredGenres.map((item) => (
        <Tag className={'genre'} key={item.id}>
          {item.name}
        </Tag>
      ))}
    </div>
  )
}

export default Genre
