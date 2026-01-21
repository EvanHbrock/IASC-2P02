import * as THREE from "three"

/***scene***/

// canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('pink')
//camera
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
)
scene.add(camera)
camera.position.set(0, 0, 5)
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight)

/*MESHES*/
//testsphere
const sphereGeometry = new THREE.SphereGeometry(1)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)

scene.add(testSphere)

/*ANIMATION LOOP
****************/
const clock = new THREE.Clock()

const animation = () =>
    {
        // return elapsedTime
        const elapsedTime = clock.getElapsedTime(
            console.log("elapsedTime")
        )
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()