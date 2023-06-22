import Contactme from '../components/Contactme'
import Navbar from '../components/Navbar'
import Cookies from 'js-cookie'

const Dashboard = () => {
  //getting the data from Cookies
  const user = JSON.parse(Cookies.get('user'))
  return (
    <>
      <Navbar />
      <div className="bg-gray-300 flex flex-col gap-5 justify-center items-center h-screen">
        <h2 className="max-w-sm md:max-w-md text-center text-4xl text-gray-600 font-bold">
          Welcome to{' '}
          <span className="select-none text-red-500"> {user?.name}'s </span>{' '}
          space!
        </h2>
        <p className="max-w-sm md:max-w-md text-center text-2xl text-gray-700 font-semibold">
          Thank You for your visit.
        </p>
      </div>
      <Contactme />
    </>
  )
}

export default Dashboard
