import { Story, Meta } from '@storybook/react'

import RepositoriesTable, { RepositoriesTableProps } from './'

export default {
  title: 'Components/RepositoriesTable',
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
  ],
  page: 0,
  total: 20,
  onPageChange: (page: number) => console.log('Change to page', page),
}

export const NoRepos = Template.bind({})
NoRepos.args = {}
