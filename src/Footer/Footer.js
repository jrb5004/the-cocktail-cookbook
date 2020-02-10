import React, {Component} from 'react'
import './Footer.css'

class Footer extends Component {
  render() {
    return (
      <section className='Footer'>
          <span className='name'>Joseph Baragona, 2019</span><span className='contact'>Feedback? <a href='mailto:jrb5004@gmail.com'>Email me!</a></span>
      </section>
    )
  }
}

export default Footer;