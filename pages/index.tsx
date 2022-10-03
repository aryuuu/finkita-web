import { signIn, useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import Login from '../components/login';

const IndexPage = () => {
  const { data: session, status } = useSession();
  const isAuthenticated = useMemo(() => {
    const temp = status === 'authenticated';
    console.log({ temp });
    return temp;
  }, [status]);

  useEffect(() => {
    if (session?.error === 'RefreshAccessTokenError') {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  return (
    <Layout title='Home | Finkita'>
      {isAuthenticated ? (
        <>
          <Login />
          <h1>Finkita Home</h1>
        </>
      ) : (
        <Login />
      )}
    </Layout>
  );
};

export default IndexPage;
