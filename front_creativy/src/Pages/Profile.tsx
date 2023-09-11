import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Footer from '../Components/Footer';
import Container from '@mui/material/Container';
import Header from '../Components/Header';
import { sections } from '../Utils/variable';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { AccountProfileDetails } from '../Components/AccountProfileDetails';
import { AccountProfile } from '../Components/AccountProfile';
import Head from 'next/head';

export default function Profile() {

    const defaultTheme = createTheme();

    return(
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Container maxWidth="lg">
            <Header title="Creativy Portal" sections={sections} />
            <main>
                <Head>
                    <title>
                        Account | Devias Kit
                    </title>
                </Head>
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
                            >
                                <AccountProfile />
                            </Grid>
                            <Grid
                                xs={12}
                                md={6}
                                lg={8}
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