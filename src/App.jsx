import React, { useEffect } from 'react'
import MoviesList from './component/MoviesList.jsx'
import { searchMovies, guestSession, ratedMovie, getGenres } from './api/api.js'
import { Spin, Alert, Tabs } from 'antd'
import MyInput from './component/UI/MyInput.jsx'
import MyPagination from './component/UI/MyPagination.jsx'
import debounce from 'lodash/debounce'
import GenreContext from './context/GenreContext.js'
import './App.css'

function App() {
  const [movies, setMovies] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [errors, setErrors] = React.useState({ status: false, message: '' })
  const [search, setSearch] = React.useState('return')
  const [searchPage, setSearchPage] = React.useState(1)
  const [ratedPage, setRatedPage] = React.useState(1)
  const [session, setSession] = React.useState('')
  const [ratedMovies, setRatedMovies] = React.useState([])
  const [activeTab, setActiveTab] = React.useState('1')
  const [genres, setGenres] = React.useState({})

  const debouncedSetSearch = debounce(setSearch, 500)

  useEffect(() => {
    if (!navigator.onLine) {
      setErrors({ status: true, message: 'Нет подключения к интернету' })
      setLoading(false)
      return
    }
    ;(async () => {
      try {
        setLoading(true)
        const data = await searchMovies(search, searchPage)
        setMovies(data)
      } catch (error) {
        setErrors({ status: true, message: error.message })
      } finally {
        setLoading(false)
      }
    })()
  }, [search, searchPage])

  useEffect(() => {
    if (activeTab === '2') {
      ;(async () => {
        try {
          setLoading(true)
          const data = await ratedMovie(session, ratedPage)
          setRatedMovies(data)
          console.log(data)
        } catch (error) {
          setErrors({ status: true, message: error.message })
        } finally {
          setLoading(false)
        }
      })()
    }
  }, [ratedPage, activeTab])

  useEffect(() => {
    ;(async () => {
      try {
        const data = await guestSession()
        setSession(data['guest_session_id'])
      } catch (error) {
        setErrors({ status: true, message: error.message })
      }
    })()
  }, [])
  useEffect(() => {
    ;(async () => {
      try {
        const data = await getGenres()
        setGenres(data['genres'])
      } catch (error) {
        setErrors({ status: true, message: error.message })
      }
    })()
  }, [])

  const onChange = (key) => {
    setActiveTab(key)
    setErrors({ status: false, message: '' })
  }
  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <MyInput className={'search'} search={search} debouncedSetSearch={debouncedSetSearch} />
          <Spin spinning={loading}>
            {errors.status ? (
              <Alert type="error" message="error" description={errors.message || 'Ошибка отправки запроса'} />
            ) : movies['total_results'] > 0 ? (
              <MoviesList movies={movies.results} session={session} />
            ) : (
              <span>Нет результатов</span>
            )}
          </Spin>
          <MyPagination total={movies['total_results']} setPage={setSearchPage} />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          <Spin spinning={loading}>
            {errors.status ? (
              <Alert type="error" message="error" description={errors.message || 'Ошибка отправки запроса'} />
            ) : ratedMovies['total_results'] > 0 ? (
              <MoviesList movies={ratedMovies.results} session={session} />
            ) : (
              <span>Нет результатов</span>
            )}
          </Spin>
          <MyPagination total={ratedMovies['total_results']} setPage={setRatedPage} />
        </>
      ),
    },
  ]
  return (
    <main>
      <div className="container">
        <GenreContext.Provider value={genres}>
          <Tabs className={'tabs'} items={items} onChange={onChange} centered />
        </GenreContext.Provider>
      </div>
    </main>
  )
}

export default App
