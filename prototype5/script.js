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


/*****  ******/
/*****UI******/
/*****  ******/
const ui = new dat.GUI()

let preset = {}

const uiObj = {
    sourceText: "Type Here",
    saveSourceText() {
        saveSourceText()
    },
    term1: '',
    color1: '',
    term2: '',
    color2: '',
    term3: '',
    color3: '',
    saveTerms() {
        saveTerms()
    }
}

//ui funcs
const saveSourceText = () =>
{
    //ui
    preset = ui.save()
    textFolder.hide()
    termsFolder.show()
    visualizeFolder.show()
    

    //text analysis
    tokenizeSourceText(uiObj.sourceText)
}


const saveTerms = () =>
{
    //ui
    preset = ui.save
    visualizeFolder.hide()

    //text analysis
    findSearchTermInTokenizedText(uiObj.term1, uiObj.color1)
    findSearchTermInTokenizedText(uiObj.term2, uiObj.color2)
    findSearchTermInTokenizedText(uiObj.term3, uiObj.color3)

}


// text folder
const textFolder = ui.addFolder("Source Text")

textFolder
    .add(uiObj, 'sourceText')
    .name("source Text")

    textFolder
        .add(uiObj, 'saveSourceText')
        .name("Save")
//terms and visualize folder
const termsFolder = ui.addFolder("Search Terms")
const visualizeFolder = ui.addFolder("Visualize")

termsFolder
    .add(uiObj, 'term1')
    .name("Term 1")

termsFolder
    .addColor(uiObj, 'color1')
    .name("Term 1 color")

termsFolder
    .add(uiObj, 'term2')
    .name("Term 2")

termsFolder
    .addColor(uiObj, 'color2')
    .name("Term 2 color")

termsFolder
    .add(uiObj, 'term3')
    .name("Term 3")

termsFolder
    .addColor(uiObj, 'color3')
    .name("Term 3 color")

visualizeFolder
    .add(uiObj, 'saveTerms')
    .name("Visualize")

//terms and visualize folders are hidden by defualt
termsFolder.hide()
visualizeFolder.hide()

/*********
 * text analysis
 * *********/


//variables
let parsedText, tokenizedText

//parse and tokenize sourceText
const tokenizeSourceText = (sourceText) =>
{
    //strips periods and lowercases
    parsedText = sourceText.replaceAll(".", "").toLowerCase()

    //tokenize text
    tokenizedText = parsedText.split(/[^\w']+/)
    console.log(tokenizedText)
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

/*ANIMATION LOOP
****************/
const clock = new THREE.Clock()

const animation = () =>
    {
        //update orbit controls
        controls.update();
        // return elapsedTime
        const elapsedTime = clock.getElapsedTime(
            
        )
        //renderer
        renderer.render(scene, camera)
        //request next frame
        window.requestAnimationFrame(animation)
    }
animation()