import { Story, Meta } from '@storybook/react'

import SearchInput, { SearchInputProps } from './'

export default {
  title: 'Components/SearchInput',
  component: SearchInput,
} as Meta

const Template: Story<SearchInputProps> = (args) => <SearchInput {...args} />

export const Primary = Template.bind({})
Primary.args = {}
