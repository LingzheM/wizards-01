import { z } from 'zod'

export const accountSchema = z.object({
  email: z.string().email({ message: '邮箱格式不正确' }),
  password: z.string().min(8, '至少 8 位'),
  otp: z.string().length(6, '6 位验证码'),
})

export const profileSchema = z.object({
  fullName: z.string().min(1, '姓名必填'),
  birthDate: z.string().min(1, '生日必填'),
  nationality: z.string().min(1, '国籍必填'),
})

export const contactSchema = z.object({
  address: z.string().min(5, '地址过短'),
  postalCode: z.string().min(3, '邮编过短'),
  occupation: z.string().min(2, '职业过短'),
})

export const kycSchema = z.object({
  idType: z.enum(['passport','idcard','license'], { required_error: '请选择证件类型' }),
  idNumber: z.string().min(5, '证件号码过短'),
  idImages: z.array(z.string().url('图片URL非法')).min(1, '至少上传 1 张身份证明图片'),
})

export const termsSchema = z.object({
  agreePrivacy: z.literal(true, { errorMap: () => ({ message: '必须同意隐私条款' }) }),
  agreeRisk: z.literal(true, { errorMap: () => ({ message: '必须同意风险披露' }) }),
})

export const fullSchema = accountSchema
  .merge(profileSchema)
  .merge(contactSchema)
  .merge(kycSchema)
  .merge(termsSchema)
  .superRefine((data, ctx) => {
    if (data.idType === 'passport' && !/^[A-Z0-9]{6,}$/.test(data.idNumber)) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, message: '护照号格式不正确', path: ['idNumber'] })
    }
  })

export type FullForm = z.infer<typeof fullSchema>
