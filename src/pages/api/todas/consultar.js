import { getTodasSolicitacoes } from "@/services/solicitacao";

export default async (req, res) =>{
 try{
    const result = await getTodasSolicitacoes(req.body);
    if(result instanceof Error) throw new Error('erro')
    res.status(200).send(result)
 }catch(error){
    res.status(400).send(error)
 }
}

