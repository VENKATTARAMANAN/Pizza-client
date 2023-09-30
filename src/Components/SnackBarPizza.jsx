import { Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackBarPizza = ({ data }) => {
  const [open, setOpen] = useState(false);
 
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  
  useEffect(()=>{
    if(data){
      setOpen(true)
    }
    },[data])
    
  return (
    <div>
      <Stack sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="success" sx={{ width: "100%" }}>
            {data}
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  );
};
export default SnackBarPizza;
