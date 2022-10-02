import {useState} from 'react';
import Link from 'next/link'
import Layout from '../components/Layout'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArchiveIcon from '@mui/icons-material/Archive';
import Paper from '@mui/material/Paper';

const IndexPage = () => {
  const [value, setValue] = useState(0);

    return (
      <Layout title="Home | Finkita">
        <h1>Finkita home</h1>
        <p>
          <Link href="/about">
            <a>About</a>
          </Link>
        </p>
      </Layout>
    )
}

export default IndexPage
