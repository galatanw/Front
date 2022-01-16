import React from 'react'
import { SpinnerDotted } from 'spinners-react';
export default function StillLogged({userName}) {
    return (
        <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <h1>{userName}</h1>
        <SpinnerDotted size={88} thickness={180} speed={180} color="rgba(57, 163, 172, 1)" />
        </div>
    )
}
