import React from 'react'
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Loader from '../components/Loader';
import Robot from '../models/Robot';

const RobotLanding = () => {
  return (

    <div className="relative bg-gradient-to-r from-pink-500 to-pink-700">
  {/* ESCROW Text Behind the Skull */}
  <h1 className="font-playwrite text-white text-[5rem] sm:text-[10rem] md:text-[15rem] lg:text-[20rem] absolute inset-0 flex justify-center items-center z-10 ">
  Hunter
</h1>





  {/* Skull Landing Section */}
  <section className="w-full h-[30rem] relative z-10">
    <Canvas
      className="w-full h-screen"
      camera={{ near: 0.1, far: 1000 }}
      gl={{ alpha: true }}  
    >
      <Suspense fallback={<Loader />}>
<ambientLight intensity={1} />

<directionalLight
  position={[2, 4, 5]}
  intensity={4}
  color={'#ffffff'}  
  castShadow
/>

<directionalLight
  position={[-3, 4, 5]}
  intensity={3.5}
  color={'#ffffff'}
/>

<directionalLight
  position={[0, 5, -5]}
  intensity={3}
  color={'#ffffff'}
  castShadow
/>

<pointLight
  position={[0, 6, 0]}
  intensity={5}
  color={'#ffffff'}
/>

<pointLight
  position={[0, -6, 0]}
  intensity={5}
  color={'#ffffff'}
/>



        <Robot scale={[6, 6, 6]} position={[0, -4, -9]} rotation={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  </section>
</div>







  )
}

export default RobotLanding