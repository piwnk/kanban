import { connect } from 'react-redux';

import Note from './Note';

import * as noteActions from './NoteActions';

// WHY not component body

// WHY as object in instruction (arrow in Lane part)
const mapDispatchToProps = {
  ...noteActions,
};

export default connect(null, mapDispatchToProps)(Note);
