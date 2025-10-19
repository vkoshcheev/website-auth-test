import { TextField, TextFieldProps } from '@mui/material';

const AppTextField = (props: TextFieldProps) => {
  return (
    <TextField
      fullWidth
      margin="none"
      size="small"
      spellCheck={false}
      {...props}
    />
  );
};

export default AppTextField;
