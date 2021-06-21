import { Octokit } from '@octokit/rest'

import { SearchRepositoriesRequest, SearchRepositoriesResponse } from './types'

const octokit = new Octokit()

export async function fetchRepositories({
  value,
  page = 1,
  perPage = 15,
  sort,
  order,
}: SearchRepositoriesRequest): Promise<SearchRepositoriesResponse> {
  try {
    const response = await octokit.rest.search.repos({
      q: value,
      per_page: perPage,
      page: page + 1,
      sort,
      order,
    })
    const repositories = response.data.items.map((r) => ({
      id: `${r.id}`,
      name: r.name,
      stars: r.stargazers_count,
      url: r.url,
      createdAt: r.created_at,
      owner: {
        id: `${r.owner.id}`,
        login: r.owner.login,
        url: r.owner.url,
      },
    }))
    return {
      repositories,
      page,
      total: response.data.total_count,
    }
  } catch (err) {
    console.error('Error fetching repositories:', err)
    throw err
  }
}
