import { AiFillGithub } from 'react-icons/ai'
import { CgYoutube } from 'react-icons/cg'
import { GrLinkedin } from 'react-icons/gr'

const Footer = () => {
  return (
    <footer className="fixed bottom-0 right-0 left-0 text-center bg-gray-900 text-white mt-20">
      <div className="mx-auto space-x-3 p-4">
        <a
          href="#"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <GrLinkedin size={35} />
        </a>
        <a
          href="#"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <CgYoutube size={35} />
        </a>

        <a
          href="#"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <AiFillGithub size={35} />
        </a>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2022 Copyright
        <a
          className="flex space-x-2 text-whitehite"
          href="https://tailwind-elements.com/"
        >
          <span>KELzzz</span>
          <span className="text-orange-700">Codes</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
