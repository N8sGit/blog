import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {getOnePost} from '.././store/post'
import {formatDate} from '../helperFunctions'
import axios from 'axios'

class PostView extends React.Component {
    componentDidMount = () => {
       let id = this.props.match.params.id
        this.props.getOne(id)
   }
  render(){
    let post = this.props.post
    let htmlText = {__html: post.content}
    return (
         <div className="posts-container">
        <nav id="navbar">
            <div className="nav-links">
              <Link to="/">Home</Link>
            </div>
        </nav>

        <div className="post">
            <h1 id='single-title' className="title">{post.title}</h1>
            <div className="post-text" id="single-text" dangerouslySetInnerHTML={htmlText} />
        </div>

        <div className="post-data" id="single-date">{formatDate(post.createdAt)}</div>
        </div>
        )
    }
}

const mapState = (state) => {
    return {
        post: state.post.onePost
    }
}

const mapDispatch = (dispatch) => {
return (
        {
            getOne: (id) => {
                axios.get(`/getPostById/${id}`)
                    .then(res => {
                        dispatch(getOnePost(res.data.info))
                }   )
            }
        }
    )

}


export default connect(mapState, mapDispatch)(PostView)