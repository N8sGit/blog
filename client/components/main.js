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
     this.setState({tweets: res.data.output})
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

//     content: "3 years ago today released #Purpose. Thank you"
// imgUrl: "http://pbs.twimg.com/profile_images/898295311893880832/bCps4HFV_normal.jpg"
// retweets: 78522
// url: "https://t.co/r6Zj8zy1lK"


// user name
// - user screen name (@whatever)
// - user profile image
// - tweet content
// - number of retweets
// - direct link to the tweet


//return {content: value.text, url: value.user.url, retweets: value.retweet_count, imgUrl: value.user.profile_image_url }

    return (
      loading ?  <div id="loading" style={{opacity: !loading ? 0 : 1, zIndex: !loading ? '-100' : '100'}}>
        <i className="fa fa-spinner fa-pulse" />
      </div> :  
      <div id="top">
         <p>Tweets by the Minute</p>

      <div id="root">
      {
        tweets.map(function(tweet){
        return (
        <div className="posts-container">
          <div className="post">
                  <h1 id="single-title" className="title">@justinbieber</h1>
                  { tweet.imgUrl ? <img src ={tweet.imgUrl} /> : null}
                  <div className="post-text"> {tweet.content}</div>
          </div>
          
          <div className="post-data" id="single-date">Link:{tweet.url}</div>
          <div className="post-data" id="single-date"> Retweet count: {tweet.retweets}</div>
        
        </div>
        )
       })
      }
        
      </div>
     </div>
    )}
}


// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect()(Main))

