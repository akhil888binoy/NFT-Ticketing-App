import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from "@react-three/fiber";
import robotScene from "../assets/3d/robot.glb";
import { a } from "@react-spring/three";

const Robot =(props)=>{
    const robotRef = useRef();
  const { nodes, materials } = useGLTF(robotScene);
  useFrame(() => {
    if (robotRef.current) {
      robotRef.current.rotation.y += 0.01; // Adjust the rotation speed as needed
    }
  });
  return (
    <a.group {...props} ref={robotRef}>
        <mesh
          
          geometry={nodes.Object_4.geometry}
          material={materials.Material}
        />
        <mesh
          
          geometry={nodes.Object_5.geometry}
          material={materials.Black}
        />
        <mesh
         
          geometry={nodes.Object_6.geometry}
          material={materials.Bright_Blue}
        />
      
      <mesh
        
        geometry={nodes.Object_8.geometry}
        material={materials.Metal}
      />
    </a.group>
  )
}

export default Robot;