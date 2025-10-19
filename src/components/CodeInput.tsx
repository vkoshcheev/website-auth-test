import { Alert, Box, Button, Snackbar, TextField, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useConfirmCode } from "../utils/useConfirmCode";
import { useGetNewCode } from "../utils/useGetNewCode";

export default function CodeInput() {
  const [isInvalidCode, setIsInvalidCode] = useState(false);
  const [isCodeExpired, setIsCodeExpired] = useState(false);

  // #######################################################################
  const inputLength = 6;
  const [values, setValues] = useState<string[]>(Array(inputLength).fill(""));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.setSelectionRange(0, 0);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const paste = e.clipboardData.getData('text').trim();
    const is6digitsString = /^\d{6}$/.test(paste);
    if (!is6digitsString) return;
  
    setValues(paste.split(''));
    e.currentTarget.blur();
  };  

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = (e.nativeEvent as InputEvent).data ?? ''; // last typed character
    const isDigit = /^\d?$/.test(val);
    if (!isDigit) {
      // prevent cursor movement
      const input = e.target;
      input.value = values[index]!;
      input.setSelectionRange(0, 0);
      return;
    }
  
    const newValues = [...values];
    newValues[index] = val;
    setValues(newValues);
    setIsInvalidCode(false);
  
    if (val && index < inputLength - 1) {
      inputsRef.current[index + 1]?.focus();
    }
    // else if (index === inputLength - 1 && val) {
    //   console.log('All digits entered:', newValues.join(''));
    //   onSubmit(values.join(''));
    //   e.target.blur();
    // }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];
      if (values[index]) {
        newValues[index] = '';
        setValues(newValues);
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus();
        newValues[index - 1] = '';
        setValues(newValues);
      }
    }
  };

  const codeAsString = values.join('');
  const allDigitsEntered = codeAsString.length === 6;
  // #######################################################################
  const [error, setError] = useState("");

  const {
    mutate: mutateGetNewCode,
    isPending: isPendingGetNewCode,
  } = useGetNewCode();
  
  const onGetNewCodePress = () => {
    setError("");
    setIsInvalidCode(false)
    setValues(Array(inputLength).fill(""));
    getNewCode();
  }

  const getNewCode = () => {
    mutateGetNewCode(undefined, {
      onSuccess: (res) => {
        if (res.success) {
          setIsCodeExpired(false);
          return setTimeout(() => {
            setIsCodeExpired(true);
          }, res.expiresIn * 1000);
        }
      },
      onError: (res) => {
        if (res.message) {
          setError(res.message);
        }
      },
    });
  }

  useEffect(() => {
    getNewCode();
  }, []);
  // #######################################################################
  const {
    mutate: mutateConfirmCode,
    isPending: isPendingConfirmCode,
  } = useConfirmCode();
  const [isSuccess, setIsSuccess] = useState(false);
  
  const onSubmitCode = () => {
    mutateConfirmCode(codeAsString, {
      onSuccess: (res) => {
        if (res.success) {
          setIsSuccess(true);
        }
      },
      onError: (res) => {
        if (res.message) {
          setError(res.message);
          if (res.message === 'Invalid code') setIsInvalidCode(true);
        }
      },
    });
  }
  // #######################################################################

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
    >
      <Tooltip
        title={`Примечание: функционал инпута кода довольно условный, в общем случае такое бы зависело от конкретных требований по ТЗ, в данном случае набросал по здравому смыслу.
          
          Коды для ошибок (все остальные работают)
          000000 = 401 'Invalid code'
          111111 = 429 'Too many attempts'
          222222 = 500 'Server error'
          `}
        placement="left"
      >
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            height: { xs: '48px', lg: '60px' },
          }}
        >
          {values.map((val, i) => (
            <TextField
              key={i}
              inputRef={(el) => (inputsRef.current[i] = el)}
              value={val}
              onFocus={handleFocus}
              onPaste={handlePaste}
              onChange={(e) => handleChange(i, e)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              slotProps={{
                input: {
                  style: { height: '100%' },
                },
                htmlInput: {
                  maxLength: 2,
                  style: {
                    fontSize: '24px',
                    fontWeight: '600',
                    textAlign: 'center',
                  },
                },
              }}
              variant="outlined"
              error={isInvalidCode}
            />
          ))}
        </Box>
      </Tooltip>

      {error && (
        <Typography sx={{ mt: '4px', fontSize: '14px', color: '#FF4D4F', lineHeight: '22px' }}>
          {error}
        </Typography>
      )}

      {allDigitsEntered && !isCodeExpired && (
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: '16px' }}
          disabled={isInvalidCode || isPendingConfirmCode}
          onClick={onSubmitCode}
        >
          Continue
        </Button>
      )}

      {isCodeExpired && (
        <Tooltip title={'10 секунд'} placement="left">
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: '16px' }}
            onClick={onGetNewCodePress}
            disabled={isPendingGetNewCode}
          >
            Get new
          </Button>
        </Tooltip>
      )}

      <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        onClose={() => setIsSuccess(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" variant="filled">
          Логин успешен!
        </Alert>
      </Snackbar>
    </Box>
  );
}