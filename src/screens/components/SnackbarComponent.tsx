import React from 'react'
import { Snackbar } from 'react-native-paper';

export interface ShowMessage {
  visible: boolean;
  message: string;
  color: string;
}

interface Props{
  showMessage: ShowMessage;
  setShowMessage: Function;
}

export const SnackbarComponent = ({showMessage, setShowMessage}:Props) => {
  
  return (
    <Snackbar
        visible={showMessage.visible}
        onDismiss={() => setShowMessage({ ...showMessage, visible: false })}
        style={{ backgroundColor: showMessage.color, width: "100%" }}
      >
        {showMessage.message}
      </Snackbar>
  )
}
