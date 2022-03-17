let mg = null;
let mgModule =null;
let plane = null;
let WGLelement = null;

async function regenerate(){
	let nx = 200
	let ny = 200
	let nxy = nx * ny;
	let dx = 50
	let dy = 50
	let a = new Int32Array(nxy); for (let i=0; i<nxy; i++) a[i] = 0;
	let Es = new Float32Array(nxy); for (let i=0; i<nxy; i++) Es[i] = 1e-3;

	mg.reset_labels()

	let m = 0.45;
	let n = 1;
	let K = (Math.random() * 3 + 1) * 1e-5
	let Sc = Math.random() * 0.4 + 0.3
	let array = [0,1e5,2e5]
	let Acrit =  array[Math.floor(Math.random() * array.length)]

	mg.add_label_full(m,n,K,Sc,Acrit);
	console.log("m" + m)
	console.log("n" + n)
	console.log("K" + K)
	console.log("Sc" + Sc)
	console.log("Acrit" + Acrit)





	mg.run_nit_v4(10, 5, 5, a, Es, 1);
// 
	let res = mg.gettopo();
	// let HS = mg.get_HS();
	let maxi = Math.max.apply(null,res);
	scene.remove( plane );


	var geometry = await new THREE.PlaneGeometry(nx*2,ny*2, nx-1, ny-1);

	colors = []

	for (var i = 0; i < nxy; i++) {
	  geometry.attributes.position.array[i * 3 + 2] = res[i]/dx
	  colors.push(res[i]/maxi,res[i]/maxi,res[i]/maxi)
	  // geometry.attributes.face.array[i].vertex = res[i]/dx
	}
	geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(colors), 3));


	var material =new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors})

	plane = new THREE.Mesh(geometry, material);

	scene.add(plane);
	
}


const init = async function()
{
	
	mgModule = await createModule();

	var vec = new mgModule.VectorFloat();

	let nx = 200
	let ny = 200
	let nxy = nx * ny;
	let dx = 50
	let dy = 50

	console.log("3")


	mg = new mgModule.MinimalGraph(vec)
	mg.set_dimensions(Number(nx), Number(ny), Number(nx * ny), Number(dx), Number(dx),0.,0.);
	mg.set_default_boundaries("periodic_EW")
	let a = new Int32Array(nxy); for (let i=0; i<nxy; i++) a[i] = 0;
	let Es = new Float32Array(nxy); for (let i=0; i<nxy; i++) Es[i] = 1e-3;
	mg.add_label_full(0.45,1,1e-5,0.5,1);
	// mg.run_nit_v4(2, 2, 2, a, Es, 1);
	mg.run_nit_v4(6, 3, 5, a, Es, 1);
// 
	let res = mg.gettopo();
	// let HS = mg.get_HS();
	let maxi = Math.max.apply(null,res);
	console.log(maxi)




// 	// create a buffer with color data

// const width = nx;
// const height = ny;

// const size = width * height;
// const data = new Uint8Array(size *4 );


// // for ( let i = 0; i < size; i ++ ) {
// // 	HS[i] = Math.floor(HS[i] * 255)
// // }

// for ( let i = 0; i < size; i ++ ) {


// 	const color = new THREE.Color( HS[i],0,0 );

// 	// data[i*3] = Math.round(HS[i]);
// 	// data[i*3+1] = Math.round(HS[i]);
// 	// data[i*3+2] = Math.round(HS[i]);
// 	// data[i*3+3] = Math.round(255);
// 	data[i*4] = color.r;
// 	data[i*4+1] = color.g;
// 	data[i*4+2] = color.b;
// 	data[i*4+3] = 255;

// }

// // used the buffer to create a DataTexture

// const texture = new  THREE.DataTexture(data, nx,ny);
// texture.wrapS = THREE.ClampToEdgeWrapping;
// texture.wrapT = THREE.ClampToEdgeWrapping;
// texture.needsUpdate = true;

// used the buffer to create a DataArrayTexture


	var geometry = await new THREE.PlaneGeometry(nx*2,ny*2, nx-1, ny-1);
	// console.log(geometry)
	  // console.log(geometry.attributes.position)
	colors = []



	for (var i = 0; i < nxy; i++) {
	  geometry.attributes.position.array[i * 3 + 2] = res[i]/dx
	  colors.push(res[i]/maxi,res[i]/maxi,res[i]/maxi)
	  // geometry.attributes.face.array[i].vertex = res[i]/dx
	}
	geometry.setAttribute(
      'color',
      new THREE.BufferAttribute(new Float32Array(colors), 3));

	// var material = new THREE.MeshPhongMaterial({
	// 	// map:texture,
	// 	emissive:"gray",
	// 	wireframe: true

	// });


	var material =new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors})


	console.log("5")

	plane = new THREE.Mesh(geometry, material);

	scene.add(plane);

	// const light = new THREE.PointLight("white", 100)
	// light.position.set(100, 100, 100)
	// scene.add(light)
	WGLelement = renderer.domElement
	document.getElementById('webgl1').appendChild(renderer.domElement);
	WGLelement.style.width = "25cm"
	WGLelement.style.maxWidth = "100%"
	document.getElementById('webgl1').style.maxWidth = "100%"
	// WGLelement.style.height = "auto"
	WGLelement.style.maxHeight = "100%"
	// document.getElementById('webgl1').style.height = "auto"
	document.getElementById('webgl1').style.maxHeight = "100%"
	WGLelement.style.resize= "both";
  WGLelement.style.overflow= "auto";
	console.log("YOLO")
	console.log(document.getElementById("generateButton"))
	document.getElementById("generateButton").style.display = "inline";
	document.getElementById("generateButton").addEventListener("click",regenerate)

	console.log("6")


	render();

	// setInterval(regenerate, 1000);
}


console.log("1")
var width  = window.innerWidth / 2, height = window.innerHeight;

var scene = new THREE.Scene();
// scene.add(new THREE.AmbientLight(0xeeeeee, 1));

var axes = new THREE.AxisHelper(100);
scene.add(axes);

var camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
camera.position.set(0, -500, 300);
scene.add(camera);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
var controls = new THREE.TrackballControls(camera); 

init();

console.log("2")


function render() {
    controls.update();    
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

