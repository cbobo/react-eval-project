import './sidebar.scss'

import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Sidebar extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  }

  state = {}

  render () {
    return (
      <div styleName='sidebar'>
        <img styleName='avatar' src={this.props.user.avatar_url} />
        <h2>{this.props.user.name}</h2>
        <p styleName='bio'>{this.props.user.bio}</p>
        <a styleName='websiteLink' href={this.props.user.html_url}>Website</a>
      </div>
    )
  }
}
