import React from 'react'
import { connect } from 'react-redux'
type Props = {}

function SignIn({}: Props) {
  return (
    <div>SignIn</div>
  )
}

const mapStateToProps = (state: any) => {
    console.log('signin', state)
    return { music: state.music }
}

export default connect(mapStateToProps, null)(SignIn);