import React from 'react';
import 'images/pedro-lastra.jpg'; 

export default function Cover() {                                                   
    return (
        <main>
            <div className="flex flex-col w-full bg-fixed bg-blend-darken bg-no-repeat bg-cover bg-center bg-[url('images/pedro-lastra.jpg')] bg-black/50" >
                <div className="grid h-screen card bg-base-300 rounded-box place-items-center">content</div>
                <div className="grid h-screen card bg-base-300 rounded-box place-items-center">content</div>
            </div>
        </main>
    ) 
}