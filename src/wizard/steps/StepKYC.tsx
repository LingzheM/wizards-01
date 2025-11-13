import { useFormContext } from 'react-hook-form'

export default function StepKYC() {
  const { register, setValue, watch, formState: { errors } } = useFormContext()
  const ids = watch('idImages') as string[] | undefined
  function addMockImage() {
    // 示例：实际项目中应直传到对象存储，拿回 URL 后 setValue
    const next = [...(ids || []), 'https://example.com/mock.jpg']
    setValue('idImages', next, { shouldValidate: true })
  }
  return (
    <div>
      <label>证件类型
        <select {...register('idType')}>
          <option value="">-- 请选择 --</option>
          <option value="passport">护照</option>
          <option value="idcard">身份证</option>
          <option value="license">驾照</option>
        </select>
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).idType?.message}</p>

      <label>证件号码
        <input {...register('idNumber')} />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).idNumber?.message}</p>

      <div>
        <button type="button" onClick={addMockImage}>（示例）添加一张已上传图片 URL</button>
        <div>当前图片数量：{ids?.length || 0}</div>
        <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).idImages?.message}</p>
      </div>
    </div>
  )
}
