import * as THREE from "three"

/***scene***/

// canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('darkblue')
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
const sphereGeometry = new THREE.SphereGeometry(0.5)
const sphereGeometry2 = new THREE.SphereGeometry(0.5)
const sphereMaterial = new THREE.MeshNormalMaterial()
const testSphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
const testSphere2 = new THREE.Mesh(sphereGeometry2, sphereMaterial)
scene.add(testSphere)
scene.add(testSphere2)

/*ANIMATION LOOP
****************/
const clock = new THREE.Clock()

const animation = () =>
    {
        // return elapsedTime
        const elapsedTime = clock.getElapsedTime(
            
        )
        //animatetestsphere
        testSphere.position.y = Math.sin(elapsedTime)
        testSphere.position.x = Math.cos(elapsedTime)
        testSphere2.position.x = Math.sin(elapsedTime)
        testSphere2.position.z = Math.cos(elapsedTime)
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()