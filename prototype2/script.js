import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'
import * as dat from "lil-gui"

/**********
 * * SETUP **
 * **********/
// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}



/***scene***/

// canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('pink')
//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 2, 5)
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*MESHES*/
//testsphere
const sphereGeometry = new THREE.ConeGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
const coneRotation = {
    rotationspeed: 0.5
}
scene.add(testSphere)

//plane
const planeGeometry = new THREE.PlaneGeometry(10, 10, 50, 50)
const planeMaterial = new THREE.MeshBasicMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide,
    wireframe: true
})
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
plane.rotation.x = Math.PI * 0.5
scene.add(plane)

//*****UI*****
const ui = new dat.GUI()
// ui object
const uiObject = {
    speed: 1,
    Distance: 1
}
//plane ui
const planefolder = ui.addFolder('plane')
planefolder
    .add( planeMaterial, 'wireframe' )
    .name("toggle Wireframe")

//test sphere ui
const spherefolder = ui.addFolder('Sphere')
spherefolder
    .add(uiObject, 'speed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Speed')

spherefolder
    .add(uiObject, 'Distance')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Distance')

    spherefolder
    .add(coneRotation, 'rotationspeed')
    .min(0.1)
    .max(10)
    .step(0.1)
    .name('Rotation Speed')

/*ANIMATION LOOP
****************/
const clock = new THREE.Clock()

const animation = () =>
    {
        //update orbit controls
        controls.update();
        // return elapsedTime
        const elapsedTime = clock.getElapsedTime(
            console.log("elapsedTime")
        )
        //rotate
        testSphere.rotation.x = elapsedTime * coneRotation.rotationspeed
        //ANimate sphere
        testSphere.position.y = Math.sin(elapsedTime * uiObject.speed) * uiObject.Distance
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()