import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Table from '.'

const mockRepos = [
  {
    id: '1',
    name: 'Repo 1',
    url: 'https://github.com/user1/repo1',
    owner: { id: '1', login: 'user1', url: 'https://github.com/user1' },
    stars: 15,
    createdAt: '2017-05-15T08:30:00Z',
  },
  {
    id: '2',
    name: 'Repo 2',
    url: 'https://github.com/user2/repo2',
    owner: { id: '2', login: 'user2', url: 'https://github.com/user2' },
    stars: 10,
    createdAt: '2018-06-25T18:13:54Z',
  },
]

describe('Table', () => {
  const pageChangeHanlder = jest.fn()
  const sortChangeHanlder = jest.fn()

  beforeEach(() => {
    pageChangeHanlder.mockReset()
    sortChangeHanlder.mockReset()
  })

  it('should render the empty state if no repos are returned', () => {
    const { queryByText, queryByTestId } = render(
      <Table
        repositories={[]}
        onPageChange={pageChangeHanlder}
        onSortChange={sortChangeHanlder}
      />
    )

    expect(queryByText('No repositories found')).toBeTruthy()
    expect(queryByTestId('loadingState')).toBeFalsy()
    expect(queryByTestId('pagination')).toBeFalsy()
  })

  it('should render loading state if loading = true', () => {
    const { queryByText, queryByTestId } = render(
      <Table
        loading={true}
        repositories={[]}
        onPageChange={pageChangeHanlder}
        onSortChange={sortChangeHanlder}
      />
    )

    expect(queryByText('No repositories found')).toBeFalsy()
    expect(queryByTestId('loadingState')).toBeTruthy()
    expect(queryByTestId('pagination')).toBeFalsy()
  })

  it('should render the given repositories', () => {
    const { queryByText, queryByTestId } = render(
      <Table
        repositories={mockRepos}
        total={mockRepos.length}
        onPageChange={pageChangeHanlder}
        onSortChange={sortChangeHanlder}
      />
    )

    expect(queryByText('No repositories found')).toBeFalsy()
    expect(queryByTestId('loadingState')).toBeFalsy()
    expect(queryByTestId('pagination')).toBeTruthy()

    expect(queryByText(mockRepos[0].name)).toBeTruthy()
    expect(queryByText(mockRepos[1].name)).toBeTruthy()
  })

  it('should react to click on "Next page" pagination button', () => {
    const { getByTitle, queryByTestId } = render(
      <Table
        repositories={mockRepos}
        page={1}
        perPage={1}
        total={mockRepos.length}
        onPageChange={pageChangeHanlder}
        onSortChange={sortChangeHanlder}
      />
    )

    expect(queryByTestId('pagination')).toBeTruthy()

    // Click Next page
    userEvent.click(getByTitle('Next page'))
    expect(pageChangeHanlder).toBeCalledTimes(1)
    expect(pageChangeHanlder).lastCalledWith(2)

    // First page should not have "Previous page" button
    expect(getByTitle('Previous page')).toBeDisabled()
  })

  it('should react to click on "Previous page" pagination button', () => {
    const { getByTitle, queryByTestId } = render(
      <Table
        repositories={mockRepos}
        page={2}
        perPage={1}
        total={mockRepos.length}
        onPageChange={pageChangeHanlder}
        onSortChange={sortChangeHanlder}
      />
    )

    expect(queryByTestId('pagination')).toBeTruthy()

    // Click Previous page
    userEvent.click(getByTitle('Previous page'))
    expect(pageChangeHanlder).toBeCalledTimes(1)
    expect(pageChangeHanlder).lastCalledWith(1)

    // Last page should not have "Next page" button
    expect(getByTitle('Next page')).toBeDisabled()
  })

  it('should react to click on "Stars" header', () => {
    const { getByText } = render(
      <Table
        repositories={mockRepos}
        page={1}
        perPage={2}
        total={mockRepos.length}
        onPageChange={pageChangeHanlder}
        onSortChange={sortChangeHanlder}
      />
    )

    userEvent.click(getByText('Stars'))
    expect(sortChangeHanlder).toBeCalledTimes(1)
    expect(sortChangeHanlder).lastCalledWith('stars', 'asc')

    userEvent.click(getByText('Stars'))
    expect(sortChangeHanlder).toBeCalledTimes(2)
    expect(sortChangeHanlder).lastCalledWith('stars', 'desc')

    userEvent.click(getByText('Stars'))
    expect(sortChangeHanlder).toBeCalledTimes(3)
    expect(sortChangeHanlder).lastCalledWith('stars', false)

    userEvent.click(getByText('Stars'))
    expect(sortChangeHanlder).toBeCalledTimes(4)
    expect(sortChangeHanlder).lastCalledWith('stars', 'asc')
  })
})
