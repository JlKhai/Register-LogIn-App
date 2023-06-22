import { CgProfile } from 'react-icons/cg'
import { Menu, Button } from '@mantine/core'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useLogoutMutation } from '../redux/api/authApi'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { removeUser } from '../redux/service/authSlice'
const Navbar = () => {
  // const user = useSelector((state) => state.authSlice.user)
  // const token = useSelector((state) => state.authSlice.token)
  // console.log(token)
  // console.log(user)

  //getting the data from Cookies
  const user = JSON.parse(Cookies.get('user'))
  const token = Cookies.get('token')

  const nav = useNavigate()
  const dispatch = useDispatch()
  const [logout] = useLogoutMutation()

  const logoutHandler = async () => {
    try {
      const data = await logout(token)
      // console.log(data)

      //removing the data from Cookies
      dispatch(removeUser())

      if (data?.data?.success) {
        nav('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="p-7 bg-indigo-700 flex justify-around">
      <div className="flex items-center gap-4">
        <div className="flex justify-center gap-5">
          <span className="text-2xl md:text-3xl select-none text-red-500 font-bold">
            {user?.name}'s
          </span>
        </div>
        <h2 className=" text-sm text-white ">page</h2>
      </div>
      <Menu
        className="bg-gray-200 hover:bg-white rounded-full w-[50px] h-[50px] p-2"
        shadow="md"
        width={200}
      >
        <Menu.Target>
          <Button>
            <CgProfile className="text-6xl text-indigo-600" />
          </Button>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label className="cursor-pointer select-none">
            Edit Profile
          </Menu.Label>

          <Menu.Divider />

          <Menu.Label
            onClick={logoutHandler}
            className="cursor-pointer select-none text-indigo-600 hover:text-indigo-400"
          >
            LogOut
          </Menu.Label>
        </Menu.Dropdown>
      </Menu>
    </div>
  )
}

export default Navbar
