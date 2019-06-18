import React from 'react'

import './Card.css'

const buttonColors = ['#49a7f6', '#00d1bd', '#7f50ff', '#ff50b6']

const columnMap = {
  'Backlog': 'backlog',
  'In Progress': 'in-progress',
  'Completed': 'completed'
}

export default class Card extends React.Component {
  moveCard(evt, targetColumnName) {
    const { columnName, task, updateColumns } = this.props
    console.log('columnMap: ', columnMap)
    console.log('targetColumnName: ', targetColumnName)
    
    updateColumns(columnName, columnMap[targetColumnName], task, {})
  }

  renderButton(buttonColumnName, index) {
    const { otherColumns } = this.props
    
    console.log('buttonColumnName: ', buttonColumnName)
    return (
      <button 
        onClick={(e) => this.moveCard(e, buttonColumnName)}
        key={buttonColumnName}
        style={{
          background: `${buttonColors[index]}`,
          width: `${(100 / otherColumns.length)}%`
        }}
      >
        {buttonColumnName}
      </button>
    )
  }

  render() {
    const { otherColumns, task } = this.props
    const { description, deadline, title } = task

    console.log('otherColumns: ', otherColumns)

    return (
      <div className="card-wrapper">
        <div className="card">
          <h4 className="title">
            {title}
          </h4>
          <div className="description">
            {description}
          </div>
          <div className="deadline">
            {deadline}
          </div>
        </div>

        <div className="card-button-wrapper">
          {otherColumns.map((c, idx) => this.renderButton(c, idx))}
        </div>
      </div>
    )
  }
}