import { AiFillGithub } from 'react-icons/ai'
import { CgYoutube } from 'react-icons/cg'
import { FaTwitter } from 'react-icons/fa'
import { GrLinkedin } from 'react-icons/gr'

const Footer = () => {
  return (
    <footer className="text-center bg-gray-900 text-white mt-20">
      <div className="flex justify-center items-center mx-auto space-x-3 p-4">
        <a
          href="https://www.linkedin.com/in/darlington-gospel-aa626b125/"
          target="_blank"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <GrLinkedin size={35} />
        </a>
        <a
          href="https://www.youtube.com/@dappmentors?sub_confirmation=1"
          target="_blank"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <CgYoutube size={35} />
        </a>

        <a
          href="https://github.com/Daltonic"
          target="_blank"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <AiFillGithub size={35} />
        </a>
        <a
          href="https://twitter.com/iDaltonic"
          target="_blank"
          type="button"
          className="rounded-full text-white leading-normal uppercase hover:bg-black
          hover:bg-opacity-5 focus:outline-none focus:ring-0
          transition duration-150 ease-in-out w-9 h-9"
        >
          <FaTwitter size={35} />
        </a>
      </div>
      <div
        className="flex flex-col justify-center items-center text-center p-4"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
      >
        © 2022
        <a
          className="flex space-x-2 text-whitehite"
          href="https://daltonic.github.io/"
        >
          <span>With Love ❤️</span>
          <span className="text-orange-700">Daltonic</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer
