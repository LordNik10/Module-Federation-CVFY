import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { useModal } from 'features/modal/context';
// import Button from '../MUIOverride/Button/Button';

/**
 * Represents a modal.
 * @constructor
 * @param {boolean} isModalOpen - A boolean stating if the modal is open or not.
 * @param {function} onClose - The function provided from the parent component for modal closing.
 * @param {ReactElement} content - The element provided by the parent component that will be showed as the main content.
 * @param {string} title - The modal's header title.
 * @param {boolean} isPending - A boolean disabling action buttons.
 * @param {object} cancelBtn - An object that carries a label string for the cancel button and a cb function when pressed.
 * @param {object} actionBtn -An object that carries a label string for the action button and a cb function when pressed.
 * @param {string} maxWidth - A string stating the modal's maximum width.You can choose from: xs, sm, md, lg, xl.
 * @param {boolean} disableClosing - A boolean stating if the user is disallowed to close the modal by clicking on the backdrop or pressing Esc key.
 */

function CustomModal() {
  const { modalInfo, modalClose } = useModal();
  const {
    isModalOpen = false,
    title,
    content,
    maxWidth = 'md',
    disableClosing = false,
    isPending = false,
    actionBtn = null,
    cancelBtn = null,
  } = modalInfo;

  function closeHandler(actionOne: boolean, actionTwo: boolean) {
    return actionOne || actionTwo ? null : modalClose();
  }

  return (
    <Dialog
      onClose={() => {
        closeHandler(disableClosing, isPending);
      }}
      open={isModalOpen}
      maxWidth={maxWidth}
    >
      {title && <DialogTitle variant="h3">{title}</DialogTitle>}
      <DialogContent dividers={!!content}>
        {content && <DialogContent>{content}</DialogContent>}
      </DialogContent>
      {(actionBtn || cancelBtn) && (
        <DialogActions>
          {cancelBtn && (
            <Button
              variant="outlined"
              onClick={cancelBtn.cb}
              disabled={isPending}
            >
              {cancelBtn.label}
            </Button>
          )}
          {actionBtn && (
            <Button
              variant="contained"
              onClick={actionBtn.cb}
              // loading={isPending ? 'true' : undefined}
              disabled={isPending}
            >
              {actionBtn.label}
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}

export default CustomModal;
