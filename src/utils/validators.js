import * as yup from 'yup'

/* eslint-disable-next-line no-useless-escape */
const password_regex =
  /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/
/* eslint-enable-next-line no-useless-escape */

export const signupSchema = yup
  .object({
    email: yup.string().trim().required().email(),
    password: yup
      .string()
      .min(8)
      .matches(
        password_regex,
        'Password must have 1 uppercase & lowercase each, 1 number and a symbol.'
      ),
  })
  .required()

export const signinSchema = yup
  .object({
    email: yup.string().trim().required().email(),
    password: yup.string().trim().required(),
  })
  .required()

export const createTodoSchema = yup
  .object({
    items: yup.array().of(yup.string()).min(1).required(),
  })
  .required()