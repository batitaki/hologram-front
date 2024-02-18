import React from 'react';
import CreateSketch from '../components/sketch/list/CreateSketch.js';
import StarsComponent from '../components/sketch/audio/StarsComponent.js';
import DrawComponent from '../components/sketch/draw/DrawComponent';
import DrawImagesSketch from '../components/sketch/draw/DrawImagesSketch.js';
import AudioVisualizerComponent from '../components/sketch/audio/AudioVisualizerComponent.js';
import DrawCirclesComponent from '../components/sketch/draw/DrawCirclesComponent';
import ParticleComponent from '../components/sketch/audio/ParticleComponent.js';



const SketchRoutes = [
  { path: '/createSketch', element: <CreateSketch /> },
  { path: '/DrawShapes', element: <DrawComponent /> },
  { path: '/DrawImagesSketch', element: <DrawImagesSketch /> },
  { path: '/StarsSketch', element: <StarsComponent /> },
  { path: '/AudioParticlesSketch', element: <ParticleComponent /> },
  { path: '/AudioVisualizerSketch', element: <AudioVisualizerComponent /> },
  { path: '/SphereImagesSketch', element: <DrawCirclesComponent /> }, 
];

export default SketchRoutes;
