import * as React from "react";
import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import MemberTree from "@/app/components/MemberTree";

const BootstrapDialog = styled(Dialog)(({theme}) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MemberTreeDialog({
                                           isOpen,
                                           setOpen,
                                           data,
                                         }: {
  isOpen: boolean,
  setOpen: (b: boolean) => void,
  data: any
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
        fullScreen
      >
        <DialogTitle sx={{m: 0, p: 2}} id="customized-dialog-title">
          {`${data.label}'s Hierarchy`}
        </DialogTitle>
        <DialogContent dividers className="dialog-content">
          <MemberTree data={[data]}/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}