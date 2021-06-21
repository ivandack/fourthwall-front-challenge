import { Story, Meta } from '@storybook/react'

import LoadingState from './LoadingState'

export default {
  title: 'Components/RepositoriesTable',
  component: LoadingState,
} as Meta

const Template: Story = (args) => (
  <div style={{ backgroundColor: 'white', width: 600, height: 350 }}>
    <LoadingState {...args} />
  </div>
)

export const Normal = Template.bind({})
Normal.args = {}
