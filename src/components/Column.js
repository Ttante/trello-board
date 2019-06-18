import React from 'react'

import Card from './Card'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import './Column.css'

export default class Column extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      creatingTask: false,
      title: '',
      description: ''
    }
  }

  cancelCreateTask() {
    this.setState({ creatingTask: false })
  }

  createTask() {
    this.setState({ creatingTask: true })
  }

  submitTask() {
    // update tasks
    const { columnName, updateColumns } = this.props
    const { description, title } = this.state

    updateColumns(null, columnName, {
      description,
      title
    })

    this.setState({ creatingTask: false })
  }

  updateTextField(evt, field) {
    this.setState({ [field]: evt.target.value })
  }

  render() {
    const { creatingTask } = this.state
    const { columnName, data, otherColumns, updateColumns } = this.props
    const { buttonColor, columnTitle, tasks } = data

    return (
      <React.Fragment>

        <div className="column">
          <h3>{columnTitle}</h3>

          {tasks.map(t =>
            <Card
              key={t.title}
              columnName={columnName}
              task={t}
              otherColumns={otherColumns}
              updateColumns={updateColumns}
            />
          )}

          <button
            className="create-button"
            onClick={this.createTask.bind(this)}
            style={{ background: buttonColor }}
          >
            Create Task
          </button>
        </div>

        {creatingTask &&
          <div className="overlay">
            <div className="create-task-form">
              <TextField
                name="title"
                label="Title"
                onChange={e => this.updateTextField(e, 'title')}
                style={{ marginRight: '5%', width: '40%' }}
                type="text" 
              />
              <TextField
                name="description"
                label="Description"
                onChange={e => this.updateTextField(e, 'description')}
                style={{ width: '40%' }}
                type="text"
              />

              <div className="button-wrap">
                <Button
                  onClick={this.cancelCreateTask.bind(this)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  onClick={this.submitTask.bind(this)}
                >
                  Create
                </Button>
              </div>
            </div>
          </div>
        }
      </React.Fragment>
    )
  }
}