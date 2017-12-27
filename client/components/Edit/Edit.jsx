import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class extends Component {
  propTypes = {
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
    >X
    </button>
  )

  renderValue = () => (
    <div>
      <span
        className={styles.value}
        onClick={this.props.onValueClick}
      >
        {this.props.value}
      </span>
      {/* WHY Bez sensu, pokaz przycisk delete jak co? jak klikniesz delete? */}
      {this.props.onDelete ? this.renderDelete() : null}
    </div>
  )

  renderEdit = () => (
    <input
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
