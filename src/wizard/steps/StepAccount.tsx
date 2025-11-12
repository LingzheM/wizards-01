import { useFormContext } from 'react-hook-form'

export default function StepAccount() {
  const { register, formState: { errors } } = useFormContext()
  async function sendOtp() {
    // 示例：发送验证码
    await fetch('/api/otp/send', { method: 'POST', credentials: 'include' }).catch(()=>{})
  }
  return (
    <div>
      <label>邮箱
        <input type="email" {...register('email')} autoComplete="email" inputMode="email" />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).email?.message}</p>

      <label>登录密码
        <input type="password" {...register('password')} autoComplete="new-password" />
      </label>
      <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).password?.message}</p>

      <div>
        <label>验证码
          <input {...register('otp')} inputMode="numeric" />
        </label>
        <button type="button" onClick={sendOtp}>获取验证码</button>
        <p aria-live="polite" style={{color:'#c00'}}>{(errors as any).otp?.message}</p>
      </div>
    </div>
  )
}
