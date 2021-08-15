import { Dialog } from "@material-ui/core";

function DialogForm(props) {
  return (
    <Dialog
      open={props.dialogOpen}
      onClose={() => props.setDialogOpen}
    ></Dialog>
  );
}

export default DialogForm;
