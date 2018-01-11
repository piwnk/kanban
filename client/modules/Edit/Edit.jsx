import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Edit.css';

export default class extends Component {
  static propTypes = {
    value: PropTypes.string,
    onUpdate: PropTypes.func,
    onValueClick: PropTypes.func,
    onDelete: PropTypes.func,
    editing: PropTypes.bool,
  }

  checkEnter = (e) => {
    if (e.key === 'Enter') {
      this.finishEdit(e);
    }
  }

  finishEdit = (e) => {
    if (this.props.onUpdate) {
      this.props.onUpdate(e.target.value.trim());
    }
  }

  renderDelete = () => (
    <button
      className={styles.delete}
      onClick={this.props.onDelete}
    >
      <i className="fa fa-remove" />
    </button>
  )

  renderValue = () => (
    <div
      className={styles.item}
      onClick={this.props.onValueClick}
    >
      <span
        className={styles.value}
      >
        {this.props.value}
      </span>
      {this.props.onDelete ? this.renderDelete() : null}
    </div>
  )

  renderEdit = () => (
    <input
      // <textarea
      className={styles.input}
      type="text"
      defaultValue={this.props.value}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
      autoFocus
    />
  )

  render = () => (
    <div>
      {this.props.editing ? this.renderEdit() : this.renderValue()}
    </div>
  )

}
