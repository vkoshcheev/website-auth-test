import { Box, Typography } from '@mui/material';
import LogoSvg from './LogoSvg';
import companyLogoText from "../images/CompanyLogoText.png";

const Logo = () => {
  
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: '9px',
        alignItems: 'center',
      }}
    >
      <LogoSvg />

      <img src={companyLogoText} height={13} style={{ marginTop: '2px'}}/>
    </Box>
  );
};

export default Logo;