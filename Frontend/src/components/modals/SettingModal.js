import { useState, useEffect } from 'react'
import axios from 'axios'
import ModalBtn from '../dropdowns/ModelDropDown'

function SettingModal ( { isOpen, onCloseModal, doc_type_details } ) {
    const [models, setModels] = useState( [] )
    const [model_id, setModelId] = useState( doc_type_details?.model || '' )

    function handleOverlayClick ( e ) {
        if ( e.target.id === 'modal-overlay' ) {
            onCloseModal()
        }
    }
    const handleModelAssignment = ( event ) => {
        axios
            .post(
                `${process.env.REACT_APP_BACKEND}/doc_type/${doc_type_details.id}/model`,
                { model_id: model_id },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
                { withCredentials: true }
            )
            .then( ( response ) => {
                console.log( 'Request successful', response.data )
            } )
            .catch( function ( response ) {
                console.log( response )
            } )
        onCloseModal()
        window.location.href( '/dashboard' )
    }
    useEffect( () => {
        // Get all the document types
        axios( `${process.env.REACT_APP_BACKEND}/predict/`, {
            method: 'GET',
            withCredentials: true,
        } )
            .then( ( res ) => {
                setModels( res.data.models )
            } )
            .catch( ( err ) => {
                console.log( err )
            } )
    }, [] )

    if ( !isOpen ) return null

    return (
        <div
            id="modal-overlay"
            onClick={handleOverlayClick}
            className={`fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-30 flex justify-center items-center z-50 ${isOpen
                ? 'opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
                }`}
        >
            <div class="relative w-full h-full max-w-2xl md:h-auto">
                <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                            Settings
                        </h3>
                        <button
                            onClick={onCloseModal}
                            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="settingModal"
                        >
                            <svg
                                class="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clip-rule="evenodd"
                                ></path>
                            </svg>
                        </button>
                    </div>

                    <div class="p-6 flex justify-start">
                        <div class="flex flex-col justify-center">
                            <span class=" font-normal text-gray-900 dark:text-white">
                                Select Model:
                            </span>
                        </div>
                        <div class="ml-2 flex flex-1 justify-start">
                            <ModalBtn
                                models={models}
                                setModelId={setModelId}
                                model={model_id}
                            />
                        </div>
                    </div>

                    <div class="pl-6 flex justify-start mb-6">
                        <div class="flex flex-col justify-center">
                            <span class="  text-gray-900 dark:text-white">
                                Task Type:
                            </span>
                        </div>
                        <div class="ml-2 flex flex-1 justify-start">
                            <span class=" font-semibold text-gray-900 dark:text-white">
                                Token Classification
                            </span>
                        </div>
                    </div>

                    <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={handleModelAssignment}
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                        <button
                            onClick={onCloseModal}
                            class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingModal
