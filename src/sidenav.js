import Desp from './assets/desp.png'
import LogoMin from './assets/logomin.png'
import Logout from './assets/logout.png'
import Settings from './assets/settings.png'
import Profile from './assets/profile.png'
import Project from './assets/project.png'
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'


function Sidenav() {
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const handleClickOpen = () => {
        setOpen2(true)
    };

    const handleClose = () => {
        setOpen2(false)
    };


    const cUser = "fer@fer.es"


    const cancelButtonRef = useRef(null)
    const [isActive, setIsActive] = useState(true);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const handleClick = () => {
        setIsActive(true);
        setIsActive2(false)
        setIsActive3(false)
    }
    const handleClick2 = () => {
        setIsActive(false);
        setIsActive2(true)
        setIsActive3(false)
    }
    const handleClick3 = () => {
        setIsActive(false);
        setIsActive2(false)
        setIsActive3(true)
    }
    return (
        <div>
        <div className={`${open ? "w-72" : "w-24"} flex flex-col duration-300 border border-yellow-500`}>
            <div className="h-1/2 border border-red-600 "></div>
        
            
            
            {/* <img src={Desp}
                alt="/"
                className={`w-10 h-10 absolute cursor-pointer -right-5 top-8 rounded-full  ${open && "rotate-180"}`}
                onClick={() => setOpen(!open)} />

            <div className="flex gap-x-4 items-center">
                <img src={LogoMin} alt="/" className={`w-10 h-10 cursor-pointer duration-500 ${open && "rotate-[360deg]"}`} />
                <h1 className={`text-white origin-left pl-4 text-xl duration-200 ${!open && "scale-0"}`}>
                    Menú
                </h1>
            </div>

            <ul className="pt-6">
                <div className={"flex pr-8 flex-col text-gray-300  cursor-pointer text-sm items-left"}>

                    <div onClick={handleClick} className={`${isActive ? "bg-gray-600" : ''} flex rounded-md p-2 gap-x-4 hover:bg-gray-600 mt-12`}>
                        <img src={Project} alt="/" className="w-5 h-5" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}> Proyectos </span>
                    </div>

                    <div onClick={handleClick2} className={`${isActive2 ? "bg-gray-600" : ''} flex rounded-md p-2 gap-x-4 hover:bg-gray-600 mt-96`}>
                        <img src={Profile} alt="/" className="w-5 h-5" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}> Perfil </span>
                    </div>

                    <div onClick={handleClick3} className={`${isActive3 ? "bg-gray-600" : ''} flex rounded-md p-2 gap-x-4 hover:bg-gray-600 mt-1`}>
                        <img src={Settings} alt="/" className="w-5 h-5" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}> Ajustes </span>
                    </div>


                    <div onClick={handleClickOpen} className="flex rounded-md p-2 gap-x-4 hover:bg-gray-600 mt-1">
                        <img src={Logout} alt="/" className="w-5 h-5" />
                        <span className={`${!open && "hidden"} origin-left duration-200`}> Cerrar Sesión </span>
                    </div>


                    <Transition.Root show={open2} as={Fragment}>
                        <Dialog as="div" className="relative z-10 font-s4c" initialFocus={cancelButtonRef} onClose={setOpen2}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-40"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-40"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                            </Transition.Child>

                            <div className="fixed z-10 inset-0 overflow-y-auto">
                                <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                    >
                                        <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
                                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                                <div className="sm:flex sm:items-start">
                                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                        <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                                    </div>
                                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                        <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                                            Cerrar Sesión
                                                        </Dialog.Title>
                                                        <div className="mt-2">
                                                            <p className="text-sm text-gray-500">
                                                                ¿Está seguro de que quiere cerrar su sesión?
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                                <button
                                                    type="button"
                                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-[#013545] text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={console.log("logout")}
                                                >
                                                    Cerrar Sesión
                                                </button>
                                                <button
                                                    type="button"
                                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-300 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                                    onClick={handleClose}
                                                    ref={cancelButtonRef}
                                                >
                                                    Cancelar
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition.Root>
                </div>
            </ul> */}
        </div>
        </div>

    )
}

export default Sidenav