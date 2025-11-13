import { useFormContext } from 'react-hook-form'

export default function StepContact() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div>
      <label>地址
        <input {...register('address')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).address?.message}</p>

      <label>邮编
        <input {...register('postalCode')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).postalCode?.message}</p>

      <label>职业
        <input {...register('occupation')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).occupation?.message}</p>
    </div>
  )
}
