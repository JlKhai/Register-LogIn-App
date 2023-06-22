const Error = () => {
  return (
    <>
      <div className="flex flex-col mt-10 justify-center gap-10 items-center">
        <p className="font-semibold text-2xl">Uh-Oh...</p>
        <p className="max-w-md text-center tracking-wider">
          The page you are looking for may have been removed, deleted, or
          posibly never existed.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-4 mt-10">
        <h2 className="mt-2 text-[200px] font-bold text-red-500">404</h2>
        <h2 className=" font-semibold">Page Not Found </h2>
      </div>
    </>
  )
}

export default Error
