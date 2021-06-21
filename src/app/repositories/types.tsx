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

export type SearchRepositoriesRequest = {
  value: string
  page?: number
  perPage?: number
  sort?: 'stars' | 'forks' | 'help-wanted-issues' | 'updated'
  order?: 'asc' | 'desc'
}

export type SearchRepositoriesResponse = {
  repositories: Repository[]
  page: number
  total: number
}
