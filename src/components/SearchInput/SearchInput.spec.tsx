import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchInput from '.'

describe('SearchInput', () => {
  it('should call onChange when the input changes', () => {
    const changeHanlder = jest.fn()
    const { queryByLabelText } = render(
      <SearchInput onChange={changeHanlder} />
    )
    userEvent.type(queryByLabelText('Search Repositories'), 'Repo-name')
    expect(changeHanlder.mock.calls.length).toBe(9)
  })
})
