/** @jsx jsx */
import React, { useReducer } from 'react'
import { css, jsx } from '@emotion/core'
import Navbar from './Components/Navbar'
import UploadForm from './Components/UploadForm'
import { ThemeProvider } from 'emotion-theming'

const theme = {
	colors: {
		primary: `#555`,
		secondary: `white`
	},
	fonts: {
		title: `Roboto Slab`,
		body: `Poppins`
	}
}

const App = () => {
  return (
	<>
	  <ThemeProvider theme={theme}>
			<Navbar />
			<UploadForm />
	  </ThemeProvider>
	</>
  )
}

export default App;