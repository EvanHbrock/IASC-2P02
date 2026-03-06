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

// Resizing
window.addEventListener('resize', () =>
{
    //Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.aspectRatio = window.innerWidth / window.innerHeight

    //Update camera
    camera.aspect = sizes.aspectRatio
    camera.updateProjectionMatrix()

    //Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

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
camera.position.set(0, 12, -20)
//renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas, 
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/*****lights******/
//directional light
const directionalLight = new THREE.DirectionalLight(0x404040, 100)
scene.add(directionalLight)

/*MESHES*/
//Cude geometry
const cubeGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5)

const drawCube = (height, color) =>
{
    //create cube mat
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color)
    })
    //create cube
    const cube = new THREE.Mesh(cubeGeometry, material)

    //position cube
    cube.position.x = (Math.random() - 0.5) * 10
    cube.position.z = (Math.random() - 0.5) * 10
    cube.position.y = height
    //randomize rotation
    cube.rotation.x = Math.random() * 2 * Math.PI
    cube.rotation.z = Math.random() * 2 * Math.PI
    cube.rotation.y = Math.random() * 2 * Math.PI
    //add cube
    scene.add(cube)
}


//*****UI*****
const ui = new dat.GUI()

/*********
 * text analysis
 * *********/

//source text
const sourceText = "A small robot woke in a quiet lab beside a dim screen. The robot watched the screen glow blue then flicker red. When the robot finally stepped outside the lab the rising sun painted the sky blue and red again."

//variables
let parsedText, tokenizedText

//parse and tokenize sourceText
const tokenizeSourceText = () =>
{
    //strips periods and lowercases
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    //tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
}

// find searchTerm in tokenizedText
const findSearchTermInTokenizedText = (term, color) =>
{
    // use for loop to go through text array
    for (let i=0; i < tokenizedText.length; i++)
    {
        // if tokenizedtext[i] matches our searchTerm, then we draw cube
        if(tokenizedText[i] === term){
            //convert i into height, which is a value between 0 and 20
            const height = (100 / tokenizedText.length) * i * 0.2


            //call drawCube func 100 times using converted height value
            for(let a = 0; a < 100; a++)
            {
            drawCube(height, color)
            }
        }
    }
}

tokenizeSourceText()
findSearchTermInTokenizedText("robot", "gray")
findSearchTermInTokenizedText("red", "red")
findSearchTermInTokenizedText("blue", "blue")

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
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()