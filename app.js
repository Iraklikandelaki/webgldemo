

let camera, controls, scene, renderer, particles, particleSystem, particleCount, sprite, points, object, object2;

let building1, building2, road, light4, spotLight2;


			init();
			//render(); // remove when using next line for animation loop (requestAnimationFrame)
			animate();
	
			function init() {

				scene = new THREE.Scene();

			



				scene.background = new THREE.Color( 0x0d0015 );
				scene.fog = new THREE.FogExp2( 0x0d0015, 0.0023 );

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				document.body.appendChild( renderer.domElement );

				camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 1000 );
				// camera.position.set( 400, 300, 0 );
				camera.position.set(-1200, 300, 0);
				

				var loader = new THREE.TextureLoader();
				loader.crossOrigin = '';


				// controls
				var minPan = new THREE.Vector3( - 2, - 2, - 2 );
				var maxPan = new THREE.Vector3( 900, 0, 800 );
				var _v = new THREE.Vector3();

				controls = new THREE.OrbitControls(camera, renderer.domElement);
				

				//controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)

				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;
				controls.enableZoom = false;
				controls.screenSpacePanning = false;
				controls.mouseButtons = { LEFT: THREE.MOUSE.PAN };
				// controls.minDistance = 100;
				// controls.maxDistance = 500;
				controls.enableRotate = false;
				// controls.target = new THREE.Vector3( 400, -20, 0);
				controls.update();
				
				controls.addEventListener("change", function() {
					_v.copy(controls.target);
					controls.target.clamp(minPan, maxPan);
				  _v.sub(controls.target);
				  camera.position.sub(_v);
				})
				
				controls.update();

				// world

				// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
				// geometry.translate( 0, 0.5, 0 );
				// const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );

				// for ( let i = 0; i < 500; i ++ ) {

				// 	const mesh = new THREE.Mesh( geometry, material );
				// 	mesh.position.x = Math.random() * 1600 - 800;
				// 	mesh.position.y = 0;
				// 	mesh.position.z = Math.random() * 1600 - 800;
				// 	mesh.scale.x = 20;
				// 	mesh.scale.y = Math.random() * 80 + 10;
				// 	mesh.scale.z = 20;
				// 	mesh.updateMatrix();
				// 	mesh.matrixAutoUpdate = false;
				// 	scene.add( mesh );

				// }

				const geometry = new THREE.PlaneGeometry( 2000, 3000 );
				const material = new THREE.MeshBasicMaterial( {color: 0xCCCCCC, side: THREE.DoubleSide} );
				const plane = new THREE.Mesh( geometry, material );
				plane.rotation.x = Math.PI / 2;
			
				scene.add( plane );

				//

				particles = 12000;

				const tovli = new THREE.BufferGeometry();

				const positions = [];
				const colors = [];

				// const color = new THREE.Color();

				const n = 2000, n2 = n / 2; // particles spread in the cube

				for ( let i = 0; i < particles; i ++ ) {

					// positions

					const x = Math.random() * n - n2;
					const y = Math.random() * n - n2;
					const z = Math.random() * n - n2;

					positions.push( x, y, z );

					// colors

					// const vx = ( x / n ) + 0.5;
					// const vy = ( y / n ) + 0.5;
					// const vz = ( z / n ) + 0.5;

					// color.setRGB( vx, vy, vz );
						
					// colors.push( color.r, color.g, color.b );
					sprite = new THREE.TextureLoader().load('./snow.png');

				}
				

				tovli.setAttribute( 'position', new THREE.Float32BufferAttribute( positions, 3 ) );
				tovli.setAttribute( 'color', new THREE.Float32BufferAttribute( colors, 3 ) );

				tovli.computeBoundingSphere();

				//

				tovlimaterial = new THREE.PointsMaterial( { color: 0xffffff, transparent: true,
					size: 3,
					map: sprite } );

				points = new THREE.Points( tovli, tovlimaterial );
				scene.add( points );

				//

				building1 = new THREE.BoxGeometry( 100, 400, 100 );
				const building1material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube1 = new THREE.Mesh( building1, building1material );
				scene.add( cube1 );
				cube1.position.set(-800, 0, -100);
				
				building2 = new THREE.BoxGeometry( 100, 300, 100 );
				const building2material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube2 = new THREE.Mesh( building2, building2material );
				scene.add( cube2 );
				cube2.position.set(-600, 0, -100);

				building3 = new THREE.BoxGeometry( 100, 600, 100 );
				const building3material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube3 = new THREE.Mesh( building3, building3material );
				scene.add( cube3 );
				cube3.position.set(-400, 0, -100);

				building4 = new THREE.BoxGeometry( 200, 300, 200 );
				const building4material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube4 = new THREE.Mesh( building4, building4material );
				scene.add( cube4 );
				cube4.position.set(-200, 0, -150);


				//////

				building5 = new THREE.BoxGeometry( 100, 400, 100 );
				const building5material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube5 = new THREE.Mesh( building5, building5material );
				scene.add( cube5 );
				cube5.position.set(0, 0, -100);

				building6 = new THREE.BoxGeometry( 100, 600, 100 );
				const building6material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube6 = new THREE.Mesh( building6, building6material );
				scene.add( cube6 );
				cube6.position.set( 200, 0, -100);

				building7 = new THREE.BoxGeometry( 100, 350, 100 );
				const building7material = new THREE.MeshLambertMaterial( {color: 0xCCCCCC} );
				const cube7 = new THREE.Mesh( building7, building7material );
				scene.add( cube7 );
				cube7.position.set( 400, 0, -100);







				///// trees	
				const objloader = new THREE.OBJLoader();
				objloader.load( './Tree.obj', function ( obj ) {

					object2 = obj;
					object2.scale.multiplyScalar( 20 );
					object2.position.y = 0;
					object2.position.x = - 600;
					object2.position.z = 10;
					
					scene.add( object2 );

				} );

				
				objloader.load( './Tree.obj', function ( obj ) {

					object3 = obj;
					object3.scale.multiplyScalar( 20 );
					object3.position.y = 0;
					object3.position.x = - 300;
					object3.position.z = 10;
					
					scene.add( object3 );

				} );

				objloader.load( './Tree.obj', function ( obj ) {

					object4 = obj;
					object4.scale.multiplyScalar( 20 );
					object4.position.y = 0;
					object4.position.x = - 100;
					object4.position.z = 10;
					
					scene.add( object4 );

				} );

				objloader.load( './Tree.obj', function ( obj ) {

					object5 = obj;
					object5.scale.multiplyScalar( 20 );
					object5.position.y = 0;
					object5.position.x = 200;
					object5.position.z = 10;
					
					scene.add( object5 );

				} );
			

				objloader.load( './247_House 15_obj.obj', function ( obj ) {

					object6 = obj;
					object6.scale.multiplyScalar( 0.8 );
					object6.position.y = 10;
					object6.position.x = - 600;
					object6.position.z = 400;
					object6.rotation.z =  Math.PI / 90;
					
					scene.add( object6 );

				} );

				objloader.load( './Cottage_FREE.obj', function ( obj ) {

					object7 = obj;
					object7.scale.multiplyScalar( 35 );
					object7.position.y = 0;
					object7.position.x = - 600;
					object7.position.z = 1000;
					// object7.rotation.z =  Math.PI / 90;
					// object7.rotation.x = 360;
					
					scene.add( object7 );

				} );

				
				objloader.load( './247_House 15_obj.obj', function ( obj ) {

					object8 = obj;
					object8.scale.multiplyScalar( 0.7 );
					object8.position.y = 10;
					object8.position.x = - 100;
					object8.position.z = 400;
					object8.rotation.z =  Math.PI / 90;
					
					scene.add( object8 );

				} );

				objloader.load( './247_House 15_obj.obj', function ( obj ) {

					object9 = obj;
					object9.scale.multiplyScalar( 0.9 );
					object9.position.y = 10;
					object9.position.x = 20;
					object9.position.z = 800;
					object9.rotation.z =  Math.PI / 90;
					
					scene.add( object9 );

				} );


				///////////////
				
			

				
				road = new THREE.BoxGeometry( 3000, 10, 100 );
				const roadMaterial = new THREE.MeshLambertMaterial( {color: 0x972EB8} );
				const road1 = new THREE.Mesh( road, roadMaterial );
				scene.add( road1 );
				road1.position.set(-800, 0, 100);

				
				const sphere = new THREE.SphereGeometry( 10, 10, 10 );

				// lights

				// const dirLight1 = new THREE.DirectionalLight( 0xffffff );
				// dirLight1.position.set( 1, 1, 1 );
				// scene.add( dirLight1 );

				// const dirLight2 = new THREE.DirectionalLight( 0x002288 );
				// dirLight2.position.set( - 1, - 1, - 1 );
				// scene.add( dirLight2 );

				// const ambientLight = new THREE.AmbientLight( 0x222222 );
				// scene.add( ambientLight );
			

				// const spotLight = new THREE.SpotLight( 0xFBFBA2, 20, 300, 300  );
				// spotLight.position.set( -800, 30, 100 );

				// spotLight.castShadow = true;
				// spotLight.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xFBFBA2 } ) ) );	

				// spotLight.shadow.mapSize.width = 1024;
				// spotLight.shadow.mapSize.height = 1024;

				// spotLight.shadow.camera.near = 500;
				// spotLight.shadow.camera.far = 4000;
				// spotLight.shadow.camera.fov = 30;

				// scene.add( spotLight );


				// const light = new THREE.PointLight( 0xFF0000, 1.5, 2000 );
				
				// light.position.set( -800, 30, 100 );
				// scene.add( light );


				// const lightFlare = new THREE.PointLight( 0xFFFF00, 1.5, 2000 );

				// const textureLoader = new THREE.TextureLoader();

				// const textureFlare0 = textureLoader.load( "./lensflare0.png" );
				// const textureFlare1 = textureLoader.load( "./lensflare2.png" );
				// const textureFlare2 = textureLoader.load( "./lensflare3.png" );

				// const lensflare = new THREE.Lensflare();

				// lensflare.addElement( new THREE.LensflareElement( textureFlare0, 512, 0 ) );
				// lensflare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
				// lensflare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );

				// lightFlare.add( lensflare );

				const dirLight = new THREE.DirectionalLight( 0xF9F9DA, 0.05 );
				dirLight.position.set( -800, 30, 100 );
				// dirLight.color.setHSL( 0.1, 0.7, 0.5 );
				scene.add( dirLight );

				// lensflares
				const textureLoader = new THREE.TextureLoader();

				const textureFlare0 = textureLoader.load( './lensflare0.png' );
				// const textureFlare3 = textureLoader.load( './lensflare3.png' );

				addLight( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );


				addLight2( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight2( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight2( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );


				addLight3( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight3( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight3( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );


				addLight4( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight4( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight4( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

				addLight5( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight5( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight5( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );


				addLight6( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight6( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight6( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );

				addLight7( 0.55, 0.9, 0.5, 5000, 0, - 1000 );
				addLight7( 0.08, 0.8, 0.5, 0, 0, - 1000 );
				addLight7( 0.995, 0.5, 0.9, 5000, 5000, - 1000 );



				function addLight( ) {

					const light = new THREE.PointLight( 0xF9F9DA, 1, 1000 );
					// light.color.setHSL( h, s, l );
					light.position.set( -800, 94, 29 );
					scene.add( light );

					const lensflare = new THREE.Lensflare();
					lensflare.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light.color ) );
					// lensflare.addElement( new THREE.LensflareElement( textureFlare3, 60, 0.6 ) );
					// lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 0.7 ) );
					// lensflare.addElement( new THREE.LensflareElement( textureFlare3, 120, 0.9 ) );
					// lensflare.addElement( new THREE.LensflareElement( textureFlare3, 70, 1 ) );
					light.add( lensflare );

				}

				function addLight2( ) {

					const light2 = new THREE.PointLight( 0xF9F9DA, 1, 500 );
					
					light2.position.set( -400, 94, 29 );
					scene.add( light2 );

					const lensflare2 = new THREE.Lensflare();
					lensflare2.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light2.color ) );
				
					light2.add( lensflare2 );

				}

				function addLight3( ) {

					const light3 = new THREE.PointLight( 0xF9F9DA, 1, 500 );
					
					light3.position.set( -200, 94, 29 );
					scene.add( light3 );

					const lensflare3 = new THREE.Lensflare();
					lensflare3.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light3.color ) );
				
					light3.add( lensflare3 );

				}

				function addLight4( ) {

					const light4 = new THREE.PointLight( 0xF9F9DA, 1, 500 );
					
					light4.position.set( 0, 94, 29 );
					scene.add( light4 );

					const lensflare4 = new THREE.Lensflare();
					lensflare4.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light4.color ) );
				
					light4.add( lensflare4);

				}

				function addLight5( ) {

					const light5 = new THREE.PointLight( 0xF9F9DA, 1, 500 );
					
					light5.position.set( 200, 94, 29 );
					scene.add( light5 );

					const lensflare5 = new THREE.Lensflare();
					lensflare5.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light5.color ) );
				
					light5.add( lensflare5);

				}

				
				function addLight6( ) {

					const light6 = new THREE.PointLight( 0xF9F9DA, 1, 500 );
					
					light6.position.set( 400, 94, 29 );
					scene.add( light6 );

					const lensflare6 = new THREE.Lensflare();
					lensflare6.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light6.color ) );
				
					light6.add( lensflare6);

				}

				function addLight7( ) {

					const light7 = new THREE.PointLight( 0xF9F9DA, 1, 500 );
					
					light7.position.set( 20, 94, 800 );
					scene.add( light7 );

					const lensflare7 = new THREE.Lensflare();
					lensflare7.addElement( new THREE.LensflareElement( textureFlare0, 50, 0, light7.color ) );
				
					light7.add( lensflare7);

				}












				const bodzi = new THREE.CylinderGeometry( 3, 3, 180, 32 );
				const bodzimaterial = new THREE.MeshLambertMaterial( {color: 0x000000} );
				const cylinder = new THREE.Mesh( bodzi, bodzimaterial );
				cylinder.position.set( -800, 0, 30 );
				scene.add( cylinder );


				const bodzi2 = new THREE.CylinderGeometry( 3, 3, 180, 32 );
				const bodzimaterial2 = new THREE.MeshLambertMaterial( {color: 0x000000} );
				const cylinder2 = new THREE.Mesh( bodzi2, bodzimaterial2 );
				cylinder2.position.set( -400, 0, 30 );
				scene.add( cylinder2 );

				const bodzi3 = new THREE.CylinderGeometry( 3, 3, 180, 32 );
				const bodzimaterial3 = new THREE.MeshLambertMaterial( {color: 0x000000} );
				const cylinder3 = new THREE.Mesh( bodzi3, bodzimaterial3 );
				cylinder3.position.set( -200, 0, 30 );
				scene.add( cylinder3 );

				const bodzi4 = new THREE.CylinderGeometry( 3, 3, 180, 32 );
				const bodzimaterial4 = new THREE.MeshLambertMaterial( {color: 0x000000} );
				const cylinder4 = new THREE.Mesh( bodzi4, bodzimaterial4 );
				cylinder4.position.set( 0, 0, 30 );
				scene.add( cylinder4 );
		
				const bodzi5 = new THREE.CylinderGeometry( 3, 3, 180, 32 );
				const bodzimaterial5 = new THREE.MeshLambertMaterial( {color: 0x000000} );
				const cylinder5 = new THREE.Mesh( bodzi5, bodzimaterial5 );
				cylinder5.position.set( 200, 0, 30 );
				scene.add( cylinder5 );

				const bodzi6 = new THREE.CylinderGeometry( 3, 3, 180, 32 );
				const bodzimaterial6 = new THREE.MeshLambertMaterial( {color: 0x000000} );
				const cylinder6 = new THREE.Mesh( bodzi6, bodzimaterial6 );
				cylinder6.position.set( 400, 0, 30 );
				scene.add( cylinder6 );


				//

				window.addEventListener( 'resize', onWindowResize );


				// const gui = new dat.GUI();
				// gui.add( controls, 'screenSpacePanning' );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			function animate() {

				requestAnimationFrame( animate );

				controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true

				render();

			}

			function render() {
				// const time = Date.now() * 0.001;

				// points.rotation.y = time * 0.5;
		
				points.rotation.y += 0.002;
				renderer.render( scene, camera );

			}
