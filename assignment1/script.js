import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'
import * as dat from "lil-gui"

/***     ***/
/***SETUP***/
/***     ***/

// sizes
const sizes = {
    width: window.innerWidth * 0.4,
    height: window.innerHeight,
    aspectRatio: window.innerWidth * 0.4 / window.innerHeight
}

/***     ***/
/***SCENE***/
/***     ***/

// canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
//scene.background = new THREE.Color('black')
//camera
const camera = new THREE.PerspectiveCamera(
    75,
    sizes.aspectRatio,
    0.1,
    100
)
scene.add(camera)
camera.position.set(10, 2, 7)

//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFShadowMap

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/****      ****/
/****MESHES****/
/****      ****/

//cave
const caveGeometry = new THREE.PlaneGeometry(15.5, 7.5)
const caveMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('white'),
    side: THREE.DoubleSide
})
const cave = new THREE.Mesh(caveGeometry, caveMaterial)
cave.rotation.y = Math.PI * 0.5
cave.receiveShadow = true
scene.add(cave)

//objects
const SphereGeometry = new THREE.SphereGeometry(0.3, 100)
const SphereMaterial = new THREE.MeshStandardMaterial({color: 'blue'})
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial)
Sphere.position.set(6, 2, 0)
Sphere.castShadow = true
scene.add(Sphere)

const Sphere2Geometry = new THREE.SphereGeometry(1, 100)
const Sphere2Material = new THREE.MeshStandardMaterial({color: 'yellow'})
const Sphere2 = new THREE.Mesh(Sphere2Geometry, Sphere2Material)
Sphere2.position.set(6, 0, 0)
Sphere2.castShadow = true
scene.add(Sphere2)


/****        ****/
/**** LIGHTS ****/
/****        ****/

//Point Light
const PointLight = new THREE.PointLight(
    new THREE.Color('white'),
    300, 300
)
scene.add(PointLight)
PointLight.position.set(20, 0, 0)
PointLight.target = cave
PointLight.castShadow = true
PointLight.shadow.mapSize.width = 2048 * 2
PointLight.shadow.mapSize.height = 2048 * 2

//Point light helper
const PointLightHelper = new THREE.PointLightHelper(PointLight)
//scene.add(PointLightHelper)

/*********************
 *                   *
 *                   *
 *  DOM INTERACTIONS *
 *                   *
 *                   *
 *********************/

const domObject = {
    part: 0,
    firstChange: false,
    secondChange: false,
    thirdChange: false,
    forthChange: false,
}

//part one
document.querySelector('#part-one').onclick = function(){
    domObject.part = 1
}
//part two
document.querySelector('#part-two').onclick = function(){
    domObject.part = 2
}
//first change
document.querySelector('#first-change').onclick = function(){
    domObject.firstChange = true
}
//second change
document.querySelector('#second-change').onclick = function(){
    domObject.secondChange = true
}
//third change
document.querySelector('#third-change').onclick = function(){
    domObject.thirdChange = true
}
//forth change
document.querySelector('#forth-change').onclick = function(){
    domObject.part = 3
}
/*****  ******/
/*****UI******/
/*****  ******/
/*
const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
.add(PointLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('Y')

lightPositionFolder
.add(PointLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('Z')
*/
/**              **/
/**ANIMATION LOOP**/
/**              **/

const clock = new THREE.Clock()

const animation = () =>
    {
        // return elapsedTime
        const elapsedTime = clock.getElapsedTime()

        //defualt
        if(domObject.part === 0)
        {
            camera.position.set(-1, 0, 0)
            camera.lookAt(-2, 0, 0)
        }
        //part 1
        if(domObject.part === 1)
        {
            camera.position.set(6, 0, 0)
            camera.lookAt(0, 0, 0)
        }
        //part 2
        if(domObject.part === 2)
        {
            camera.position.set(0, 5, 15)
            camera.lookAt(0, 0, 0)
        }
        //first change
        if(domObject.firstChange)
        {
            Sphere.position.y = Math.sin(elapsedTime) * 1.8
            Sphere.position.z = Math.cos(elapsedTime) * 1.8
        }
        //second change
        if(domObject.secondChange)
        {
            PointLight.position.x = Math.sin(elapsedTime) * 5 + 20
        }
        //third change
        if(domObject.thirdChange)
        {
            Sphere.position.y = Math.sin(elapsedTime) * 1.8
            Sphere.position.z = Math.cos(elapsedTime) * 1.8
            Sphere.position.x = Math.cos(elapsedTime) * 1.8 + 6
        }
        //forth change
        if(domObject.part === 3)
        {
            camera.position.set(15, 5, 5)
            camera.lookAt(0, 0, 0)
        }
        //update orbit controls
        controls.update();
        //console.log(domObject.thirdChange)
        //update Point light helper
        PointLightHelper.update()
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()