import React from "react";

// @ts-ignore
const Label = ({status, message}) => {
    return <>
        {(() => {
            if (status !== '') {
                if (status === 'Error') {
                    return <div className="inline-flex items-center bg-white leading-none text-red-600 rounded-full p-2 shadow text-teal text-sm">
                        <span className="inline-flex bg-red-600 text-white rounded-full h-6 px-3 justify-center items-center">{status}</span>
                        <span className="inline-flex px-2">{message}</span>
                    </div>
                } else if (status === 'Success') {
                    return <div className="inline-flex items-center bg-white leading-none text-green-600 rounded-full p-2 shadow text-teal text-sm">
                        <span className="inline-flex bg-green-600 text-white rounded-full h-6 px-3 justify-center items-center">{status}</span>
                        <span className="inline-flex px-2">{message}</span>
                    </div>
                }
            }
        })()}
    </>
}

Label.defaultProps = {
    status: '',
    message: '',
}

export default Label