import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';



export default function Form() {

    const [selected, setSelected] = useState()
    const handleSelected = (e) => {
        setSelected(e.target.value);
        console.log(selected);
    };


  return (
    <div>
        <Grid item xs={12}> 
        <Grid container spacing={4}> 
            <Grid item xs={6}> 
                <TextField id="standard-multiline-flexible" label="Nom" multiline rowsMax={4} />
            </Grid>
            <Grid item xs={5}> 
                <TextField
                    id="standard-multiline-flexible"
                    label="Prénom"
                    multiline
                    rowsMax={4} 
                />
            </Grid>

            <Grid container item xs={12}> 
                <Grid item xs={6}> 
                    <TextField
                        id="standard-multiline-flexible"
                        label="Email"
                        type="email"
                        size="medium"
                        multiline
                    />
                </Grid>

                <Grid item xs={6}> 
                <FormControl required>
                    <InputLabel id="demo-simple-select-required-label " > Objet </InputLabel>
                    <Select labelId="demo-simple-select-required-label " id="demo-simple-select-required" value={selected} onChange={handleSelected} >
                    <MenuItem value={selected}> <em>Vide</em> </MenuItem>
                    <MenuItem value={10}>Demande de Renseignement </MenuItem>
                    <MenuItem value={20}>Devenir Adhérent </MenuItem>
                    <MenuItem value={30}>Autre Demande </MenuItem>
                    </Select>
                    <FormHelperText> Merci de Choisir l'objet de votre demande </FormHelperText>
                </FormControl>

                </Grid>
            <Grid/>

            </Grid>

            <TextField
                id="filled-full-width"
                label="Message"
                style={{ margin: 10 }}
                placeholder="Faîtes votre demande ici 😊  ...,"
                helperText="Votre message"
                fullWidth
                multiline
                margin="normal"
                color="secondary"
                InputLabelProps={{
                    shrink: true,
                }}
                variant="filled"
            />
            
        </Grid>

        </Grid> <br/>
        <Button variant="contained" color="primary">
            Soumettre
        </Button>    
 </div>

  );
}
