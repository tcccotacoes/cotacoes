import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField, Typography } from '@mui/material';
import {Grid} from '@mui/material';
import format from 'date-fns/format';
import { AuthContext } from '@/context/authContext';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-container": {
    alignItems: "flex-start"
  }
}));



function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ButtonVisualisarDados(props) {
  const [open, setOpen] = React.useState(false);
  const {atualizaDadosAux, authReceber, adicionaEntregaAux} = React.useContext(AuthContext);
  const [informacao, setInformacao] = React.useState(null)
  const [value, setValue] = React.useState(null);


  const [solicitacao, setSolicitacao] = React.useState({
    nome: '',
    data:  '',
    infomacao:'',
    produto: '',
    unidade: '',
    quantidade: ''
  }) 


  const handleClickOpen = () => {
   if(authReceber()){
       setOpen(true);
   }else{
    toast.error('Você não tem autorização suficiente para autorizar compras', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
   }
  };


  const handleClose = () => {
     setOpen(false)
    };



  React.useEffect(()=>{  
   setSolicitacao( {
        id_solicitacao: props.dados.id_solicitacao,
        id_cotacao: props.dados.id_cotacao,
        id_autorizacao: props.dados.id_autorizacao,
        id_lancamento: props.dados.id_lancamento,
        nome: props.dados.nome,
        data_solicitacao: props.dados.created_at_solicitacao,
        user_lancamento: props.dados.usuario_lancamento,
        user_cotacao: props.dados.usuario_cotacao,
        user_solicitacao: props.dados.usuario_solicitacao,
        user_autorizacao: props.dados.usuario_autorizacao,
        informacao_solicitacao: props.dados.informacao_solicitacao,
        informacao_cotacao: props.dados.informacao_cotacao,
        informacao_autorizacao : props.dados.informacao_autorizacao,
        informacao_lancamento: props.dados.informacao_lancamento,
        produto: props.dados.produto,
        unidade: props.dados.unidade_medida,
        quantidade:props.dados.quantidade,
        fornecedor: props.dados.fornecedor,
        valor_unidade: props.dados.valor_unidade,
        frete: props.dados.frete,
        impostos: props.dados.impostos,
        prazo: props.dados.impostos,
        valor_final: props.dados.valor_final,
        data_compra: props.dados.data_compra,
        data_entrega: props.dados.data_entrega,
        data_conclusao: props.dados.created_at_entrega,
        data_cotacao: props.dados.created_at_cotacao,
        data_autorizacao: props.dados.created_at_autorizacao,
        data_lancamento: props.dados.created_at_lancamento,
        informacao_entrega: props.dados.informacao_entrega,
        
      }
   )
  
  }, [])


  const handleClick = async (event)=>{
    try{
    if(value == null) throw new Error('Preencha a data da entrega!')
    const result = await adicionaEntregaAux({...solicitacao, informacao_entrega: informacao, data_entrega: value})
    if(result instanceof Error)throw new Error(result);
    setOpen(false)
    atualizaDadosAux();
    toast.success(result, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
  }catch(error){
    if(error.message != ''){
    toast.error(error.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
    }
  }
  }

  const handleInformacao = (event)=>{
    console.log(event.target.value)
    setInformacao(event.target.value)
  }


  const handleDataChange = (event) =>{
   
        setValue(event);
      
  }


  return (
    <>      
     
      <Button variant="contained" onClick={handleClickOpen}>
        Visualizar
      </Button>

      <BootstrapDialog
        maxWidth={'lg'}
        fullWidth={true}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
       PaperProps={{sx: {position: "top"}}}
        sx={{zIndex: 0}}
      >

        <BootstrapDialogTitle id="customized-dialog-title" align={'center'} onClose={handleClose}>
         Dados da solicitação
        </BootstrapDialogTitle>
        <DialogContent dividers>


        <ToastContainer/>
        <Grid container spacing={2}>
                    <Grid item xs={8}>
                            <TextField disabled id="outlined-basic" fullWidth={true} label="nome" value={solicitacao.nome} name="nome" variant="filled" />
                    </Grid>
                    <Grid item xs={4}>
                    <TextField
                            disabled
                            id="filled-disabled"
                            label="Data da solicitação"
                            defaultValue={solicitacao.data_solicitacao && format(new Date(solicitacao.data_solicitacao), 'dd/MM/yyyy')}
                            variant="filled"
                            fullWidth={true}
                            />
                    </Grid>
                    <Grid item xs={6}>
                     Informações adicionais da solicitação. Data: {solicitacao.data_solicitacao && format(new Date(solicitacao.data_solicitacao), 'dd/MM/yyyy')} 
                    <TextField
                            multiline
                            name='Informacao da Solicitacao'
                            defaultValue={`Usuário: ${solicitacao.user_solicitacao}\nINFORMAÇÃO: ${solicitacao.informacao_solicitacao}`}
                            rows={4}
                            fullWidth={true}
                            variant="filled"
                            disabled
                            />
                    </Grid>
                    <Grid item xs={6}>
                    Informações adicionais da cotação. Data: {solicitacao.data_cotacao && format(new Date(solicitacao.data_cotacao), 'dd/MM/yyyy')} 
                    <TextField
                           multiline
                           name='Informacao da Cotação'
                           defaultValue={`Usuário: ${solicitacao.user_cotacao}\nINFORMAÇÃO: ${solicitacao.informacao_cotacao}`}
                           rows={4}
                           fullWidth={true}
                           variant="filled"
                           disabled
                            />
                    </Grid>

                    <Grid item xs={6}>
                    Informações adicionais da autorização. Data: {solicitacao.data_autorizacao && format(new Date(solicitacao.data_autorizacao), 'dd/MM/yyyy')} 
                    <TextField
                             multiline
                             name='Informacao da Autorização'
                             defaultValue={`Usuário: ${solicitacao.user_autorizacao}\nINFORMAÇÃO: ${solicitacao.informacao_autorizacao}`}
                             rows={4}
                             fullWidth={true}
                             variant="filled"
                             disabled
                            />
                    </Grid>
                    <Grid item xs={6}>
                    Informações adicionais do lançamento. Data: {solicitacao.data_lancamento && format(new Date(solicitacao.data_lancamento), 'dd/MM/yyyy')} 
                    <TextField
                                      multiline
                                      name='Informacao do Lancamento'
                                      defaultValue={`Usuário: ${solicitacao.user_lancamento}\nINFORMAÇÃO: ${solicitacao.informacao_lancamento}`}
                                      rows={4}
                                      fullWidth={true}
                                      variant="filled"
                                      disabled
                            />
                    </Grid>

                    <Grid item xs={6}>
                    Informações adicionais da entrega. Data: {solicitacao.data_conclusao && format(new Date(solicitacao.data_conclusao), 'dd/MM/yyyy')} 
                    <TextField
                                      multiline
                                      name='Informacao da entraga'
                                      defaultValue={`Usuário: ${solicitacao.user_lancamento}\nINFORMAÇÃO: ${solicitacao.informacao_entrega}`}
                                      rows={4}
                                      fullWidth={true}
                                      variant="filled"
                                      disabled
                            />
                    </Grid>
                    <Grid item xs={6}>
                    Produto recebido dia:  {solicitacao.data_conclusao && format(new Date(solicitacao.data_conclusao), 'dd/MM/yyyy')}             
                  
                                   
                   
                                              


                    </Grid>
                    {/*informações do produto*/}
                    <Grid item xs={6}>
                    <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.produto} label="Produto" name='produto' />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField disabled id="outlined-basic" fullWidth={true} value={solicitacao.unidade} label="Unidade de Medida" name='unidade' variant="filled" />
                    </Grid>
                    <Grid item xs={3}>
                    <TextField disabled  id="outlined-basic" fullWidth={true} label="Quantidade" value={solicitacao.quantidade} name='quantidade' variant="filled" />
                    </Grid>
                     {/*fim das informações do produto*/}

                    {/*parte da cotação*/}
                    </Grid>
                    
                     
                        
                          <Grid container spacing={1} mt={2} key={uuidv4()}>
                            <Grid item xs={12}>
                            Cotação autorizada
                            </Grid>
                          <Grid item xs={10}>
                                    <Grid  container spacing={2}>

                                                <Grid item xs={2}>
                                                <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.fornecedor} label="Fornecedor" name='produto' />
                                                </Grid>
                                
                                                <Grid item xs={2}>
                                                <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.valor_unidade} label="Valor unidade" name='produto' />
                                                </Grid>

                                                <Grid item xs={2}>
                                                <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.frete} label="Frete" name='produto' />
                                                </Grid>

                                                <Grid item xs={2}>
                                                <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.impostos} label="Impostos" name='produto' />
                                                </Grid>

                                                <Grid item xs={2}>
                                                <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.prazo} label="Prazo" name='produto' />
                                                </Grid>

                                                <Grid item xs={2}>
                                                <TextField disabled variant="filled" id="outlined-basic" fullWidth={true} value={solicitacao.valor_final} label="valor_final" name='produto' />
                                                </Grid>
                                        </Grid>
                            </Grid>

                                        <Grid item xs={2}>
                                        <TextField
                                            disabled
                                            id="filled-disabled"
                                            label="Data da compra"
                                            defaultValue={solicitacao.data_compra && format(new Date(solicitacao.data_compra), 'dd/MM/yyyy')}
                                            variant="filled"
                                            fullWidth={true}
                                            />
                   
                                        </Grid>

                                        

</Grid>
                                        
                            
                     {/*fim da parte da cotação*/}




        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setOpen(false)}>
            sair
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
