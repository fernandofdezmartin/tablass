import { useState } from "react";
import Desp from './assets/desp.png'
import LogoMin from './assets/logomin.png'

import Logout from './assets/logout.png'
import Settings from './assets/settings.png'
import Profile from './assets/profile.png'
import Project from './assets/project.png'
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'
import App from "./App";
import Sidenav from "./sidenav";


function AppLay() {
    
    return (
        <div>
            <div className="flex flex-row h-screen border border-red-500">
                <div class="bg-[#013545] border border-green-500">
                    <Sidenav />
                </div>
                <div className="flex flex-col w-screen border border-blue-900">
                    <div className="flex flex-row h-20 border border-red-900">
                        <div className="flex items-center w-1/2 h-20 border border-green-900 ">
                            <h1 className="ml-6 text-[#013545] ">Proyectos Observacionales</h1>
                        </div>
                        <div className="flex items-center justify-end w-1/2 h-20 border border-green-900">
                            <div className="mr-3">
                                <h1>fer@fer.com</h1>
                            </div>
                            <div className='flex justify-center items-center w-1 h-1 rounded-full bg-[#013545] p-7  mr-6'>
                                <label className="font-s4c text-white font-semi-bold text-4xl">F</label>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-screen bg-slate-400 border border-red-500"><App /></div>
                </div>
            </div>
        </div>
    )
}
export default AppLay;
