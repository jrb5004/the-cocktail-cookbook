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

    /* setReview = event => {
        const newReview = this.state.reviews.push(event.target.value)
        this.setState({
            reviews: newReview
        })
    } */

    setReview(event) {
        this.setState({
            review:event.target.value
        })
      } 

    handleNewReview = e => {
      e.preventDefault()
      console.log (this.state)
  
      const { recipeId } = this.props.match.params
  
      if (!this.state.review || this.state.review.trim() == '') { 
        alert('text is required') 
        return 
      }
  
      let body = {
        review: this.state.review,
      }

      console.log(body)
  
  
      fetch(`${BASE_URL}/api/cocktails/${recipeId}/reviews`, {
        headers: {
          'content-type': 'application/json',
          'Authorization': `Bearer ${config.API_KEY}`
        },
        method: 'PATCH',
        body: JSON.stringify(body)
      })
  
        .then(res => {
          console.log(res)
          if (!res.ok)
            return (Promise.reject('Reject error'))
          return 
        })
        .then(() => {
          this.context.updateRecipe(recipeId)
          this.props.history.goBack()
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
                <label>Leave a Review</label>
                <input type="text" name="review" placeholder="leave a review here" onChange={(e) => this.setReview(e)} required></input>
              </div>
              <button type="submit">Submit Review!</button>  
          </form>
        </div>
      )
  }
}

export default withRouter(ReviewForm);