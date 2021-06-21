export type Repository = {
  id: string
  name: string
  url: string
  stars: number
  createdAt: string
  owner: {
    id: string
    login: string
    url: string
  }
}

export type SortField = 'stars' | 'forks' | 'help-wanted-issues' | 'updated'

export type SearchRepositoriesRequest = {
  value: string
  page?: number
  perPage?: number
  sort?: SortField
  order?: 'asc' | 'desc'
}

export type SearchRepositoriesResponse = {
  repositories: Repository[]
  page: number
  total: number
}
