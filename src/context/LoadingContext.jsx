import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

export const LoadingContext = createContext()

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
