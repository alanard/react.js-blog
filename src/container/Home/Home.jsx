import React, { Component } from 'react'
import BlogPost from '../BlogPost/BlogPost'

class Home extends Component {
  state = {
    showComponent: true
  }

  componentDidMount() {
    // setTimeout(() => {
    //   this.setState({
    //     showComponent: false
    //   })
    // }, 5000)
  }
  render() {
    return (
      <div>
        {/* TUTORIAL PEMANGGILAN API MENGGUNAKAN JSON PLACEHOLDER TYPECODE */}
        < BlogPost />
      </div>
    )
  }
}

export default Home