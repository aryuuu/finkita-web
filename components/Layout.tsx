import React, { ReactNode, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Finkita' }: Props) => { 
  const [value, setValue] = useState(0);

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
                      onChange={(event, newValue) => {
                        setValue(newValue);
                      }}
                    >
                        <Link href="/">
                          <BottomNavigationAction label="Recent" icon={<RestoreIcon />} />
                        </Link>
                        <Link href="/accounts">
                          <BottomNavigationAction label="Accounts" icon={<FavoriteIcon />} />
                        </Link>
                        <Link href="/users">
                          <BottomNavigationAction label="Users" icon={<ArchiveIcon />} />
                        </Link>
                    </BottomNavigation>
              </Paper>
            </Box>
          </div>
    )
}
export default Layout
