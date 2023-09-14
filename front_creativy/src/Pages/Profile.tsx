// GraphQL
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { sections } from '../Utils/variable';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

// Components
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { AccountProfileDetails } from '../Components/AccountProfileDetails';
import { AccountProfile } from '../Components/AccountProfile';

export default function Profile() {

    const defaultTheme = createTheme();

    return(
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Creativy Portal" sections={sections} />
            <main>
                <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
                >
                    <Container maxWidth="lg">
                        <Stack spacing={3}>
                        <div>
                            <Typography variant="h4">
                            Account
                            </Typography>
                        </div>
                        <div>
                            <Grid
                            container
                            spacing={3}
                            >
                            <Grid
                                xs={12}
                                md={6}
                                lg={4}
                                marginRight={2}
                                marginBottom={3}
                            >
                                <AccountProfile />
                            </Grid>
                            <Grid
                                xs={12}
                                md={5}
                                lg={7}
                            >
                                <AccountProfileDetails />
                            </Grid>
                            </Grid>
                        </div>
                        </Stack>
                    </Container>
                </Box>
            </main>
        </Container>
        <Footer
            title="Mais informações"
            description="Something here to give the footer a purpose!"
        />
        </ThemeProvider>
    );
}