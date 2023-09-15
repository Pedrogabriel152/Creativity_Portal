import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';

// Mui Material
import { Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid} from '@mui/material';

// Interfaces
import { IUser } from '../interfaces/IUser';

// Toastify
import { toast } from 'react-toastify';

// GraphQL
import { useUpdateUSer } from '../GraphQL/Hooks/userHook';
import { useReactiveVar } from '@apollo/client';
import { updateUserVar } from '../GraphQL/States/userSatate';

interface IAccount {
  user: IUser
  setUser: (user: IUser) => void
}

export const AccountProfileDetails = ({user, setUser}: IAccount) => {
  const [ updateUser ] = useUpdateUSer();
  const updateUserResponse = useReactiveVar(updateUserVar);

  useEffect(() => {
    if(updateUserResponse) {
      if(updateUserResponse?.code === 200) toast.success(updateUserResponse.message);
      if(updateUserResponse?.code !== 200) toast.error(updateUserResponse.message);
    }
  }, [updateUserResponse]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    })
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if(!user.name) return toast.error('O campo nome é obrigatório');

    if(!user.email) return toast.error('O campo email é obrigatório');

    if(user.password) {
      if(!user.confirmPassword) return toast.error('A confirmação da senha é obrigatório');

      if(user.password !== user.confirmPassword) return toast.error('As senhas precisam iguais');
    }

    console.log(user)

    updateUser({
      variables: {
        user: {
          name: user.name,
          email: user.email,
          image: user.image,
          password: user.password
        }
      }
    })
  }

  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Digite seu nome"
                  label="Nome"
                  name="name"
                  onChange={handleChange}
                  required
                  value={user.name}
                />
              </Grid>
              {/* <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={user.name}
                />
              </Grid> */}
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={handleChange}
                  required
                  value={user.email}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Senha"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={user.password}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Confirme a Senha"
                  name="confirmPassword"
                  onChange={handleChange}
                  type='password'
                  required
                  value={user.confirmPassword}
                />
              </Grid>
              {/* <Grid
                xs={12}
                md={6}
              > */}
                {/* <TextField
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={handleChange}
                  required
                  select
                  SelectProps={{ native: true }}
                  value={values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField> */}
              {/* </Grid> */}
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
            Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};