import './profile.scss'

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Barchart from 'components/Barchart'

export default class Profile extends Component {
    static propTypes = {
      repos: PropTypes.array.isRequired,
      events: PropTypes.array.isRequired
    }

  state = {}

  render () {
    // create list of star count for each repo
    const repoStars = this.props.repos.map(function (repo) { return {xval: repo.name, yval: repo.stargazers_count} })

    // create list of forks count for each repo
    const repoForks = this.props.repos.map(function (repo) { return {xval: repo.name, yval: repo.forks_count} })

    // get a list of unique activity dates from events
    const uniqueDates = this.props.events
      .map(({ created_at }) => created_at.split('T')[0])
      .reduce((dates, createdAt) => {
        const count = dates[createdAt] || 0
        dates[createdAt] = count + 1
        return dates
      }, {})

    // map these events to an array
    let dailyActivity = []
    Object.keys(uniqueDates).forEach(function (key) {
      dailyActivity.push({ xval: key, yval: uniqueDates[key] })
    })

    return (
      <div styleName='profile'>
        <h2>Github User Statistics</h2>
        <h3>Stars by repo</h3>
        <Barchart data={repoStars} xLabel='Repos' yLabel='Stars' width={1000} height={500} />
        <h3>Watchers by repo</h3>
        <Barchart data={repoForks} xLabel='Repos' yLabel='Forks' width={1000} height={500} />
        <h3>Daily Activity</h3>
        <Barchart data={dailyActivity} xLabel='Date' yLabel='Number of Events' width={1000} height={500} />
      </div>
    )
  }
}
