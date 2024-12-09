
import { Grid, TextField, Button, Box } from "../components";
import { useEffect, useState } from "react";
import { useAppContext } from "../Context";
import { useNavigate } from "react-router-dom";

const Settings: React.FC = () => {
    const { showAlertMessage, translate } = useAppContext();
    const [nome, setNome] = useState('')
    const [peso, setPeso] = useState('')
    const [comprimento, setComprimento] = useState('')
    const [bebe, setBebe] = useState({
        'nome': '',
        'peso': '',
        'comprimento': '',
        'dataDeCadastro': ''
    })
    const { signOut } = useAppContext();
    const navigate = useNavigate()

    const SalvaInformacoes = () => {
        if (!nome || !peso || !comprimento) {
            showAlertMessage("Todos os campos são obrigatórios.", "warning");
            return;
        }

        const novoBebe = {
            nome: nome,
            peso: peso,
            comprimento: comprimento,
        }

        setBebe(novoBebe);

        
        const bebesExistentes = JSON.parse(localStorage.getItem('bebes') || '[]');

        
        bebesExistentes.push(novoBebe);

        localStorage.setItem('bebes', JSON.stringify(bebesExistentes));
        showAlertMessage("Informações salvas com sucesso!", "success");
        
        setTimeout(() => {
            navigate("/"); 
        }, 2000);
    }

    const handleLogout = async () => {
        await signOut(); 
        navigate('/signin');
    };

    return (
        <Grid container={true} spacing={2} padding={8}>
            <Grid item={true} size={{ xs: 12 }}>
                <TextField 
                    label='Nome'
                    value={nome}
                    fullWidth={true}
                    onChange={(e) => setNome(e.target.value)}
                />
            </Grid>

            <Grid item={true} size={{ xs: 12 }}>
                <TextField 
                    label='Peso em Kg'
                    value={peso}
                    fullWidth={true}
                    type='number'
                    onChange={(e) => setPeso(e.target.value)}
                />
            </Grid>

            <Grid item={true} size={{ xs: 12 }}>
                <TextField 
                    label='Comprimento em cm'
                    value={comprimento}
                    fullWidth={true}
                    type='number'
                    onChange={(e) => setComprimento(e.target.value)}
                />
            </Grid>

            <Button onClick={SalvaInformacoes}>Salvar</Button>
            <Button onClick={handleLogout}>Logout</Button>
        </Grid>
    );
};

export default Settings;