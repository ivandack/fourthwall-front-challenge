import { useCallback } from 'react'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'

export type SearchInputProps = {
  onChange: (newText: string) => void
}

const SearchInput = ({ onChange }: SearchInputProps): JSX.Element => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target?.value
      onChange(value)
    },
    [onChange]
  )

  return (
    <div>
      <TextField
        id="searchField"
        label="Search Repositories"
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </div>
  )
}

export default SearchInput
