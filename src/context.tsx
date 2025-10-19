import { ReactNode, createContext, useContext, useState } from 'react';

type Step = 'login' | '2fa';
type LoginContextType = {
  step: Step;
  setStep: (step: Step) => void;
};

const LoginStepContext = createContext<LoginContextType | undefined>(undefined);

export function LoginStepProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>('login');

  const providerValue: LoginContextType = {
    step,
    setStep,
  }

  return (
    <LoginStepContext.Provider value={providerValue}>
      {children}
    </LoginStepContext.Provider>
  );
}

export const useLoginStepContext = () => {
  const context = useContext(LoginStepContext);
  if (!context) throw new Error("useLoginStepContext must be used within a LoginStepProvider");
  return context;
};
