import React from 'react'

class PostView extends React.Component {
    componentDidMount = () => {
       let id = this.props.match.params.id
        this.props.getOne(id)
   }
  render(){
    let post = this.props.post
    let htmlText = {__html: post.content}
    return (
    <div>
        <nav id="navbar">
            <div className="nav-links">
                <Link to="/">Home</Link>
            </div>
        </nav>

        <div className="posts-container">
            <div className="post">
                    <h1 id="single-title" className="title">{post.title}</h1>
                    { post.image ? <img src ={post.image} /> : null}
        </div>
            <div className="post-data" id="single-date">{formatDate(post.createdAt)}</div>
        </div>
    </div>
        )
    }
}