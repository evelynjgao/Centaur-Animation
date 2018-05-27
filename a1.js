//////////////////////////////////////////////////////////////////
// Assignment 1:  Programing
/////////////////////////////////////////////////////////////////


// SETUP RENDERER AND SCENE
var scene = new THREE.Scene();
var body;
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff); // white background colour
document.body.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30, 1, 0.1, 1000); // view angle, aspect ratio, near, far
camera.position.set(-8,3,10);
camera.lookAt(scene.position);
scene.add(camera);

// SETUP ORBIT CONTROL OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.2;

////////////////////////////////////////////////////////////////////////////////
//  loadOBJ( ):  loads OBJ file vertex mesh, with vertex normals
////////////////////////////////////////////////////////////////////////////////

function loadOBJ(objName, file, material, scale, xOff, yOff, zOff, xRot, yRot, zRot) {
  var onProgress = function(query) {
    if ( query.lengthComputable ) {
      var percentComplete = query.loaded / query.total * 100;
      console.log( Math.round(percentComplete, 2) + '% downloaded' );
    }
  };
  var onError = function() {
    console.log('Failed to load ' + file);
  };
  var loader = new THREE.OBJLoader();
  loader.load(file, function(object) {
    object.traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });
    object.position.set(xOff,yOff,zOff);
    object.rotation.x= xRot;
    object.rotation.y = yRot;
    object.rotation.z = zRot;
    object.scale.set(scale,scale,scale);
    object.name = objName;
    scene.add(object);

  }, onProgress, onError);
}

////////////////////////////////////////////////////////////////////////////////////
//   resize( ):  adjust camera parameters if the window is resized
////////////////////////////////////////////////////////////////////////////////////

function resize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

window.addEventListener('resize', resize);
resize();

////////////////////////////////////////////////////////////////////////////////////
//   create the needed objects
////////////////////////////////////////////////////////////////////////////////////

 // FLOOR WITH CHECKERBOARD

var floorTexture = new THREE.ImageUtils.loadTexture('images/checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(4, 4);
var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
var floorGeometry = new THREE.PlaneBufferGeometry(20, 20);
var floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.position.y = 0;
floor.rotation.x = Math.PI / 2;
scene.add(floor);

  // LIGHTS:  needed for phong illumination model

var light = new THREE.PointLight(0xFFFFFF);
light.position.x=-70;
light.position.y=100;
light.position.z=70;
scene.add(light);
var ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

  // MATERIALS

var brownMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x402020, color: 0x806060, specular: 0x808080, shininess: 10.0, shading: THREE.SmoothShading });
var whiteMaterial = new THREE.MeshPhongMaterial( { 
     ambient: 0x404040, color: 0x808080, specular: 0x808080, shininess: 40.0, shading: THREE.SmoothShading });
var normalMaterial = new THREE.MeshNormalMaterial();

 // Sphere

var sphereGeometry = new THREE.SphereGeometry( 0.5, 32, 32 );
var whiteSphere = new THREE.Mesh( sphereGeometry, whiteMaterial );
scene.add( whiteSphere );
whiteSphere.matrixAutoUpdate = false;

  // Leg

var frontthighLength = 0.55;
var hindthighLength = 0.55;
var calfLength = 0.5;

//hind left leg
var hindleftthighAngle = 30;       // animation parameter
var thighGeometry = new THREE.CylinderGeometry( 0.19, 0.09, hindthighLength, 200, 4, true);
var hindleftThigh = new THREE.Mesh( thighGeometry, normalMaterial );
scene.add( hindleftThigh );
hindleftThigh.matrixAutoUpdate = false;

var calfGeometry = new THREE.CylinderGeometry( 0.09, 0.05, calfLength, 200, 4, true);
calfGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -calfLength/2, 0 ));
var hindleftCalf = new THREE.Mesh( calfGeometry, normalMaterial );
scene.add( hindleftCalf );
hindleftCalf.matrixAutoUpdate = false;

//hind right leg
var hindrightThigh = new THREE.Mesh( thighGeometry, normalMaterial );
scene.add( hindrightThigh );
hindrightThigh.matrixAutoUpdate = false;

var hindrightCalf = new THREE.Mesh( calfGeometry, normalMaterial );
scene.add( hindrightCalf );
hindrightCalf.matrixAutoUpdate = false;

//front left leg
var frontleftThigh = new THREE.Mesh( thighGeometry, normalMaterial );
scene.add( frontleftThigh );
frontleftThigh.matrixAutoUpdate = false;

var frontleftCalf = new THREE.Mesh( calfGeometry, normalMaterial );
scene.add( frontleftCalf );
frontleftCalf.matrixAutoUpdate = false;

//front right leg
var frontrightThigh = new THREE.Mesh( thighGeometry, normalMaterial );
scene.add( frontrightThigh );
frontrightThigh.matrixAutoUpdate = false;

var frontrightCalf = new THREE.Mesh( calfGeometry, normalMaterial );
scene.add( frontrightCalf );
frontrightCalf.matrixAutoUpdate = false;

//Leg Joints

var legjointGeometry = new THREE.SphereGeometry( 0.09, 32, 32 );
var hindleftJoint = new THREE.Mesh( legjointGeometry, normalMaterial );
scene.add( hindleftJoint );
hindleftJoint.matrixAutoUpdate = false;

var hindrightJoint = new THREE.Mesh( legjointGeometry, normalMaterial );
scene.add( hindrightJoint );
hindrightJoint.matrixAutoUpdate = false;

var frontleftJoint = new THREE.Mesh( legjointGeometry, normalMaterial );
scene.add( frontleftJoint );
frontleftJoint.matrixAutoUpdate = false;

var frontrightJoint = new THREE.Mesh( legjointGeometry, normalMaterial );
scene.add( frontrightJoint );
frontrightJoint.matrixAutoUpdate = false;

//Hoof joints

var hoofjointGeometry = new THREE.SphereGeometry( 0.05, 32, 32 );

var hindlefthoofJoint = new THREE.Mesh( hoofjointGeometry, normalMaterial );
scene.add( hindlefthoofJoint );
hindlefthoofJoint.matrixAutoUpdate = false;

var hindrighthoofJoint = new THREE.Mesh( hoofjointGeometry, normalMaterial );
scene.add( hindrighthoofJoint );
hindrighthoofJoint.matrixAutoUpdate = false;

var frontlefthoofJoint = new THREE.Mesh( hoofjointGeometry, normalMaterial );
scene.add( frontlefthoofJoint );
frontlefthoofJoint.matrixAutoUpdate = false;

var frontrighthoofJoint = new THREE.Mesh( hoofjointGeometry, normalMaterial );
scene.add( frontrighthoofJoint );
frontrighthoofJoint.matrixAutoUpdate = false;

//Hooves

var hoofGeometry = new THREE.SphereGeometry(0.07,32,32,0,Math.PI*2,0,Math.PI/2);

var hindleftHoof = new THREE.Mesh(hoofGeometry, normalMaterial );
scene.add( hindleftHoof );
hindleftHoof.matrixAutoUpdate = false;

var hindrightHoof = new THREE.Mesh(hoofGeometry, normalMaterial );
scene.add( hindrightHoof );
hindrightHoof.matrixAutoUpdate = false;

var frontleftHoof = new THREE.Mesh(hoofGeometry, normalMaterial );
scene.add( frontleftHoof );
frontleftHoof.matrixAutoUpdate = false;

var frontrightHoof = new THREE.Mesh(hoofGeometry, normalMaterial );
scene.add( frontrightHoof );
frontrightHoof.matrixAutoUpdate = false;

//Arms

var armjointGeometry = new THREE.SphereGeometry(0.10, 32, 32);
var leftarmJoint = new THREE.Mesh(armjointGeometry, normalMaterial);
scene.add(leftarmJoint);
leftarmJoint.matrixAutoUpdate = false;

var rightarmJoint= new THREE.Mesh(armjointGeometry, normalMaterial);
scene.add(rightarmJoint);
rightarmJoint.matrixAutoUpdate = false;

var upperarmLength = 0.4;
var lowerarmLength = 0.35;

var upperarmGeometry = new THREE.CylinderGeometry(0.1, 0.05, upperarmLength, 200, 4);
upperarmGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -upperarmLength/2, 0 ));
var leftupperArm = new THREE.Mesh(upperarmGeometry, normalMaterial);
scene.add(leftupperArm);
leftupperArm.matrixAutoUpdate = false;

var rightupperArm = new THREE.Mesh(upperarmGeometry, normalMaterial);
scene.add(rightupperArm);
rightupperArm.matrixAutoUpdate = false;

var elbowGeometry = new THREE.SphereGeometry(0.05, 32, 32);
var leftElbow = new THREE.Mesh(elbowGeometry, normalMaterial);
scene.add(leftElbow);
leftElbow.matrixAutoUpdate = false;

var rightElbow = new THREE.Mesh(elbowGeometry, normalMaterial);
scene.add(rightElbow);
rightElbow.matrixAutoUpdate = false;

var lowerarmGeometry = new THREE.CylinderGeometry(0.05, 0.035, lowerarmLength, 200, 4);
lowerarmGeometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, -lowerarmLength/2, 0 ));
var leftlowerArm = new THREE.Mesh(lowerarmGeometry, normalMaterial);
scene.add(leftlowerArm);
leftlowerArm.matrixAutoUpdate = false;

var rightlowerArm = new THREE.Mesh(lowerarmGeometry, normalMaterial);
scene.add(rightlowerArm);
rightlowerArm.matrixAutoUpdate = false;

var wristGeometry = new THREE.SphereGeometry(0.04, 32, 32);
var leftWrist = new THREE.Mesh(wristGeometry, normalMaterial);
scene.add(leftWrist);
leftWrist.matrixAutoUpdate = false;

var rightWrist = new THREE.Mesh(wristGeometry, normalMaterial);
scene.add(rightWrist);
rightWrist.matrixAutoUpdate = false;

var handGeometry = new THREE.SphereGeometry(0.05,32,32,0,Math.PI*2.0,0,Math.PI/2.0);
var leftHand = new THREE.Mesh(handGeometry, normalMaterial);
scene.add(leftHand);
leftHand.matrixAutoUpdate = false;

var rightHand = new THREE.Mesh(handGeometry, normalMaterial);
scene.add(rightHand);
rightHand.matrixAutoUpdate = false;

// Body

loadOBJ('body','centaur/cent_no_legs_no_arms.obj',normalMaterial,1,0,0,0,0,0,0);

//////////////////////////////////////////////////////////////////
// printMatrix():  prints a matrix
//////////////////////////////////////////////////////////////////

function printMatrix(name,matrix) {       // matrices are stored column-major, although matrix.set() uses row-major
    console.log('Matrix ',name);
    var e = matrix.elements;
    console.log(e[0], e[4], e[8], e[12]);
    console.log(e[1], e[5], e[9], e[13]);
    console.log(e[2], e[6], e[10], e[14]);
    console.log(e[3], e[7], e[11], e[15]);
}

//////////////////////////////////////////////////////////////////
// setupBody():  build model Matrix for body, and then its children
//////////////////////////////////////////////////////////////////
var bodyLR = 0;
var bodyHeight = 0.7;
var headAngle = 3.0;
var bodyForward = 0;

function setupBody(parentMatrix) {
//  printMatrix("body parent",parentMatrix);
  body.matrix.copy(parentMatrix);     // copy the parent link transformation
    body.matrix.multiply(new THREE.Matrix4().makeTranslation(bodyLR,bodyHeight,bodyForward));        // post multiply by translate matrix
  body.matrix.multiply(new THREE.Matrix4().makeRotationX(headAngle*Math.PI/180.0));      // post multiply by rotation matrix (3 deg rotation)
    //thighs are children of body
    setuphindleftThigh(body.matrix);
    setuphindrightThigh(body.matrix);
    setupfrontleftThigh(body.matrix);
    setupfrontrightThigh(body.matrix);
    //joints to thighs
    setuphindleftJoint(hindleftThigh.matrix);
    setuphindrightJoint(hindrightThigh.matrix);
    setupfrontleftJoint(frontleftThigh.matrix);
    setupfrontrightJoint(frontrightThigh.matrix);
    //calves to joints
    setuphindleftCalf(hindleftJoint.matrix);
    setuphindrightCalf(hindrightJoint.matrix);
    setupfrontleftCalf(frontleftJoint.matrix);
    setupfrontrightCalf(frontrightJoint.matrix);
    //hoof joints to calf
    setuphindlefthoofJoint(hindleftCalf.matrix);
    setuphindrighthoofJoint(hindrightCalf.matrix);
    setupfrontlefthoofJoint(frontleftCalf.matrix);
    setupfrontrighthoofJoint(frontrightCalf.matrix);
    //hoofs
    setuphindleftHoof(hindlefthoofJoint.matrix);
    setuphindrightHoof(hindrighthoofJoint.matrix);
    setupfrontleftHoof(frontlefthoofJoint.matrix);
    setupfrontrightHoof(frontrighthoofJoint.matrix);
    //arms
    setupleftarmJoint(body.matrix);
    setuprightarmJoint(body.matrix);
    setupleftupperArm(leftarmJoint.matrix);
    setuprightupperArm(rightarmJoint.matrix);
    setupleftElbow(leftupperArm.matrix);
    setuprightElbow(rightupperArm.matrix);
    setupleftlowerArm(leftElbow.matrix);
    setuprightlowerArm(rightElbow.matrix);
    setupleftWrist(leftlowerArm.matrix);
    setuprightWrist(rightlowerArm.matrix);
    setupleftHand(leftWrist.matrix);
    setuprightHand(rightWrist.matrix);
// body.matrix.multiply(new THREE.Matrix4().makeScale(0.3,0.3,0.3));   // post multiply by scale matrix, to scale down body geometry
 body.matrix.multiply(new THREE.Matrix4().makeScale(0.07,0.07,0.07));   // post multiply by scale matrix, to scale down body geometry
  body.updateMatrixWorld();         // force update of internal body.matrixWorld
}

var sphereDistance = 3.0;

function setupSphere(parentMatrix){
    whiteSphere.matrix.copy(parentMatrix);
    whiteSphere.matrix.multiply(new THREE.Matrix4().makeTranslation(sphereDistance,1.0,0));
    whiteSphere.updateMatrixWorld();
}

//////////////////////////////////////////////////////////////////
// setupHead():  build model Matrix for head
//////////////////////////////////////////////////////////////////

var upperarmangleZ = 10;
var upperarmangleX = 0;
var lowerarmangleZ = -15;
var lowerarmangleX = -15;

function setupleftarmJoint(parentMatrix) {
    leftarmJoint.matrix.copy(parentMatrix);
    leftarmJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.3, 1.73, 0.31));
    leftarmJoint.updateMatrixWorld();
}

function setuprightarmJoint(parentMatrix) {
    rightarmJoint.matrix.copy(parentMatrix);
    rightarmJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.3, 1.74, 0.31));
    rightarmJoint.updateMatrixWorld();
}

function setupleftupperArm(parentMatrix) {
    leftupperArm.matrix.copy(parentMatrix);
    leftupperArm.matrix.multiply(new THREE.Matrix4().makeRotationZ(upperarmangleZ*Math.PI/180.0) )
    leftupperArm.matrix.multiply(new THREE.Matrix4().makeRotationX(upperarmangleX*Math.PI/180.0) )
    leftupperArm.updateMatrixWorld();
}

function setuprightupperArm(parentMatrix) {
    rightupperArm.matrix.copy(parentMatrix);
    rightupperArm.matrix.multiply(new THREE.Matrix4().makeRotationZ(-upperarmangleZ*Math.PI/180.0) )
    rightupperArm.matrix.multiply(new THREE.Matrix4().makeRotationX(upperarmangleX*Math.PI/180.0) )
    rightupperArm.updateMatrixWorld();
}

function setupleftElbow(parentMatrix) {
    leftElbow.matrix.copy(parentMatrix);
    leftElbow.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));
    leftElbow.updateMatrixWorld();
}

function setuprightElbow(parentMatrix) {
    rightElbow.matrix.copy(parentMatrix);
    rightElbow.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.4, 0));
    rightElbow.updateMatrixWorld();
}

function setupleftlowerArm(parentMatrix) {
    leftlowerArm.matrix.copy(parentMatrix);
    leftlowerArm.matrix.multiply(new THREE.Matrix4().makeRotationX(lowerarmangleX*Math.PI/180.0));
    leftlowerArm.matrix.multiply(new THREE.Matrix4().makeRotationZ(lowerarmangleZ*Math.PI/180.0));
    leftlowerArm.updateMatrixWorld();
}

function setuprightlowerArm(parentMatrix) {
    rightlowerArm.matrix.copy(parentMatrix);
    rightlowerArm.matrix.multiply(new THREE.Matrix4().makeRotationX(lowerarmangleX*Math.PI/180.0));
    rightlowerArm.matrix.multiply(new THREE.Matrix4().makeRotationZ(-lowerarmangleZ*Math.PI/180.0));
    rightlowerArm.updateMatrixWorld();
}

function setupleftWrist(parentMatrix) {
    leftWrist.matrix.copy(parentMatrix);
    leftWrist.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.35, 0));
    leftWrist.updateMatrixWorld();
}

function setuprightWrist(parentMatrix) {
    rightWrist.matrix.copy(parentMatrix);
    rightWrist.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.35, 0));
    rightWrist.updateMatrixWorld();
}

function setupleftHand(parentMatrix) {
    leftHand.matrix.copy(parentMatrix);
    leftHand.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.03, 0));
    leftHand.matrix.multiply(new THREE.Matrix4().makeRotationX(90*Math.PI/180.0));
    leftHand.updateMatrixWorld();
}

function setuprightHand(parentMatrix) {
    rightHand.matrix.copy(parentMatrix);
    rightHand.matrix.multiply(new THREE.Matrix4().makeTranslation(0, -0.03, 0));
    rightHand.matrix.multiply(new THREE.Matrix4().makeRotationX(90*Math.PI/180.0));
    rightHand.updateMatrixWorld();
}

var frontlegleftAngle = 0;
var frontlegrightAngle = 15;
var hindlegrightAngle = 0;
var hindlegleftAngle = 15;

function setuphindleftThigh(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    hindleftThigh.matrix.copy(parentMatrix);     // copy theparent link transformation
    hindleftThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(0.088,0.87,-0.31));              // post multiply by translate matrix
    hindleftThigh.matrix.multiply(new THREE.Matrix4().makeRotationX(hindlegleftAngle*Math.PI/180.0));           // post multiply by rotation matrix
    hindleftThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*hindthighLength,0));              // post multiply by translate matrix
    hindleftThigh.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setuphindrightThigh(parentMatrix) {
//  printMatrix("leg parent",parentMatrix);
  hindrightThigh.matrix.copy(parentMatrix);     // copy theparent link transformation
  hindrightThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.088,0.87,-0.31));              // post multiply by translate matrix
  hindrightThigh.matrix.multiply(new THREE.Matrix4().makeRotationX(hindlegrightAngle*Math.PI/180.0));           // post multiply by rotation matrix
  hindrightThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*hindthighLength,0));              // post multiply by translate matrix
  hindrightThigh.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupfrontleftThigh(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    frontleftThigh.matrix.copy(parentMatrix);     // copy theparent link transformation
    frontleftThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(0.124,0.78,0.36));              // post multiply by translate matrix
    frontleftThigh.matrix.multiply(new THREE.Matrix4().makeRotationX(frontlegleftAngle*Math.PI/180.0));           // post multiply by rotation matrix
    frontleftThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*frontthighLength,0));              // post multiply by translate matrix
    frontleftThigh.updateMatrixWorld();         // force update of internal body.matrixWorld
}

function setupfrontrightThigh(parentMatrix) {
    //  printMatrix("leg parent",parentMatrix);
    frontrightThigh.matrix.copy(parentMatrix);     // copy theparent link transformation
    frontrightThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(-0.124,0.78,0.38));              // post multiply by translate matrix
    frontrightThigh.matrix.multiply(new THREE.Matrix4().makeRotationX(frontlegrightAngle*Math.PI/180.0));           // post multiply by rotation matrix
    frontrightThigh.matrix.multiply(new THREE.Matrix4().makeTranslation(0,-0.5*frontthighLength,0));              // post multiply by translate matrix
    frontrightThigh.updateMatrixWorld();         // force update of internal body.matrixWorld
}
//joints
function setuphindleftJoint(parentMatrix){
    hindleftJoint.matrix.copy(parentMatrix);
    hindleftJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.29,0));
    hindleftJoint.updateMatrixWorld();
}

function setuphindrightJoint(parentMatrix){
    hindrightJoint.matrix.copy(parentMatrix);
    hindrightJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.29,0));
    hindrightJoint.updateMatrixWorld();
}

function setupfrontleftJoint(parentMatrix){
    frontleftJoint.matrix.copy(parentMatrix);
    frontleftJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.29,0));
    frontleftJoint.updateMatrixWorld();
}

function setupfrontrightJoint(parentMatrix){
    frontrightJoint.matrix.copy(parentMatrix);
    frontrightJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.29,0));
    frontrightJoint.updateMatrixWorld();
}

var hindcalfleftAngle = 5;
var hindcalfrightAngle = 0;
var frontcalfleftAngle = 5;
var frontcalfrightAngle = 0;

//calves
function setuphindleftCalf(parentMatrix) {
    hindleftCalf.matrix.copy(parentMatrix);
    hindleftCalf.matrix.multiply(new THREE.Matrix4().makeRotationX(hindcalfleftAngle*Math.PI/180.0));
    hindleftCalf.updateMatrixWorld();
}

function setuphindrightCalf(parentMatrix) {
    hindrightCalf.matrix.copy(parentMatrix);
    hindrightCalf.matrix.multiply(new THREE.Matrix4().makeRotationX(hindcalfrightAngle*Math.PI/180.0));
    hindrightCalf.updateMatrixWorld();
}

function setupfrontleftCalf(parentMatrix) {
    frontleftCalf.matrix.copy(parentMatrix);
    frontleftCalf.matrix.multiply(new THREE.Matrix4().makeRotationX(frontcalfleftAngle*Math.PI/180.0));
    frontleftCalf.updateMatrixWorld();
}

function setupfrontrightCalf(parentMatrix) {
    frontrightCalf.matrix.copy(parentMatrix);
    frontrightCalf.matrix.multiply(new THREE.Matrix4().makeRotationX(frontcalfrightAngle*Math.PI/180.0));
    frontrightCalf.updateMatrixWorld();
}

//hoof joints
function setuphindlefthoofJoint(parentMatrix){
    hindlefthoofJoint.matrix.copy(parentMatrix);
    hindlefthoofJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.5,0));
    hindlefthoofJoint.updateMatrixWorld();
}

function setuphindrighthoofJoint(parentMatrix){
    hindrighthoofJoint.matrix.copy(parentMatrix);
    hindrighthoofJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.5,0));
    hindrighthoofJoint.updateMatrixWorld();
}

function setupfrontlefthoofJoint(parentMatrix){
    frontlefthoofJoint.matrix.copy(parentMatrix);
    frontlefthoofJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.5,0));
    frontlefthoofJoint.updateMatrixWorld();
}

function setupfrontrighthoofJoint(parentMatrix){
    frontrighthoofJoint.matrix.copy(parentMatrix);
    frontrighthoofJoint.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.5,0));
    frontrighthoofJoint.updateMatrixWorld();
}

function setuphindleftHoof(parentMatrix){
    hindleftHoof.matrix.copy(parentMatrix);
    hindleftHoof.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.05,0.02));
    hindleftHoof.matrix.multiply(new THREE.Matrix4().makeRotationX(30*Math.PI/180.0));
    hindleftHoof.updateMatrixWorld();
}

function setuphindrightHoof(parentMatrix){
    hindrightHoof.matrix.copy(parentMatrix);
    hindrightHoof.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.05,0.02));
    hindrightHoof.matrix.multiply(new THREE.Matrix4().makeRotationX(30*Math.PI/180.0));
    hindrightHoof.updateMatrixWorld();
}

function setupfrontleftHoof(parentMatrix){
    frontleftHoof.matrix.copy(parentMatrix);
    frontleftHoof.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.05,0.02));
    frontleftHoof.matrix.multiply(new THREE.Matrix4().makeRotationX(30*Math.PI/180.0));
    frontleftHoof.updateMatrixWorld();
}

function setupfrontrightHoof(parentMatrix){
    frontrightHoof.matrix.copy(parentMatrix);
    frontrightHoof.matrix.multiply(new THREE.Matrix4().makeTranslation(0.005,-0.05,0.02));
    frontrightHoof.matrix.multiply(new THREE.Matrix4().makeRotationX(30*Math.PI/180.0));
    frontrightHoof.updateMatrixWorld();
}

/////////////////////////////////////////////////////////////////
// updateWorld():  update all degrees of freedom, as needed, and recompute matrices
//////////////////////////////////////////////////////////////////

var clock = new THREE.Clock(true);

function updateWorld() {
  var modelMatrix = new THREE.Matrix4();
  modelMatrix.identity();
    // only start the matrix setup if the 'body' object has been loaded
  if (body != undefined) {   
    setupBody(modelMatrix);     
  }
    setupSphere(modelMatrix);
}

//////////////////////////////////////////////////////////////////
//  checkKeyboard():   listen for keyboard presses
//////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
var mode = 6;
function checkKeyboard() {
   body = scene.getObjectByName( 'body' );

    if (body != undefined) {
     body.matrixAutoUpdate = false;
   }

  for (var i=0; i<6; i++)
  {
    if (keyboard.pressed(i.toString()))
    {
      mode = i;
      break;
    }
  }
  switch(mode)
  {
    //add poses here:
    case 0:       // pose
          camera.matrixAutoUpdate = true;
          bodyHeight = 0.7;
          bodyForward = 0;
          headAngle = 0;
          sphereDistance = 3.0;
          frontlegrightAngle = -60;
          frontlegleftAngle = -10;
          frontcalfrightAngle = 95;
          frontcalfleftAngle = 0;
          hindlegrightAngle = 15;
          hindlegleftAngle = -25;
          hindcalfleftAngle = 45;
          hindcalfrightAngle = -15;
          upperarmangleZ = 120;
          lowerarmangleX = 0;
          lowerarmangleZ = 30;
          upperarmangleX = 0;
      break;     
    case 1:       // pose front legs raised
          camera.position.set(-8,3,10);
          camera.lookAt(scene.position);
          bodyHeight = 0.7;
          bodyForward = 0;
          sphereDistance = 3.0;
          frontlegrightAngle = -55;
          frontlegleftAngle = -35;
          frontcalfrightAngle = 70;
          frontcalfleftAngle = 5;
          hindlegrightAngle = 40;
          hindlegleftAngle = 35;
          hindcalfleftAngle = -25;
          hindcalfrightAngle = -10;
          upperarmangleZ = 40;
          lowerarmangleX = -40;
          lowerarmangleZ = 0;
          upperarmangleX = 0;
          headAngle = -20;
      break;
    case 2:       // pose hind legs raised
          camera.position.set(-8,3,10);
          camera.lookAt(scene.position);
          bodyHeight = 0.7;
          bodyForward = 0;
          sphereDistance = 3.0;
          frontlegrightAngle = -45;
          frontlegleftAngle = -55;
          hindlegrightAngle = 30;
          hindlegleftAngle = 45;
          hindcalfleftAngle = 45;
          hindcalfrightAngle = 10;
          frontcalfleftAngle = 85;
          frontcalfrightAngle = 17;
          upperarmangleZ = 40;
          lowerarmangleX = -75;
          lowerarmangleZ = 0;
          upperarmangleX = -40;
          headAngle = 30;
      break;
      case 3:         // animation of flying, resets with press
          //resetting things changed in other cases
          sphereDistance = 3.0;
          animate();
        function animate(){
            requestAnimationFrame(animate);
            render();
            update();
        }
        function update(){
            //reset
            if(keyboard.pressed("3")){
                bodyForward = 0;
                hindlegleftAngle = 0;
                hindcalfleftAngle = 0;
                hindlegrightAngle = 0;
                hindcalfrightAngle= 0;
                frontlegleftAngle = 0;
                frontcalfleftAngle = 0;
                frontlegrightAngle = 0;
                frontcalfrightAngle = 0;
                upperarmangleZ = 0;
                bodyHeight = 0.4;
                headAngle = 0;
            }
            var timer = 0;
            timer += clock.getDelta();
            bodyForward += timer;
            hindlegleftAngle += 15*timer;
            hindcalfleftAngle += 20*timer;
            hindlegrightAngle += 5*timer;
            hindcalfrightAngle += 40*timer;
            frontlegleftAngle -= 35*timer;
            frontcalfleftAngle += 30*timer;
            frontlegrightAngle -= 20*timer;
            frontcalfrightAngle += 40*timer;
            upperarmangleZ += 40*timer;
            bodyHeight += 0.25*timer;
            headAngle -= 10*timer;
            if(bodyForward > 2.5) {
                clock.stop();
            }
            render();
        }
        function render(){
            renderer.render(scene, camera);
        }
      break;
    case 4:  // camera moves with left hind leg and looks at front right leg
          var t = clock.getElapsedTime();
          bodyForward = 0;
          hindlegrightAngle = 0;
          hindcalfrightAngle = 0;
          hindlegleftAngle = 20*Math.sin(t);
          hindcalfleftAngle= 20*Math.abs(Math.sin(t));
          frontlegrightAngle = 0;
          frontcalfrightAngle = 0;
          frontlegleftAngle = 0;//20*Math.sin(t);
          frontcalfleftAngle = 0;//20*Math.abs(Math.sin(t));
          upperarmangleZ = 0;
          upperarmangleX = 0;
          lowerarmangleZ = 0;
          lowerarmangleX = 0;
          bodyHeight = 0.4;
          headAngle = 0;
          var pos = new THREE.Vector3().setFromMatrixPosition(hindleftCalf.matrix);
          console.log(pos.x, pos.y, pos.z);
          camera.position.set(pos.x, pos.y, pos.z+0.1);
          var look = new THREE.Vector3().setFromMatrixPosition(frontrightCalf.matrix);
          camera.lookAt(look);
          console.log(look.x, look.y, look.z);
      break;
    case 5:
          //animation of horse jumping back and forth over sphere
          var t = clock.getElapsedTime();
          bodyHeight = 1.5*Math.abs(Math.cos(t))+0.5;
          bodyForward = 1.5*Math.sin(t)-0.15;
          frontlegrightAngle = -30*Math.abs(Math.cos(t+0.1));
          frontcalfrightAngle = 65*Math.abs(Math.cos(t+0.1));
          frontlegleftAngle = -55*Math.abs(Math.cos(t+0.1));
          frontcalfleftAngle = 75*Math.abs(Math.cos(t+0.1));
          hindlegleftAngle = 25*Math.cos(t)+8;
          hindcalfleftAngle = 35*Math.abs(Math.cos(t));
          hindlegrightAngle = 15*Math.cos(t)+5;
          hindcalfrightAngle = 60*Math.abs(Math.cos(t));
          upperarmangleZ = 120*Math.abs(Math.cos(t));
          lowerarmangleZ = 20*Math.abs(Math.cos(t));
          lowerarmangleX = -20*Math.abs(Math.cos(t));
          upperarmangleX = -35*Math.abs(Math.cos(t))-10;
          headAngle = 10*Math.cos(t);
          sphereDistance = 3*Math.cos(t*2+3);
          break;
    default:
      break;
  }
}

//////////////////////////////////////////////////////////////////
//  update()
//////////////////////////////////////////////////////////////////

function update() {
  checkKeyboard();
  renderer.render(scene, camera);
  updateWorld();
  requestAnimationFrame(update);     // this requests the next update call
}

update();     // launch an infinite drawing loop
