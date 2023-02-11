import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

import { AmbientLight, Loader } from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { ParametricGeometry } from "./parametric";
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';






const ThreeScene = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(dimensions.width, dimensions.height);

  useEffect(() => {
    // Get the container reference
    const container = containerRef.current;

    // Set up the scene, camera, and renderer
  
    // Add the cube to the scene
  
    // scene.add(cube);

    // // Add the DNA shape to the scene
    // const func = (u, v, target) => {
    //  let alpha= Math.PI*2*u 
    //  let beta=  Math.PI*2*v
    //  let x=u*Math.cos(beta);
    //  let y=u*Math.sin(beta);
    //  let z=0.1*beta;
    //  target.set(x,y,z)
    // };

    // const geometry = new ParametricGeometry(func,25, 25);
    
    // const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 ,side:THREE.DoubleSide,wireframe:true});

    // // create a mesh
    // const mesh = new THREE.Mesh(geometry, material2);
    // scene.add(mesh);
   
    

    let loader = new FontLoader();
    let downloadUrl = new URL('../../fonts/ftest.json', import.meta.url);

  
    
   

    const dnaGeometry = new THREE.TorusGeometry(1, 0.1, 16, 100);

    dnaGeometry.applyMatrix4(new THREE.Matrix4().makeRotationZ(Math.PI / 3));
    
    const height = 2;
    const rotationAngle = 2 * Math.PI;
    const revolutionAngle = 2 * Math.PI;
    const numRevolutions = 5;

   
    // const radius = 2;
    // const tubeRadius = 0.5;
    // const radialSegments = 32;
    // const tubularSegments = 100;
    // const helix = new THREE.TorusGeometry(radius, tubeRadius, radialSegments, tubularSegments);

    // // create a material
    // const material = new THREE.MeshBasicMaterial({ color: 0xffff00,wireframe :true });

    // // create a mesh
    // const helixMesh = new THREE.Mesh(helix, material);

    // scene.add(helixMesh);
   





    function helixMesh3( pointsOnCurve, color ) {
  
      const curve = new THREE.CatmullRomCurve3( pointsOnCurve );
    
      const geometry3 = new THREE.TubeGeometry( curve, 100, 0.25, 12, false );
      const material3 = new THREE.MeshPhysicalMaterial( { color,metalness:0.5,roughness:0.5 } );
      return new THREE.Mesh( geometry3, material3 );
    
    }

   





    // const upperHelix = helixMesh3( upperHelixPoints, 0x049ef4 );
    // const lowerHelix = helixMesh3( lowerHelixPoints, 0x049ef4 );



    function helixPoint( a, b, t ) {
  
      return new THREE.Vector3( a * Math.cos( t ), a * Math.sin( t ), b * t );
    
    }
    
    function helixPointsArray( a, b ) {
    
      const curvePoints = [];
    
      for ( let t = -20; t < 20; t += 0.5 ) {
    
        curvePoints.push( helixPoint( a, b, t ) );
    
      }
    
      return curvePoints;
    
    }
  

  
    
    
    function createConnectingtext( DNA, upperHelixPoints, lowerHelixPoints ) {


    const array= 'AYUSH GOUR IS MY NAME YOU HAVE NOT HEARD OF'  
    upperHelixPoints.forEach( ( upperPoint, index ) => {
    
      // if( index % 2 !==0 ) return;
      
      const lowerPoint = lowerHelixPoints[ index ];

      
     console.log(upperHelixPoints.length)

      loader.load( downloadUrl+"/", ( font )  =>{
    
        const textGeo = new  TextGeometry( array[index], {
    
            font: font,
            size: 2,
            height: 0.5,
            curveSegments: 12,
            
          
          
    
        } );
    
        const textMaterial = new THREE.MeshPhysicalMaterial( { color: 0xace543,roughness:0.5,metalness:0.5} );
    
        const mesh2 = new THREE.Mesh( textGeo, textMaterial );
        mesh2.rotation.x = -Math.PI / 2;
       

      
        mesh2.translateY(3*(index-19));
        
         DNA.add(mesh2)
    
      } );
      
  
      
      
    } );
    }


    function createConnectingRods( DNA, upperHelixPoints, lowerHelixPoints ) {
  
      upperHelixPoints.forEach( ( upperPoint, index ) => {
    
        if( index % 2 !== 0 ) return;
    
        const lowerPoint = lowerHelixPoints[ index ];
    
        const curve = new THREE.LineCurve3( upperPoint, lowerPoint );

        
    
        const geometry = new THREE.TubeGeometry( curve, 100, 0.25, 12, false );
        const material = new THREE.MeshPhysicalMaterial( { color:0x3f7b9d ,roughness:0.5} );




        DNA.add( new THREE.Mesh( geometry, material ) );
    
      } );
    }

  


   function createDNA() {
  
    const DNA = new THREE.Group();
  
    const upperHelixPoints = helixPointsArray( 3, 3, 0xff00ff );
    const lowerHelixPoints = helixPointsArray( -3, 3 );
  
    const upperHelix = helixMesh3( upperHelixPoints, 0xff00ff );
    const lowerHelix = helixMesh3( lowerHelixPoints, 0x00ff00 );
  
    DNA.add( upperHelix, lowerHelix );
  
    createConnectingRods( DNA, upperHelixPoints, lowerHelixPoints );
    createConnectingtext( DNA, upperHelixPoints, lowerHelixPoints );
  
    return DNA;
  
  }
   
   
  const DNA = createDNA();
  DNA.scale.set(0.5,0.5,0.5);

  scene.add( DNA );
   

    // for (let i = 0; i < dnaGeometry.vertices.length; i++) {
    //   const vertex = dnaGeometry.vertices[i];
    //   const revolution = vertex.x / height * numRevolutions * revolutionAngle;
    //   vertex.z = height * Math.sin(revolution);
    //   vertex.x = height * Math.cos(revolution);
    //   vertex.y = height * (i / dnaGeometry.vertices.length) * rotationAngle;
    // }
 
    // dnaGeometry.computeVertexNormals();

    // const dnaMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, transparent: true, opacity: 1});

    // const dna = new THREE.Mesh(dnaGeometry, dnaMaterial);

    // dna.rotation.x = Math.PI / 2;
    // dna.translateZ(3)
    // scene.add(dna);
   DNA.position.z+= -25;

   window.addEventListener("keyup", function (event) {
    if (event.key == "ArrowUp") {
      animatemove()
      return;
    }
    if (event.key == "ArrowDown") {
      animatemovedown()
      return;
    }
   
  });

  window.addEventListener("space", function (event) {
    if (event.key == "Space") {
      cancelAnimationFrame(animate);
      return;
    }

    
    
   
  });

  const animatemove = () => {
    requestAnimationFrame(animatemove);
    
    // controls.update();
    // DNA.rotation.z += 0.01;
    // dna.rotation.y += 0.01;
    // dna.rotation.x += 0.01;
    DNA.position.z +=0.01;
   
    renderer.render(scene, camera);
  };


  const animatemovedown = () => {
    requestAnimationFrame(animatemove);
    
    // controls.update();
    // DNA.rotation.z += 0.01;
    // dna.rotation.y += 0.01;
    // dna.rotation.x += 0.01;
    DNA.position.z -= 0.01;
   
    renderer.render(scene, camera);
  };
   
    const light = new THREE.PointLight(0xffffff);
    // light.position.set(10, 10, 10);
    const Alight = new THREE.AmbientLight(0xffffff, 1, 10);
    scene.add(light,Alight);
    // const controls= new OrbitControls(camera,renderer.domElement)
    // const lighthelper = new THREE.PointLightHelper(light);
    // scene.add(lighthelper)

    // var size = 10;
    // var divisions = 10;
    // var gridHelper = new THREE.GridHelper( size, divisions );
    // scene.add( gridHelper );


    camera.position.set(0, 5,0);
    camera.lookAt(0, 0, 0);

    // Move the camera back so we can see the cube and DNA shape
    // camera.position.x = 5;

    // Append the renderer's DOM element to the container
    container.appendChild(renderer.domElement);

    // Start the animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      
      // controls.update();
      DNA.rotation.z += 0.01;
      // dna.rotation.y += 0.01;
      // dna.rotation.x += 0.01;
      // DNA.position.z +=0.01;
     
      renderer.render(scene, camera);
    };
    animate();

    // Update the dimensions when the window is resized
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);

    // Clean up event listeners when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dimensions]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default ThreeScene;
