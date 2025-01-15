import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  ScrollableCameraViewPlugin,
  VariationConfiguratorPlugin,
  FrameFadePlugin,
  LoadingScreenPlugin,
  PickingPlugin,
  TweakpaneUiPlugin,
  MaterialConfiguratorPlugin,
  GLTFAnimationPlugin,

  // Import THREE.js internals
  Color,
	Texture,
  Vector3,
  InteractionPromptPlugin
} from 'webgi';

import { gsap } from "gsap";
import { _numWithUnitExp } from "gsap/gsap-core";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

async function setupViewer() {
  const viewer = new ViewerApp({
      canvas: document.getElementById('web-canvas-1'),
  });

  await addBasePlugins(viewer);
  // await viewer.addPlugin(ScrollableCameraViewPlugin);

  // const manager = await viewer.getPlugin(AssetManagerPlugin);
  // This must be called after adding any plugin that changes the render pipeline.
	viewer.renderer.refreshPipeline();

  // Load an environment map if not set in the glb file
  await viewer.setEnvironmentMap("./assets/autumn forest.hdr");

  // await manager.addFromPath("./assets/shoe.glb");
  
  await viewer.load("./assets/shoe.glb");

  const gltfAnimation = viewer.getPlugin(GLTFAnimationPlugin);
  const interactionPromptPlugin = viewer.getPlugin(InteractionPromptPlugin);
  interactionPromptPlugin.enabled = false;

  console.warn(viewer.scene);
  
  // disable user interaction, auto rotate model
  var controls = viewer.scene.activeCamera.controls; 
  controls.autoRotate = true; 
  controls.enabled = false; 
  controls.enableZoom = false; 
  controls.enablePan = false; 
  controls.enableDamping = false; 
  controls.enableRotate = false; 
  controls.autoRotateSpeed = 8;

  // set shoe model orientation
  viewer.scene.activeCamera.position = new Vector3(11, 0.2, 0.08);
  viewer.scene.activeCamera.target = new Vector3(-0.02, -0.05, -0.06);
//  gltfAnimation.playAnimation();
  


  // let scrollSection = document.getElementById("scrollSection");
  // await viewer.getPlugin(new ScrollableCameraViewPlugin(scrollSection));


  const viewerSpin = new ViewerApp({
    canvas: document.getElementById('web-canvas2'),
  });
  await addBasePlugins(viewerSpin);
  viewerSpin.renderer.refreshPipeline();
  await viewerSpin.setEnvironmentMap("./assets/autumn forest.hdr");
  await viewerSpin.load("./assets/shoe.glb");

  const interactionPromptPlugin2 = viewerSpin.getPlugin(InteractionPromptPlugin);
  interactionPromptPlugin2.enabled = false;

  viewerSpin.scene.activeCamera.position = new Vector3(4.4, 4.35, 7.68);
  viewerSpin.scene.activeCamera.target = new Vector3(0, 0, 0); // webgi values: -1.48, 0, 1.5

}

setupViewer();

// window.onscroll = function() {
//   if(document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//       document.querySelector('.back-to-top').style.display = 'block';
//   } else {
//       document.querySelector('.back-to-top').style.display = 'none';
//   }
// };

// let scrollSpeed = 1.0;

// // Add an event listener for the 'wheel' event
// document.addEventListener('wheel', function(event) {
//   // Prevent default scrolling behavior
//   event.preventDefault();

//   // Calculate the new scroll position
//   let delta = event.deltaY;
//   let scrollPosition = window.scrollY + (delta * scrollSpeed);

//   // Set the new scroll position
//   window.scrollTo({
//     top: scrollPosition,
//     behavior: 'smooth'
//   });
// },
// { passive: false });