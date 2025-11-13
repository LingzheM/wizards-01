import { useFormContext } from 'react-hook-form'

export default function StepTerms() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div>
      <p>请阅读并同意隐私条款与风险披露</p>
      <label>
        <input type="checkbox" {...register('agreePrivacy')} /> 我同意隐私条款
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).agreePrivacy?.message}</p>
      <label>
        <input type="checkbox" {...register('agreeRisk')} /> 我同意风险披露
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).agreeRisk?.message}</p>
    </div>
  )
}
