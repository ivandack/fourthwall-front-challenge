import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { fetchRepositories } from './repositoriesAPI'
import { Repository } from '../../types/repositories'

export interface RepositoriesState {
  total: number | null
  result: Repository[] | null
  loading: boolean
  error: string | null
}

const initialState: RepositoriesState = {
  total: null,
  result: null,
  loading: false,
  error: null,
}

export const searchRepositories = createAsyncThunk(
  'repositories/search',
  fetchRepositories
)

export const repositoriesSlice = createSlice({
  name: 'repositories',
  initialState,
  reducers: {
    clearRepositories: (state) => {
      state.loading = false
      state.error = null
      state.total = null
      state.result = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchRepositories.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(searchRepositories.fulfilled, (state, action) => {
        state.loading = false
        state.total = action.payload.total
        state.result = action.payload.repositories
      })
      .addCase(searchRepositories.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || null
        state.total = null
        state.result = null
      })
  },
})

export const { clearRepositories } = repositoriesSlice.actions

export default repositoriesSlice.reducer
