import React from 'react'

import Column from './Column'

import './Board.css'

export default class Board extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      test: 'hey'
    }
  }

  render() {
    const { columns, updateColumns } = this.props

    return (
      <div className="board">
        {Object.keys(columns).map(key =>
          <Column
            key={key}
            data={columns[key]}
            columnName={key}
            otherColumns={Object.keys(columns).filter(c => c !== key).map(c => columns[c].columnTitle)}
            updateColumns={updateColumns}
          />)
        }
      </div>
    )
  }
}