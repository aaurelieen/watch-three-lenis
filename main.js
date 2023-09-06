import './style.css'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import Lenis from '@studio-freight/lenis'
import { Light } from 'three'

document.querySelector('#app').innerHTML = `
  <div class="scroll-wrapper">
    <canvas class="webgl"></canvas>
  </div>
`

//lenis
const lenis = new Lenis()


function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

//Canvas
const canvas = document.querySelector('canvas.webgl')

//Scene
const scene = new THREE.Scene()

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  sizes.widht = window.innerWidth
  sizes.height = window.innerHeight
  
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  
  renderer.setSizes(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(0, 0, 0.15)
scene.add(camera)

//Lights
const mainLight = new THREE.PointLight('white', 10)
mainLight.position.set(1, 1, 0)

const secondLight = new THREE.PointLight('white', 10)
secondLight.position.set(-1, -1, 0)

const ambientLight = new THREE.AmbientLight('white', 1)

scene.add(mainLight, secondLight, ambientLight)

//Cube
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshNormalMaterial()
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// mesh.rotation.y = lenis.progress * 20

// lenis.on('scroll', () => {
//   mesh.rotation.y = lenis.progress * 20
// })

// Model
const gltfLoader = new GLTFLoader()

gltfLoader.load(
  'watch.glb',
  (gltf) =>
  {
    let model = gltf.scene
    scene.add(gltf.scene)

    model.rotation.y = lenis.progress * 20

    lenis.on('scroll', () => {
      model.rotation.y = lenis.progress * 20
    })
  }
)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

function animate() {
  renderer.render(scene, camera)
  
  requestAnimationFrame(animate)
}

animate()