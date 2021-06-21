import { useState, useEffect } from 'react'

import SearchInput from './components/SearchInput'
import Table from './components/Table'
import { useAppDispatch, useAppSelector } from './app/hooks'
import {
  searchRepositories,
  clearRepositories,
} from './app/repositories/repositoriesSlice'
import { Repository, SortField } from './app/repositories/types'

import './App.css'
import { SortDirection } from '@material-ui/core'

const TIMEOUT = 500
const PER_PAGE = 10

function App() {
  const dispatch = useAppDispatch()

  const data = useAppSelector((state) => state.repositories)

  const [page, setPage] = useState(1)
  const [sortField, setSortField] = useState<{
    field: SortField | undefined
    direction: SortDirection
  } | null>()
  const [searchValue, setSearchValue] = useState<string>()
  const [searchTimeOut, setSearchTimeOut] = useState<number | undefined>()
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    if (searchValue?.trim()) {
      const sort = sortField?.direction ? sortField.field : undefined
      const order = sortField?.direction ? sortField.direction : undefined
      dispatch(
        searchRepositories({
          value: searchValue,
          page,
          perPage: PER_PAGE,
          sort,
          order,
        })
      )
    } else {
      dispatch(clearRepositories())
    }
  }, [searchValue, page, sortField, dispatch])

  useEffect(() => {
    setRepositories(data.result || [])
  }, [data.result])

  // Handler only sends the request if there was no new character in TIMEOUT milliseconds
  const searchChangeHandler = (value: string) => {
    clearTimeout(searchTimeOut)
    const timer = window.setTimeout(() => {
      setSearchTimeOut(undefined)
      setSearchValue(value)
    }, TIMEOUT)
    setSearchTimeOut(timer)
  }

  const sortChangeHandler = (field: SortField, direction: SortDirection) => {
    setSortField({ field, direction })
  }

  const pageChangeHandler = (page: number) => {
    setPage(page)
  }

  return (
    <div className="App pa2">
      <div className="pa4 tc">
        <SearchInput onChange={searchChangeHandler} />
      </div>
      <div>
        <Table
          loading={data.loading}
          repositories={repositories}
          onPageChange={pageChangeHandler}
          page={page}
          perPage={PER_PAGE}
          total={data.total || -1}
          onSortChange={sortChangeHandler}
        />
      </div>
    </div>
  )
}

export default App
