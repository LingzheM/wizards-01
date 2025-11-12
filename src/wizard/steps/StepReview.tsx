import { useFormContext } from 'react-hook-form'

export default function StepReview() {
  const { getValues } = useFormContext()
  const v = getValues()
  const safe = { ...v, password: '******' }
  return (
    <div>
      <h3>复核信息</h3>
      <pre style={{ background:'#f6f6f6', padding: 12 }}>{JSON.stringify(safe, null, 2)}</pre>
      <p>确认无误后点击“提交审核”</p>
    </div>
  )
}
