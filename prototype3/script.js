import * as THREE from "three"
import { OrbitControls } from 'OrbitControls'
import * as dat from "lil-gui"

/***     ***/
/***SETUP***/
/***     ***/

// sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight
}

/***     ***/
/***SCENE***/
/***     ***/

// canvas
const canvas = document.querySelector('.webgl')
//scene
const scene = new THREE.Scene()
scene.background = new THREE.Color('black')
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
    antialias: true
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
const SphereMaterial = new THREE.MeshNormalMaterial()
const Sphere = new THREE.Mesh(SphereGeometry, SphereMaterial)
Sphere.position.set(6, 2, -1)
Sphere.castShadow = true
scene.add(Sphere)

const Sphere2Geometry = new THREE.SphereGeometry(0.3, 100)
const Sphere2Material = new THREE.MeshNormalMaterial()
const Sphere2 = new THREE.Mesh(Sphere2Geometry, SphereMaterial)
Sphere2.position.set(6, 2, 1)
Sphere2.castShadow = true
scene.add(Sphere2)

const torusGeometry = new THREE.TorusGeometry( 1, 0.2, 16, 100, 3.1 );
const torusMaterial = new THREE.MeshNormalMaterial();
const torus = new THREE.Mesh( torusGeometry, torusMaterial );
torus.position.set(6, 0.5, 0)
torus.castShadow = true
torus.rotation.y = Math.PI * 0.5
torus.rotation.z = Math.PI
scene.add( torus );

/****        ****/
/**** LIGHTS ****/
/****        ****/

//directional Light
const directionalLight = new THREE.DirectionalLight(
    new THREE.Color('white'),
    0.5
)
scene.add(directionalLight)
directionalLight.position.set(20, 4.1, 0)
directionalLight.target = cave
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2048
directionalLight.shadow.mapSize.height = 2048

//directional light helper
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
//scene.add(directionalLightHelper)

/*****  ******/
/*****UI******/
/*****  ******/

const ui = new dat.GUI()

const lightPositionFolder = ui.addFolder('Light Position')

lightPositionFolder
.add(directionalLight.position, 'y')
.min(-10)
.max(10)
.step(0.1)
.name('Y')

lightPositionFolder
.add(directionalLight.position, 'z')
.min(-10)
.max(10)
.step(0.1)
.name('Z')

/**              **/
/**ANIMATION LOOP**/
/**              **/

const clock = new THREE.Clock()

const animation = () =>
    {
        // return elapsedTime
        const elapsedTime = clock.getElapsedTime(
            console.log("elapsedTime")
        )
        //update orbit controls
        controls.update();

        //update directional light helper
        directionalLightHelper.update()
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()