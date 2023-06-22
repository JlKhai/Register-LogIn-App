import { Loader, PasswordInput, TextInput } from '@mantine/core'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../redux/api/authApi'
import { useForm } from '@mantine/form'
import Contactme from '../components/Contactme'

const Register = () => {
  const nav = useNavigate()
  const [register, { isLoading }] = useRegisterMutation()

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    },

    validate: {
      name: (value) =>
        value.length < 3 ? 'Name must have at least 3 letters' : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),

      password: (value) =>
        value.length < 7 ? 'Password must have at least 7 letters' : null,

      password_confirmation: (value) =>
        value.length < 7
          ? 'Password confirmation must have at least 7 letters'
          : null,
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
              const { data } = await register(values)
              // console.log(values)
              // console.log(data)
              if (data?.success) {
                nav('/login')
              }
            } catch (error) {
              console.log(error)
            }
          })}
        >
          <div className="shadow-lg py-2 z-10 absolute top-4 left-[-10px] bg-indigo-700 w-[320px] flex justify-center gap-2">
            <h2 className="font-bold text-2xl text-white">Registration</h2>
            <span className="text-white font-bold">Form</span>
          </div>
          <TextInput
            {...form.getInputProps('name')}
            variant="filled"
            className="pt-16 outline-none border-none   "
            placeholder="Name"
          />
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
          <PasswordInput
            {...form.getInputProps('password_confirmation')}
            variant="filled"
            className="outline-none border-none   "
            placeholder="Password comfirmation"
          />
          <div className="mt-3">
            <button
              type="submit"
              className=" select-none  px-6 py-2 bg-indigo-700 hover:bg-indigo-600 text-white w-[100%]"
            >
              {isLoading ? (
                <Loader
                  color="white"
                  className="text-center mx-auto w-24"
                  size="sm"
                />
              ) : (
                'Register'
              )}
            </button>
            <div className="flex gap-2 mt-3">
              <p className="text-sm text-gray-500 select-none">
                Already have an account?
              </p>
              <Link to={'/login'}>
                <p className="cursor-pointer select-none font-semibold text-sm text-blue-500 hover:text-blue-400">
                  Login
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

export default Register
