import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {add} from '.././store/post.js'
import * as data from './checkboxConstants.js'
import Checkbox from './checkbox.js'
import Editor from './editor.js'
import AdminPostBar from './adminPostBar.js'
import {logout} from '../store'
import {Login} from '../components'


let checkboxEls = Object.keys(data).map(function (key) {
    return key;
 });

const initialState = {
    text: '',
    title: '',
    category: [],
    selectedId: '',
    selectedTitle: '',
    selected: {},
    selectedCategories: [],
}

class Admin extends React.Component{
    constructor(props){
        super(props)
        this.state = {...initialState, isLoggedIn: this.props.isLoggedIn}
    }

    componentDidMount = () => {
        axios.get('/get')
            .then(res => {
                this.setState({titles: [...res.data.info]})
            })
    }

    setSidebar = (item) => {
        this.setState({ selected: item, text: item.content,  selectedId: item.id, title: item.title})
    }

    componentWillMount = () => {
        this.selectedCheckboxes = new Set();
      }

    toggleCheckbox = label => {
        if (this.selectedCheckboxes.has(label)) {
          this.selectedCheckboxes.delete(label);
        } else {
          this.selectedCheckboxes.add(label);
        }
    }

    reset = () => {
        this.setState(initialState)
    }

    postCategories = (category) => {
        axios.post('/categories', {postId: this.state.selectedId, category: category})
    }

    handleFormSubmit = formSubmitEvent => {
       formSubmitEvent.preventDefault();

        for (const checkbox of this.selectedCheckboxes) {
            this.state.category.push(checkbox)
        }

        let categories = this.state.category

        for (let i = 0 ; i < categories.length; i++){
            this.postCategories(categories[i])
        }


    }
    createCheckbox = label => {
        let catSet = new Set(this.props.selectedCategories)
        let checkStatus;
        if (catSet.has(label)){
            checkStatus = true
        }
        else {
            checkStatus = false
            catSet.delete(label)
        }
        return (<Checkbox
                    label={label}
                    handleCheckboxChange={this.toggleCheckbox}
                    key={label}
                    boxStatus = {checkStatus}
                />
           )
     }

    createCheckboxes = () => (
        checkboxEls.map(this.createCheckbox)
    )


    onChangeText = (event) => {
            this.setState({text: event.target.value})
    }

    onChangeTitle = (event) => {
        this.setState({title: event.target.value})
    }


    render(){
        console.log(this.props.isLoggedIn, 'isLoggedIn');
return this.props.isLoggedIn ? (
    <div id="admin-page">
        <div id='admin-large'>
        <a href="#" onClick={this.props.handleClick}> log out </a>
                <p> The currently selected post is: {this.state.title} </p>
            <form onSubmit={this.handleFormSubmit}>
                {this.createCheckboxes()}

                <button className="btn btn-default" type="submit" >Save</button>
                
                <button
                    className="btn btn-default" type="submit" onClick={() => {
                    window.location.reload()
                }} > Clear
                </button>
            </form>

            <div className ="textFields">
                <form>
                    <textarea
                        id="titleInput" className="field" onChange={this.onChangeTitle.bind(this)}
                        value={this.state.title} rows="1" cols="100" placeholder="title" 
                    />

                    <Editor
                        className="field" placeholder={'Write here'} selectedId={this.state.selectedId}
                        title={this.state.title} text={this.state.text} 
                    />
                <div className="button-parent">
                    <button
                        className="btn btn-default" type="button" onClick={ () => {this.reset()}
                        }>
                            Clear
                    </button>
                </div>
                </form>
            </div>
        </div>
        <div id="admin-small"> 
                <div id="titleDisplay">
            { <AdminPostBar setSidebar = {this.setSidebar.bind(this)} />}
            </div>
        </div>
    </div>
        ) : (
    <div>
    <Login />
    </div>)
    }
}
//This map state will have to be altered to reflect changes in the editor
const mapState = (state) => {
    return {
       text: state.post.text,
       title: state.post.title,
       selectedCategories: state.post.allCategories,
       isLoggedIn: !!state.user.id
    }
  }

const mapDispatch = (dispatch) => {
    return {
        add (text, title){
            dispatch(add(text, title))
        },
        handleClick() {
            dispatch(logout())
          }
      }
    }
export default connect(mapState, mapDispatch)(Admin)

