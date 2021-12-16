import Preview from 'components/Preview'

export default {
  title: 'Preview',
}

export const webpage = () => <Preview src="data:text/html,<html style=background:black>" />

export const codesandbox = () => (
  <>
    <Preview src="https://codesandbox.io/s/eq1g8" />
    <Preview src="https://codesandbox.io/s/eq1g8?view=editor" />
  </>
)
