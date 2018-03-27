import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getCategoryPosts} from '.././store/post.js'
import store from '.././store'
import {formatDate} from '../helperFunctions'
import * as data from './checkboxConstants'
import {Link} from 'react-router-dom'

class CategoryView extends React.Component{

    componentDidMount(){
        axios.get(`/getByCat/${this.props.categoryId.name}`)
      .then(res => {
          store.dispatch(getCategoryPosts(res.data.info, res.data.categories))
      })
      .catch(err => console.log(err))
    }
      
   render(){
       let postsDisplay = this.props.posts
       let categoryDisplay = this.props.categories
    return (
    <div className="posts-container">
        <nav id="navbar">
            <div className="nav-links">
              <Link to="/">Home</Link>
               </div>
        </nav>
        <div className="posts">
        {!postsDisplay.length ? <p>There are no posts here yet, but there will be soon!</p> :
            postsDisplay.map(function(post, index){
                return (
                    <div className="post" key={post.id}>
                        <h1>{post.title}</h1>
                        <p>{post.content}</p>
                       
                        <div className="post-data">
                        <p>{formatDate(post.createdAt)}</p>
                            <ul className="post-data-list">
                            {categoryDisplay[index].tags.map(function(category){
                                let categoryLink = category.slice(1)
                                return <div key={post.id}> <Link className="linktext" to={`/categoryView/${categoryLink}`}> {category} </Link> </div>
                            })}
                            </ul>
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
        )
    }

}

const mapStatetoProps = (state, ownProps) => {
    return {
        posts: state.post.categoryPosts,
        categoryId: ownProps.match.params,
        categories: state.post.allCategories
    }
}


export default connect(mapStatetoProps)(CategoryView)
