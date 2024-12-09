
import { Grid, Typography, Box } from "../components";
import { useEffect, useState } from "react";



const Dashboard: React.FC = () => {

    const [bebe, setBebe] = useState([]);

    useEffect(() => {
        const bebes = JSON.parse(localStorage.getItem('bebes') || '[]');
        setBebe(bebes);
    }, []);
    
    return (
      <Grid container={true} spacing={2} padding={8} >
         
        <Grid item={true} size={{ xs: 12 }} style={(styles.container)}>
        <Typography component="p" sx={{...styles.titulo}}>Dashboard</Typography>
          {bebe.map((item, index) => {
            return (
              <Box key={index} sx={{...styles.linha}}>
               
                <Typography component="p">{item.nome}</Typography>
                <Typography component="p">{item.comprimento} cm</Typography>
                <Typography component="p">{item.peso} KG</Typography>
                
              </Box>
            );
          })}
        </Grid>
      </Grid>
    );
}    

const styles = {
    container:{
        display:'flex',
        flexDirection: 'column',
        justifyContent:'space-evenly'
    },
    linha:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderBottom:'1px solid'
    },
    titulo:{
        fontWeight:'bold',
        fontSize:24
    }
    
}

export default Dashboard;