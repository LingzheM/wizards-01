import { useFormContext } from 'react-hook-form'

export default function StepProfile() {
  const { register, formState: { errors } } = useFormContext()
  return (
    <div>
      <label>姓名
        <input {...register('fullName')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).fullName?.message}</p>

      <label>生日
        <input type="date" {...register('birthDate')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).birthDate?.message}</p>

      <label>国籍
        <input {...register('nationality')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).nationality?.message}</p>
    </div>
  )
}
