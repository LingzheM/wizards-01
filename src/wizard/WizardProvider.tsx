// wizard/WizardProvider.tsx
import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type WizardCtx = { step: number; setStep: (n: number) => void; maxStep: number }
export const WizardContext = createContext<WizardCtx | null>(null);

export default function WizardProvider({ children, maxStep }: { children: ReactNode; maxStep: number }) {
  const [step, setStep] = useState(0);
  const value = useMemo(() => ({ step, setStep, maxStep }), [step, maxStep]);
  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
}

export function useWizard() {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be inside WizardProvider');
  return ctx;
}
