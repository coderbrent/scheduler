/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'

const Navbar = () => {
  const theme = useTheme()

  return (
    <div 
      css={css`
        display: flex; 
        align-items: center;
        justify-content: space-between;
        background-color: ${theme.colors.primary};
      `}
		>
      <div 
        style={{ 
          color: `${theme.colors.secondary}`,
          fontFamily: `${theme.fonts.body}`,
        }}
      >
        Hello
      </div>
	  </div>
  )
}

export default Navbar;