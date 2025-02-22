import { Button, Dialog, DialogActions, DialogContent, 
        DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import ErrorListForm from "../ErrorListForm";
import UsuarioService from "@/app/api/Usuario/UsuarioService";

interface UsuarioDeleteProps {
  open: boolean;
  setIsOpen: (open: boolean) => void;  
  setDeleted: (Deleted : boolean) => void;
  id: string
}

export default function UsuarioDelete({ open, setIsOpen, setDeleted, id  }: UsuarioDeleteProps) {
    const [loadingDelete, setLoadingDelete] = React.useState(false);
    const [messageErrorsDelete, setMessageErrorsDelete] = React.useState<string[]>([]);

    const handleClose = () => {
        setIsOpen(false);
    }

    const handleSubmitDelete = async () => {
        setLoadingDelete(true);
        setMessageErrorsDelete([]);

        const result = await UsuarioService.DeletarUsuario(id);
        if(!result.success){
            setMessageErrorsDelete(result.messages ?? []);
        }else{
            setMessageErrorsDelete([]);
            setDeleted(true);
            setIsOpen(false);
        }
        setLoadingDelete(false);
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Tem certeza que deseja deletar?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Você não terá mais acesso a esse registro.
                    </DialogContentText>
                    <ErrorListForm errors={messageErrorsDelete} />
                </DialogContent>
                <DialogActions>
                <Button
                    sx={{
                        color: 'red', 
                        borderColor: 'red', 
                        '&:hover': { 
                          color:'#fff',
                          backgroundColor: 'red',
                          borderColor: 'rgba(138, 2, 2, 0.1)' 
                        }
                    }}
                    variant="outlined" 
                    onClick={handleClose}>
                    Cancelar
                </Button>
                <Button
                    loading={loadingDelete}
                    loadingPosition="start"
                    sx={{
                      color: 'green', 
                      borderColor: 'green', 
                      '&:hover': { 
                        color:'#fff',
                        backgroundColor: 'green',
                        borderColor: 'green' 
                      }
                    }}
                    variant="outlined" 
                    onClick={handleSubmitDelete} autoFocus>
                    Sim
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}