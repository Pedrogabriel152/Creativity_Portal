import { Box, Button, Modal, TextField, Typography } from "@mui/material";

// Styles
import { styleModalComment } from "../Styles/StyleModal";
import { StyledTextarea } from "../Styles/TextArea";

// Interfaces
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
                sx={styleModalComment}
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
                        size="large"
                        variant="contained"
                        sx={{ mt: 3, mb: 2, marginLeft: '20%' }}
                    >
                        Salvar
                    </Button>
                    <Button variant="contained" color="error" size="large" sx={{ marginLeft: 3 }} onClick={() => handleCloseModal(false)}>
                        Cancelar
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}