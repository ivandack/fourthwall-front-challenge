import { useState } from 'react'
import { DateTime } from 'luxon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TableCell, { SortDirection } from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'

import TablePagination from '@material-ui/core/TablePagination'

import { Repository, SortField } from '../../types/repositories'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'

const SORT_OPTIONS: SortDirection[] = [false, 'asc', 'desc']

export type RepositoriesTableProps = {
  repositories: Repository[] | null
  page?: number
  perPage?: number
  total?: number
  loading?: boolean
  onPageChange: (page: number) => void
  onSortChange: (field: SortField, direction: SortDirection) => void
}

const EmptyTableBody = () => (
  <TableBody>
    <TableRow>
      <TableCell colSpan={4} align="center">
        <EmptyState message="No repositories found" />
      </TableCell>
    </TableRow>
  </TableBody>
)

const LoadingTableBody = () => (
  <TableBody>
    <TableRow data-testid="loadingState">
      <TableCell height={530} colSpan={4} align="center">
        <LoadingState />
      </TableCell>
    </TableRow>
  </TableBody>
)

const PopulatedTableBody = ({
  repositories,
  page = 1,
  perPage = 10,
  total = -1,
  onPageChange,
}: RepositoriesTableProps) => (
  <>
    <TableBody>
      {repositories ? (
        repositories.map((r) => (
          <TableRow key={r.id}>
            <TableCell>
              <a href={r.url} target="_blank" rel="noreferrer">
                {r.name}
              </a>
            </TableCell>
            <TableCell>
              <a href={r.owner.url} target="_blank" rel="noreferrer">
                {r.owner.login}
              </a>
            </TableCell>
            <TableCell>{r.stars}</TableCell>
            <TableCell>
              {DateTime.fromISO(r.createdAt).toLocaleString()}
            </TableCell>
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell align="center">
            <EmptyState message="No repositories found" />
          </TableCell>
        </TableRow>
      )}
    </TableBody>
    {total > 0 && (
      <TableFooter>
        <TableRow data-testid="pagination">
          <TablePagination
            count={total || -1}
            onChangePage={(_, page) => {
              onPageChange(page + 1)
            }}
            page={page - 1}
            rowsPerPage={perPage}
            rowsPerPageOptions={[]}
            colSpan={4}
          />
        </TableRow>
      </TableFooter>
    )}
  </>
)

const RepositoriesTable = (props: RepositoriesTableProps) => {
  const [starsSort, setStarsSort] = useState<SortDirection>(false)

  const starsSortHandler = () => {
    const index = SORT_OPTIONS.findIndex((o) => o === starsSort)
    const newSort = SORT_OPTIONS[(index + 1) % SORT_OPTIONS.length]
    setStarsSort(newSort)
    props.onSortChange('stars', newSort)
  }

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell sortDirection={starsSort}>
              <TableSortLabel
                active={!!starsSort}
                direction={starsSort || 'desc'}
                onClick={starsSortHandler}
              >
                Stars
              </TableSortLabel>
            </TableCell>
            <TableCell>Created At</TableCell>
          </TableRow>
        </TableHead>

        {props.loading ? (
          <LoadingTableBody />
        ) : props.repositories?.length ? (
          <PopulatedTableBody {...props} />
        ) : (
          <EmptyTableBody />
        )}
      </Table>
    </TableContainer>
  )
}

export default RepositoriesTable
