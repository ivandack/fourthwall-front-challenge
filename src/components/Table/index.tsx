import { DateTime } from 'luxon'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableFooter from '@material-ui/core/TableFooter'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import TablePagination from '@material-ui/core/TablePagination'

import { Repository } from '../../app/repositories/types'
import EmptyState from './EmptyState'
import LoadingState from './LoadingState'

export type RepositoriesTableProps = {
  repositories: Repository[] | null
  page?: number
  total?: number
  loading?: boolean
  onPageChange: (page: number) => void
}

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell>Name</TableCell>
      <TableCell>Owner</TableCell>
      <TableCell>Stars</TableCell>
      <TableCell>Created At</TableCell>
    </TableRow>
  </TableHead>
)

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
    <TableRow>
      <TableCell height={530} colSpan={4} align="center">
        <LoadingState />
      </TableCell>
    </TableRow>
  </TableBody>
)

const PopulatedTableBody = ({
  repositories,
  page = 1,
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
        <TableRow>
          <TablePagination
            count={total || -1}
            onChangePage={(_, page) => {
              onPageChange(page + 1)
            }}
            page={page - 1}
            rowsPerPage={15}
            rowsPerPageOptions={[]}
            colSpan={4}
          />
        </TableRow>
      </TableFooter>
    )}
  </>
)

const RepositoriesTable = (props: RepositoriesTableProps) => (
  <TableContainer component={Paper}>
    <Table>
      <TableHeader />
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

export default RepositoriesTable
