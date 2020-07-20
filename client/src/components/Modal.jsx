import  React from 'react';
import { Box, Text, Switch, Heading, Modal, Button, Layer } from 'gestalt';

function ModalE(props) {
  const [showModal, setShowModal] = React.useState(true);
  return (
    <Box  >
      
        {showModal && (
          <Layer>
            <Modal marginLeft={-1}
              accessibilityModalLabel="View default padding and styling"
              heading="Heading"
              role="alertdialog"
              onDismiss={() => { setShowModal(true) }}
              footer={
                <Box color="lightGray">
                  <Heading size="md">Footer</Heading>
                </Box>
              }
              size="md"
            >
              <Box>
                <Heading size="md">Children</Heading>
              </Box>
            </Modal>
          </Layer>
        )}
    </Box>
  );
}

export default ModalE;