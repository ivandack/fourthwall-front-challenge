import CssBaseline from '@material-ui/core/CssBaseline'

import 'tachyons/css/tachyons.min.css'

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <CssBaseline>
      <Story />
    </CssBaseline>
  ),
]
