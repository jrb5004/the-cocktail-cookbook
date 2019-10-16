import React, {Component} from 'react'
import { withRouter } from "react-router-dom"
import './ReviewForm.css'
import ApiContext from '../ApiContext'
import config from '../config'
const BASE_URL = 'https://damp-reaches-42499.herokuapp.com'


class ReviewForm extends Component {
    static defaultProps ={
      updateRecipe: () => {},
    }

    static contextType = ApiContext;

    constructor() {
      super();
      this.state = {
          review: '',
      }
      this.handleNewReview = this.handleNewReview.bind(this)
    } 

    setReview(event) {
        this.setState({
            review:event.target.value
        })
      } 

    handleNewReview = e => {
      e.preventDefault()
      const { recipeId } = this.props.match.params
  
      if (!this.state.review || this.state.review.trim() == '') { 
        alert('text is required') 
        return 
      }
  
      let body = {
        review: this.state.review,
      }

      fetch(`${BASE_URL}/api/cocktails/${recipeId}/reviews`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        },
        method: 'PATCH',
        body: JSON.stringify(body)
        })
  
        .then(res => {
          if (!res.ok)
            return (Promise.reject('Reject error'))
          return res.json() 
        })
        .then((recipe) => {
          this.context.updateRecipe(recipe)
          this.setState ({
            review: ''
          })
        })
        .catch(error => {
          console.error({ error })
        })
      }

    render() {
      return (
        <div className='NewReview'>
          <form onSubmit={this.handleNewReview}>
              <div>
                <h3>Leave a Review:</h3>
                <input type='text' name='review' placeholder='enter review here' value={this.state.review} onChange={(e) => this.setReview(e)} required></input>
              </div>
              <button type='submit'>Submit Review!</button>  
          </form>
        </div>
      )
  }
}

export default withRouter(ReviewForm);