// Mui material
import { Box, Button, IconButton, Typography } from "@mui/material";

// Interfaces
import { IModal } from "../interfaces/IModal";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 360,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ConfirmeModal({text, handleClick, handleClose}: IModal) {
    return(
        <Box sx={style}>
            <Typography id="keep-mounted-modal-title" variant="h6" component="h2" marginBottom={3}>
                {text}
            </Typography>
            <Button variant="contained" color="info" size="large" onClick={handleClick}>
                Confirmar
            </Button>
            <Button variant="contained" color="error" size="large" sx={{ marginLeft: 3 }} onClick={() => handleClose(false)}>
                Cancelar
            </Button>
        </Box>
    );
}