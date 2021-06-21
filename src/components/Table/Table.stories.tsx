import { SortDirection } from '@material-ui/core'
import { Story, Meta } from '@storybook/react'
import { SortField } from '../../app/repositories/types'

import RepositoriesTable, { RepositoriesTableProps } from './'

export default {
  title: 'Components/Table',
  component: RepositoriesTable,
} as Meta

const Template: Story<RepositoriesTableProps> = (args) => (
  <RepositoriesTable {...args} />
)

export const Normal = Template.bind({})
Normal.args = {
  repositories: [
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
  ],
  page: 1,
  perPage: 1,
  total: 2,
  onPageChange: (page: number) => console.log('Change to page', page),
  onSortChange: (field: SortField, direction: SortDirection) =>
    console.log(field, 'sort:', direction),
}

export const EmptyState = Template.bind({})
EmptyState.args = {
  onPageChange: (page: number) => console.log('Change to page', page),
  onSortChange: (field: SortField, direction: SortDirection) =>
    console.log(field, 'sort:', direction),
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  onPageChange: (page: number) => console.log('Change to page', page),
  onSortChange: (field: SortField, direction: SortDirection) =>
    console.log(field, 'sort:', direction),
}
