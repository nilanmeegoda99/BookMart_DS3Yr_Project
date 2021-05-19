import React from 'react'
import { Alert } from 'react-bootstrap'

const Alertmsg = ({ variant, children }) => {
  return <Alert variant={variant}>{children}</Alert>
}
Alertmsg.defaultProps = {
  variant: 'info',
}

export default Alertmsg
