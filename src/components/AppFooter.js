import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://github.com/ilyassoh" target="_blank" rel="noopener noreferrer">
          L-yes
        </a>
        <span className="ms-1">&copy; 2024 IIR4_G1.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
