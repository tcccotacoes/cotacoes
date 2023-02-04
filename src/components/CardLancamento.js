import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from '../styles/Card.module.css'
import Moment from 'react-moment';
import ButtonLancar from './ButtonLancar';


export default function CardComprar(props) {
  return (
    <Box sx={{ minWidth: '100%', boxShadow: 3}}>
      <Card variant="outlined">
      <CardContent sx={{p: 0}}>
      <Typography component="div" className={styles.pedido}>
       Solicitacão {props.dados.id_solicitacao}
      </Typography>
      <Typography sx={{ mb: 1.5, marginTop: 1 }} className={styles.descricao}>
      {props.dados.produto}
      </Typography>
    </CardContent>
    <Typography align='center'>
    <ButtonLancar dados={props.dados} />
    </Typography>
    <Typography className={styles.temporizador} mt={2}>
    <Moment diff={props.dados.created_at} unit="days">{new Date()}</Moment>  Dias
    </Typography>
      </Card>
    </Box>
  );
}