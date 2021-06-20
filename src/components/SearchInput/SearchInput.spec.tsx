import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SearchInput from '.'

describe('SearchInput', () => {
  it('should call onChange when the input changes', () => {
    const changeHanlder = jest.fn()
    const { queryByLabelText } = render(
      <SearchInput onChange={changeHanlder} />
    )

    const testValue = 'Repo-name'
    userEvent.type(queryByLabelText('Search Repositories'), testValue)
    expect(changeHanlder.mock.calls.length).toBe(testValue.length)
    const [lastCallArgument] = changeHanlder.mock.calls.slice(-1)[0]
    expect(lastCallArgument).toBe(testValue)
  })
})
