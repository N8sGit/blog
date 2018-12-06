import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAllPosts} from '.././store/post.js'
import store from '.././store'
import axios from 'axios'


class  Home extends React.Component{

  componentDidMount = () => {
    axios.get('/get')
    .then(res => {
      console.log(res, 'response')
        store.dispatch(getAllPosts(res.data.info, res.data.categories))
    })
    .catch(err => console.log(err))
   }

   render(){
    
    return (
    <div>
      <div id="sidebar-container">
      </div>

     <div className="posts-container">

          <div className="posts">
             Hello!  
          </div>
     </div>
  </div>)
   }
}

const mapState = (state) => {
  return {
    posts: state.post.allPosts,
    categories: state.post.allCategories
  }
}

export default connect(mapState)(Home)

