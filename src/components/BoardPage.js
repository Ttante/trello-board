import React from 'react'

import Board from './Board'

import './BoardPage.css'

export default class BoardPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columnData: {
        backlog: {
          buttonColor: '#00d1bd',
          columnTitle: 'Backlog',
          tasks: [
            {
              id: 1,
              title: 'Do Work',
              description: 'Do it good'
            }
          ]
        },
        'in-progress': {
          buttonColor: '#49a7f6',
          columnTitle: 'In Progress',
          tasks: [],

        },
        completed: {
          buttonColor: '#7f50ff',
          columnTitle: 'Completed',
          tasks: []
        }
      },
      nextTaskId: 2
    }
  }

  updateColumns(currColumn, targetColumn, task, data) {
    const { columnData, nextTaskId } = this.state
    const updatedTargetTasks = [...columnData[targetColumn].tasks, task.id ? task : {...task, id: nextTaskId}]
    if (!task.id) { this.setState({ nextTaskId: nextTaskId + 1 }) }

    if (currColumn) {
      // update tasks
      const oldTasksCleaned = [...columnData[currColumn].tasks.filter(x => x.id !== task.id)]

      this.setState({
        columnData: {
          ...this.state.columnData,
          [currColumn]: {
            ...this.state.columnData[currColumn],
            tasks: oldTasksCleaned
          },
          [targetColumn]: {
            ...this.state.columnData[targetColumn],
            tasks: updatedTargetTasks
          }
        },
      })
    } else {
      // create tasks
      this.setState({
        columnData: {
          ...this.state.columnData,
          [targetColumn]: {
            ...this.state.columnData[targetColumn],
            tasks: updatedTargetTasks
          }
        }
      })
    }
  }

  render() {
    return (
      <div className="board-page">
        <Board
          columns={this.state.columnData}
          updateColumns={this.updateColumns.bind(this)}
        />
      </div>
    )
  }
}