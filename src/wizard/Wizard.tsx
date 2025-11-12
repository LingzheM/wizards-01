import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { fullSchema, type FullForm } from './schema'
import { useEffect } from 'react'
import WizardProvider, { useWizard } from './WizardProvider';
import StepAccount from './steps/StepAccount'
import StepProfile from './steps/StepProfile'
import StepContact from './steps/StepContact'
import StepKYC from './steps/StepKYC'
import StepTerms from './steps/StepTerms'
import StepReview from './steps/StepReview'

const STEPS = [StepAccount, StepProfile, StepContact, StepKYC, StepTerms, StepReview]

function InnerWizard() {
  const methods = useForm<FullForm>({
    resolver: zodResolver(fullSchema),
    mode: 'onChange',
    defaultValues: (() => {
      try { return JSON.parse(sessionStorage.getItem('signup_draft') || '{}') } catch { return {} }
    })()
  })
  const { step, setStep, maxStep } = useWizard()

  // 草稿持久化
  useEffect(() => {
    const sub = methods.watch((v) => sessionStorage.setItem('signup_draft', JSON.stringify(v)))
    return () => (sub as any)?.unsubscribe?.()
  }, [methods])

  // 每步需要校验的字段
  const fieldsPerStep: (keyof FullForm)[][] = [
    ['email','password','otp'],
    ['fullName','birthDate','nationality'],
    ['address','postalCode','occupation'],
    ['idType','idNumber','idImages'],
    ['agreePrivacy','agreeRisk'],
    [], // Review
  ]

  const StepComp = STEPS[step]

  async function next() {
    const ok = await methods.trigger(fieldsPerStep[step] as any)
    if (ok) setStep(Math.min(step + 1, maxStep))
  }
  function back() {
    setStep(Math.max(step - 1, 0))
  }

  async function submit(finalData: FullForm) {
    const key = crypto.getRandomValues(new Uint8Array(16))
    const idempotencyKey = Array.from(key).map(b => b.toString(16).padStart(2, '0')).join('')

    const res = await fetch('/api/onboarding/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
      body: JSON.stringify(finalData),
      credentials: 'include'
    }).catch(()=>null as any)

    if (!res || !res.ok) {
      alert('提交失败，请稍后重试')
      return
    }
    sessionStorage.removeItem('signup_draft')
    const { applicationId } = await res.json()
    window.location.assign(`/onboarding/success?app=${encodeURIComponent(applicationId)}`)
  }

  return (
    <FormProvider {...methods}>
      <div role="progressbar" aria-valuenow={step+1} aria-valuemin={1} aria-valuemax={STEPS.length} style={{margin:'12px 0'}}>
        第 {step + 1} / {STEPS.length} 步
      </div>

      <form onSubmit={methods.handleSubmit(submit)} noValidate>
        <StepComp />

        <div style={{ display:'flex', gap:12, marginTop: 24 }}>
          {step > 0 && <button type="button" onClick={back}>上一步</button>}
          {step < maxStep
            ? <button type="button" onClick={next}>下一步</button>
            : <button type="submit">提交审核</button>}
        </div>
      </form>
    </FormProvider>
  )
}

export default function Wizard() {
  return (
    <WizardProvider maxStep={STEPS.length - 1}>
      <InnerWizard />
    </WizardProvider>
  )
}
