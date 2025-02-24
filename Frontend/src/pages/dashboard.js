import axios from 'axios'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import DDButton from '../components/dashboardcomponents/dropdownbutton'
import UPopup from '../components/uploadpopup'
import MyDocuments from '../components/sidebar/mydocuments'
import DocumentTypes from '../components/sidebar/documenttypes'
import APIService from '../components/sidebar/apiservices'
import ModelTraining from '../components/sidebar/modeltraining'
import ModelReport from '../components/ModelReport'
import Settings from '../components/sidebar/settings'
import { logout } from '../reducers/loginReducer'

function DashBoard () {
    const location = useLocation()
    const navigate = useNavigate()
    const [pathname, setPathname] = useState( location.pathname )
    const [activeTab, setActiveTab] = useState( 'DocumentType' )
    const dispatch = useDispatch()
    const { username, email } = useSelector( ( state ) => state.auth )
    const [docTypes, setDocTypes] = useState( [] )
    const [selectedDocType, setSelectedDocType] = useState( null )

    const updateDocTypes = ( _docTypes ) => {
        setDocTypes( _docTypes )
    }

    const handleTabClick = ( tab ) => {
        var prevTab = document.getElementById( activeTab )
        if ( prevTab ) prevTab.classList.remove( 'dark:bg-gray-700' )
        setActiveTab( tab )
        navigate( `/dashboard` )
        const element = document.getElementById( tab )
        element.classList.add( 'dark:bg-gray-700' )
    }

    useEffect( () => {
        // Get all the document types
        axios( `${process.env.REACT_APP_BACKEND}/doc_type/get_all/`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                setDocTypes( res.data.doctypes )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )

    useEffect( () => {
        setPathname( location.pathname )
    }
        , [location.pathname] )

    const renderPageContent = () => {
        switch ( activeTab ) {
            case 'DocumentType':
                return (
                    <DocumentTypes
                        docTypes={docTypes}
                        updateDocTypes={updateDocTypes}
                    />
                )
            case 'MyDocuments':
                return <MyDocuments />
            case 'Model&Training':
                return <ModelTraining />
            case 'API&Services':
                return <APIService />
            case 'Settings':
                return <Settings />
            default:
                return <DocumentTypes />
        }
    }

    const handleSignout = async ( e ) => {
        console.log( 'sign out' )
        dispatch( logout() )
        navigate( '/' )
    }
    return (
        <div class="container min-h-screen">
            {/* Popup Component for file upload */}
            <UPopup
                selectedDocType={selectedDocType}
                setSelectedDocType={setSelectedDocType}
            />

            {/* Navbar | Top of the screen */}
            <nav class="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div class="px-3 py-3 lg:px-5 lg:pl-3">
                    <div class="flex items-center justify-between">
                        {/* Logo | Top Left of the screen*/}
                        <div class="flex items-center justify-start">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span class="sr-only">Open sidebar</span>
                                <svg
                                    class="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clip-rule="evenodd"
                                        fill-rule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a href="/" class="flex ml-2 md:mr-24">
                                <img
                                    src="../docbite.png"
                                    class="h-8 mr-3"
                                    alt="DocBite Logo"
                                />
                                <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    DocBite
                                </span>
                            </a>
                        </div>

                        {/* User Account Dropdown | Top Right of the screen*/}
                        <div class="flex items-center">
                            <div class="flex items-center ml-3">
                                <div>
                                    <button
                                        type="button"
                                        class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span class="sr-only">
                                            Open user menu
                                        </span>
                                        <img
                                            class="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div
                                    class="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="dropdown-user"
                                >
                                    <div class="px-4 py-3" role="none">
                                        <p
                                            class="text-sm text-gray-900 dark:text-white"
                                            role="none"
                                        >
                                            {username}
                                        </p>
                                        <p
                                            class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                            role="none"
                                        >
                                            {email}
                                        </p>
                                    </div>
                                    <ul class="py-1" role="none">
                                        <li>
                                            <a
                                                href="#"
                                                onClick={() =>
                                                    handleTabClick( 'Settings' )
                                                }
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <div
                                                onClick={handleSignout}
                                                class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Sign out
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar | Left of the screen */}
            <aside
                id="logo-sidebar"
                class="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul class="space-y-2">
                        <li>
                            <DDButton
                                docTypes={docTypes}
                                setSelectedDocType={setSelectedDocType}
                            />
                        </li>
                        <li>
                            <a
                                href="#"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                                onClick={() => handleTabClick( 'DocumentTypes' )}
                                id="DocumentTypes"
                            >
                                <svg
                                    aria-hidden="true"
                                    class="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                                </svg>
                                <span class="ml-3">Document Types</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick( 'MyDocuments' )}
                                id="MyDocuments"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">
                                    My Documents
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick( 'Model&Training' )}
                                id="Model&Training"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                                    <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">
                                    Model & Training
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick( 'API&Services' )}
                                id="API&Services"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">
                                    API & Services
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleTabClick( 'Settings' )}
                                id="Settings"
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                                <svg
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">
                                    Settings
                                </span>
                            </a>
                        </li>
                        <li>
                            <div
                                onClick={handleSignout}
                                class="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                            >
                                <svg
                                    aria-hidden="true"
                                    class="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                <span class="flex-1 ml-3 whitespace-nowrap">
                                    Sign Out
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </aside>
            {pathname.startsWith( "/dashboard/model" ) && <ModelReport />}
            {( pathname === "/dashboard" || pathname === "/dashboard/" ) && <div>{renderPageContent()}</div>}

        </div>
    )
}

export default DashBoard
