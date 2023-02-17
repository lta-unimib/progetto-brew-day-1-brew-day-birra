import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import MButton from './MButton';

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default class Modal extends React.Component {
  render() {
    return (
        <Dialog
          open={this.props.showModal}
          onClose={() => this.props.setShowModal(false)}
          PaperComponent={PaperComponent}
          aria-labelledby="ModalTitle"
          fullWidth={true}
          maxWidth={'md'}
          className='modale'
          aria-label='Modal'
        >
          <DialogTitle style={{ cursor: 'move' }} id="ModalTitle">
          </DialogTitle>
          <DialogContent>
          {this.props.children}
          </DialogContent>
          <DialogActions>
            <MButton autoFocus onClick={() => this.props.setShowModal(false)} text="Cancel"/>
          </DialogActions>
        </Dialog>
    );
  }
}
