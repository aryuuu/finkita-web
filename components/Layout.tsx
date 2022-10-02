import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import NotesIcon from '@mui/icons-material/Notes';
import Paper from '@mui/material/Paper';
import Login from './login';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Finkita' }: Props) => { 
    const router = useRouter();
    const path = router.route;
    const [value, setValue] = useState(path);

    const handleNav = (_event: React.SyntheticEvent, newValue: any) => {
        setValue(newValue);
        router.push(newValue)
    }

    return (
          <div>
            <Head>
              <title>{title}</title>
              <meta charSet="utf-8" />
              <meta name="viewport" content="initial-scale=1.0, width=device-width" />
              <meta name="description" content="Personal finance tracker" />
            </Head>

            {children}

            <Box sx={{ width: 500 }}>
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                      showLabels
                      value={value}
                      onChange={handleNav}
                    >
                        <BottomNavigationAction value="/" label="Home" icon={<HomeIcon />} />
                        <BottomNavigationAction value="/accounts" label="Accounts" icon={<PersonIcon />} />
                        <BottomNavigationAction value="/mutations" label="Mutations" icon={<NotesIcon />} />
                    </BottomNavigation>
              </Paper>
            </Box>
          </div>
    )
}
export default Layout
