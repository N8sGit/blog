import React from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import axios from 'axios'


class Main extends React.Component{
 

  // tweets here will be processed without regards for template just an array of templated objects
   pullServer() {
    console.log('fired');
    axios.get(`/get`)
    .then(res => {
     console.log(res)
    })
    setInterval(this.pullServer, 60000);
  }


  constructor(props){
    super(props)
    this.state = {loading: true,  tweets: []}
  }

  componentDidMount(){
    this.pullServer()
    setTimeout(() => this.setState({ loading: false }), 1000);
  }

  render(){
    const {loading, tweets} = this.state
    let {children } = this.props
    console.log(tweets, 'tweets?');

    return (
      loading ?  <div id="loading" style={{opacity: !loading ? 0 : 1, zIndex: !loading ? '-100' : '100'}}>
        <i className="fa fa-spinner fa-pulse" />
      </div> :  
      <div id="top">
         <p>Tweets by the Minute</p>
          <div id="root">
            {children}
          </div>
     </div>)
  }
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Main))

