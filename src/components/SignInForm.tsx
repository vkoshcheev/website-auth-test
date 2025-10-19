import { Box, Button, InputAdornment, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useLoginStepContext } from "../context";
import lockOutlinedSrc from "../images/LockOutlined.svg";
import userOutlinedSrc from "../images/UserOutlined.svg";
import { useLogin } from "../utils/useLogin";
import AppTextField from "./AppTextField";
import Logo from "./Logo";

const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginButtonDisabled = !email || !password;

  const { mutate, isPending, error } = useLogin();
  const { setStep } = useLoginStepContext();
  
  const onLoginPress = () => {
    mutate({ email, password }, {
      onSuccess: (res) => {
        if (res.success) {
          setStep('2fa');
        }
      }
    });
  }

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
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '64px' }}>
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
        Sign in to your account to continue
      </Typography>

      <Tooltip
        title={`Правильные данные:
        yeap@mail.com
        123

        Ошибки:
        blocked@mail.com
        servererror@mail.com`}
      >
        <Box sx={{ mt: '24px', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <AppTextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={userOutlinedSrc} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <AppTextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <img src={lockOutlinedSrc} />
                  </InputAdornment>
                ),
              },
            }}
          />

          <Box width={'100%'}>
            <Button
              variant="contained"
              disabled={loginButtonDisabled || isPending}
              onClick={onLoginPress}
              fullWidth
            >
              Log in
            </Button>

            {error && (
              <Typography sx={{ mt: '4px', fontSize: '14px', color: '#FF4D4F', lineHeight: '22px' }}>
                {error.message}
              </Typography>
            )}
          </Box>
        </Box>
      </Tooltip>
    </Box>
  );
};

export default SignInForm;