import { Box } from '@mui/material';
import React from 'react';
import SignInForm from './components/SignInForm';
import CodeInputForm from './components/CodeInputForm';
import { useLoginStepContext } from './context';

const App: React.FC = () => {
  const { step } = useLoginStepContext();

  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        width: '100vw',
        height: '100vh',
        padding: '24px',

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#F5F5F5',
      }}
    >
      {step === 'login' && <SignInForm />}
      {step === '2fa' && <CodeInputForm />}
    </Box>
  );
};

export default App;