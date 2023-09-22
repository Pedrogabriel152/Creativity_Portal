import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { styleModal } from "../Styles/StyleModal";
import { StyledTextarea } from "../Styles/TextArea";
import { IModalComment } from "../interfaces/IModalComment";

export default function ModalComment({comment, handleCloseModal, handleSubmit, handleTextAreaOnChange, openModal, text}: IModalComment) {
    return(
        <Modal keepMounted 
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="keep-mounted-modal-title"
            aria-describedby="keep-mounted-modal-description"
        >
            <Box
                sx={styleModal}
            >
                <Typography component="h1" variant="h5">
                Editar Comentario
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <input type="hidden" name="id" value={comment.id}/>
                    <StyledTextarea 
                        value={text}
                        onChange={handleTextAreaOnChange}
                        placeholder="Comentario"
                        sx={{ width: '100%', resize: 'none' }}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Salvar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}