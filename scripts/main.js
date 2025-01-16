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
  timeout,

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

  // SHOE1: HERO
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
  await viewer.load("./assets/shoe.glb");

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

  // SHOE2: 360
  const viewerSpin = new ViewerApp({
    canvas: document.getElementById('web-canvas2'),
  });
  await addBasePlugins(viewerSpin);
  viewerSpin.renderer.refreshPipeline();
  await viewerSpin.setEnvironmentMap("./assets/autumn forest.hdr");
  await viewerSpin.load("./assets/shoe.glb");

  const interactionPromptPlugin2 = viewerSpin.getPlugin(InteractionPromptPlugin);
  interactionPromptPlugin2.enabled = false;

  // set user camera controls
  var controlsSpin = viewerSpin.scene.activeCamera.controls;
  controlsSpin.autoRotate = false;
  controlsSpin.enabled = false; 
  controlsSpin.enableZoom = false; 
  controlsSpin.enablePan = false; 
  controlsSpin.enableDamping = false; 
  controlsSpin.enableRotate = true;  
  
  viewerSpin.scene.activeCamera.position = new Vector3(4.4, 4.35, 14); // webgi values: 4.4, 4.35, 7.68
  viewerSpin.scene.activeCamera.target = new Vector3(0, 0, 0); // webgi values: -1.48, 0, 1.5

  // SHOE3: EXPLOSION
  const viewerExplode = new ViewerApp({
    canvas: document.getElementById('web-canvas3'),
  });
  await addBasePlugins(viewerExplode);
  viewerExplode.renderer.refreshPipeline();
  await viewerExplode.setEnvironmentMap("./assets/autumn forest.hdr");
  await viewerExplode.load("./assets/shoe.glb");

  const interactionPromptPlugin3 = viewerExplode.getPlugin(InteractionPromptPlugin);
  interactionPromptPlugin3.enabled = false;

  // set user camera controls
  var controlsExplode = viewerExplode.scene.activeCamera.controls;
  controlsExplode.autoRotate = false; 
  controlsExplode.enabled = false; 
  controlsExplode.enableZoom = false; 
  controlsExplode.enablePan = false; 
  controlsExplode.enableDamping = false; 
  controlsExplode.enableRotate = false;
  
  // model orientation
  viewerExplode.scene.activeCamera.position = new Vector3(19, -0.51, 1.9);  // webgi values: 19, -0.51, 1.9
  viewerExplode.scene.activeCamera.target = new Vector3(5, -0.7, 0);  // webgi values: 0, 0, 0
 
  const gltfAnimation = viewerExplode.getPlugin(GLTFAnimationPlugin); // get model animation
  gltfAnimation.loopAnimations = false; 
  gltfAnimation.animationSpeed = 2;
 
  async function explodeShoe() { 
    gltfAnimation.playAnimation(); 
    await timeout(3000);  // miliseconds to wait for animation to end
    gltfAnimation.pauseAnimation(); 
  } 
 
  async function unexplodeShoe() { 
    gltfAnimation.playAnimation(); 
  } 
 
  ScrollTrigger.create({ 
    trigger: "#shoe-explosion",
    start: "top 40%",
    end: "bottom top", // end when bottom of section reaches top of screen
    onEnter: () => { 
        explodeShoe(); // explode shoe when entering
    }, 
    onLeaveBack: () => { 
        unexplodeShoe();  // put the shoe back when leaving
    }, 
  });

  
 
 // "bubble" animations
  function animateUSP() { 
    var duration = 1; 
    gsap.fromTo( 
      "#usp-container-ag-1",  
      { 
        opacity: 0,           // Start with opacity 0 (hidden) 
        x: "50vw",              // Start off-screen to the left 
      }, 
      { 
        opacity: 1,           // Fade in 
        x: "0",              // Move to the left 
        duration: duration,          // Duration of 1 second 
      } 
    ); 
 
    gsap.fromTo( 
      "#usp-container-ag-2",  
      { 
        opacity: 1,           // Start fully visible 
        x: 0,                 // It stays in the center 
      }, 
      { 
        opacity: 1,           // Keep it visible 
        x: 0,                 // Keep it in the same place 
        duration: duration,          // Instant, no movement 
      } 
    ); 
 
    gsap.fromTo( 
      "#usp-container-ag-3",  
      { 
        opacity: 0,           // Start with opacity 0 (hidden) 
        x: "-50vw",              // Start off-screen to the right 
      }, 
      { 
        opacity: 1,           // Fade in 
        x: "0",              // Move to the right 
        duration: duration,          // Duration of 1 second 
      } 
    ); 
} 

function animateUSPBack() { 
  var duration = 1; 
  gsap.fromTo( 
    "#usp-container-ag-1",  
    { 
      opacity: 1,           // Start with opacity 0 (hidden) 
      x: "0",              // Start off-screen to the left 
    }, 
    { 
      opacity: 0,           // Fade in 
      x: "50vw", 
      duration: duration,          // Duration of 1 second 
    } 
  ); 

  gsap.fromTo( 
    "#usp-container-ag-2",  
    { 
      opacity: 1,           // Start fully visible 
      x: 0,                 // It stays in the center 
    }, 
    { 
      opacity: 1,           // Keep it visible 
      x: 0,                 // Keep it in the same place 
      duration: duration,          // Instant, no movement 
    } 
  ); 

  gsap.fromTo( 
    "#usp-container-ag-3",  
    { 
      opacity: 1,           // Start with opacity 0 (hidden) 
      x: "0", 
    }, 
    { 
      opacity: 0,           // Fade in 
      x: "-50vw",          // Move to the right 
      duration: duration,          // Duration of 1 second 
    } 
  ); 
} 

ScrollTrigger.create({ 
  trigger: "#USP", 
  start: "top center", 
  onEnter: () => { 
      animateUSP(); 
  }, 
  onLeaveBack: () => { 
      animateUSPBack(); 
  } 
});
}

setupViewer();