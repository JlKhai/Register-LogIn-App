import { Checkbox, Loader, PasswordInput, TextInput } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../redux/api/authApi'
import { useDispatch } from 'react-redux'
import { getUser } from '../redux/service/authSlice'
import { useForm } from '@mantine/form'
import Contactme from '../components/Contactme'

const Login = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [login, { isLoading }] = useLoginMutation()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),

      password: (value) =>
        value.length < 7 ? 'Password must have at least 7 letters' : null,
    },
  })

  return (
    <>
      <div className="bg-indigo-900 flex justify-center items-center h-screen">
        {/* Using Mantine Libary Form */}
        <form
          className=" relative z-0 w-[300px] flex flex-col gap-6 p-7 bg-gray-200 "
          onSubmit={form.onSubmit(async (values) => {
            try {
              const { data } = await login(values)
              // console.log(values)
              // console.log(data)
              // sending the data to Dashboard
              dispatch(getUser({ user: data?.user, token: data?.token }))

              if (data?.success) {
                nav('/')
              }
            } catch (error) {
              console.log(error)
            }
          })}
        >
          <h2 className="font-bold text-2xl text-indigo-800 text-center mb-4">
            LogIn
          </h2>
          {/* Using input from Mantine libary */}
          <TextInput
            {...form.getInputProps('email')}
            variant="filled"
            className="outline-none border-none   "
            placeholder="Email"
          />
          <PasswordInput
            {...form.getInputProps('password')}
            variant="filled"
            className="outline-none border-none   "
            placeholder="Password"
          />

          <div>
            <Checkbox
              className="mb-4"
              mt="md"
              label="I agree with the policy"
              {...form.getInputProps('termsOfService', { type: 'checkbox' })}
            />
            <button
              type="submit"
              className="select-none  px-6 py-2 bg-indigo-700 hover:bg-indigo-600 transition ease-in duration-200 rounded-full text-white w-[100%]"
            >
              {isLoading ? (
                <Loader
                  color="white"
                  className="text-center mx-auto w-24"
                  size="sm"
                />
              ) : (
                'Login'
              )}
            </button>
            <div className="flex gap-2 mt-3">
              <p className="text-sm text-gray-500 select-none">
                Don't have an account?
              </p>
              <Link to={'/register'}>
                <p className="cursor-pointer select-none font-semibold text-sm text-blue-500 hover:text-blue-400">
                  Register
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
      <Contactme />
    </>
  )
}

export default Login
