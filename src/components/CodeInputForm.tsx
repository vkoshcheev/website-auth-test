import { Box, Button, Typography } from "@mui/material";
import CodeInput from "./CodeInput";
import Logo from "./Logo";
import { useLoginStepContext } from "../context";
import arrowLeftOutlined from '../images/ArrowLeftOutlined.svg';

const CodeInputForm = () => {
  const { setStep } = useLoginStepContext();
  
  return (
    <Box
      sx={{
        maxWidth: '372px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
        borderRadius: '6px',

        bgcolor: 'white',
        textAlign: 'center',
        verticalAlign: 'middle',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '64px',
          position: 'relative',
        }}
      >
        <Button
          sx={{ position: 'absolute', top: -4, left: 0, padding: '11px', minWidth: 0 }}
          onClick={() => setStep('login')}
        >
          <img src={arrowLeftOutlined} />
        </Button>
        <Logo />
      </Box>

      <Typography
        sx={{
          mt: '4px',
          fontWeight: 'bold',
          fontSize: '24px',
          lineHeight: '32px',
        }}
      >
        Two-Factor Authentication
      </Typography>

      <Typography
        sx={{
          mt: '4px',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '24px',
        }}
      >
        Enter the 6-digit code from the Google Authenticator app
      </Typography>

      <Box mt={'24px'}>
        <CodeInput />
      </Box>
    </Box>
  );
};

export default CodeInputForm;