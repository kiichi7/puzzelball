//balllogic.js

//BALL SIZE MEDIUM							OLD GRAVITY -9.81 CURRENT -19.62	CURRENT airs20;diag airsmod
//SCALE 3,3,3;MASS 1;TOP SPEED 35, 35.1 	OLD fs20;diag 5.857; 				OLD airs5;diag 1.465
//NEW GRAV TOP SPEED 35.5					OLD fs40;diag11.716 drag.93 		OLD airs10;diag 2.929
//											OLD fs60; diag17.574 drag1.49 		OLD airs7;diag 2.051	
//BALL SIZE SMALL							OLD	fs100; diag fsmod; drag2.5; friction6.95	//oldcomponent distance50height46
//SCALE 1.5,1.5,1.5; MASS .7; TOP SPEED 51.3, 53 
//BALL SIZE LARGE
//SCALE 7,7,7; MASS 2.5; TOP SPEED 18.1, 19.8  NEW GRAVITY -19.62: drag 2.29 friction 4
#pragma strict
//var spawnpos : Vector3; //Respawn Position
//var ballPhysic : PhysicMaterial;
var floorhit : AudioClip;
var wallhit : AudioClip;
var springhit : AudioClip;
var sound : AudioSource;
var pickupsnd : AudioSource; 
var ballroll : AudioSource; 
var deathheight : float;
private var direction : String = ""; //Stores Ball Direction Every Frame
private var onFloorSemaphore : int = 0; //Ball Contact Floor
private var fs : int = 100; //Non Diagonal Floor Speed
private var fsmod : float = 29.28933; //Diagonal Floor Speed Modifier
private var airs : int = 20; //Non Diagonal Air Speed
private var airsmod : float = 5.858; //Diagonal Air Speed Modifier
private var fdrag : float = 2.29; //Floor Drag Magnitude 
//private var inTube : boolean = false; //Toggle Check Player In Tube
//private var memory : boolean = false; //Begins/Ends Memory Game
//private var ShadowDistTolerance : int  = gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance;
//private var xSpeedSqr : float = 0; // x Speed Squared, Diag Air Speed Check
//private var zSpeedSqr : float = 0; // z Speed Squared, Diag Air Speed Check
//private var xzVel : Vector3 = Vector3(0,0,0); //To Normalize Diagonal Velocity And Clamp It To airs
//var t = 0
private var velocityLastFrame : Vector3; //SOUND VARIABLES
private var collisionNormal : Vector3;
private var xAxisAngle : float;
private var xFactor : float;
private var yAxisAngle : float;
private var yFactor : float;
private var zAxisAngle : float;
private var zFactor : float;
//private var semaphoreLastFrame : int;
private var fullSpeed : boolean = false; //TAP CONTROL VARIABLES
//private var startedFullSpeedTimer : boolean = false;
private var directionLastFrame : String = "";
private var smash : int = 0; //When smash == 2 level restarts, //SMASH CONTROL VARIABLE
//var cam : Transform;
private var cameraRelativeRight : Vector3;//RELATIVE CAMERA VARIABLES
private var cameraRelativeLeft : Vector3;
private var cameraRelativeUp : Vector3;
private var cameraRelativeDown : Vector3;
private var cameraRelativeUpRight : Vector3;
private var cameraRelativeUpLeft : Vector3;
private var xVel : Vector3; //x velocity relative to camera
private var zVel : Vector3; //z velocity relative to camera
private var xSpeed : float = 0; //xVel magnitude
private var zSpeed : float = 0;	//zVel magnitude
//private var relativeRight : Vector3;
//function Awake()
//{
//var camera = Camera.main.transform;
//} 
private var delta : float = 50;


function FixedUpdate() {
	//ADDFORCE CODE
	//Set Diagonal Force Equal To Linear Force: a^2+b^2=c^2, c=40, a,b=40-11.716
	switch(direction)
	{
	case "upright" :
		//Debug.Log("upright");
		if(onFloorSemaphore > 0)//On Floor
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * cameraRelativeUpRight * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * cameraRelativeUpRight * Time.fixedDeltaTime * delta);}	
		}
		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))//Air
//		rigidbody.AddForce(-airs+airsmod,0,-airs+airsmod);
			{if(zVel.normalized == cameraRelativeUp) 
			 	{if(zSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * cameraRelativeUp * Time.fixedDeltaTime * delta);} 
			 else rigidbody.AddForce(10.6 * cameraRelativeUp * Time.fixedDeltaTime * delta);
			 
			 if(xVel.normalized == cameraRelativeRight)
			 	{if(xSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * cameraRelativeRight * Time.fixedDeltaTime * delta);}
			 else rigidbody.AddForce(10.6 * cameraRelativeRight * Time.fixedDeltaTime * delta);
			}
		break;
	case "upleft" :
		//Debug.Log("upleft");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * cameraRelativeUpLeft * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * cameraRelativeUpLeft * Time.fixedDeltaTime * delta);}	
		}
		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))
//		rigidbody.AddForce(airs-airsmod,0,-airs+airsmod);
			{if(zVel.normalized == cameraRelativeUp) 
			 	{if(zSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * cameraRelativeUp * Time.fixedDeltaTime * delta);} 
			 else rigidbody.AddForce(10.6 * cameraRelativeUp * Time.fixedDeltaTime * delta);
			 
			 if(xVel.normalized == -cameraRelativeRight)
			 	{if(xSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * -cameraRelativeRight * Time.fixedDeltaTime * delta);}
			 else rigidbody.AddForce(10.6 * -cameraRelativeRight * Time.fixedDeltaTime * delta);
			}
		break;
	case "downright" :
		//Debug.Log("downright");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * -cameraRelativeUpLeft * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * -cameraRelativeUpLeft * Time.fixedDeltaTime * delta);}	
		}
		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))
//		rigidbody.AddForce(-airs+airsmod,0,airs-airsmod);
			{if(zVel.normalized == -cameraRelativeUp) 
			 	{if(zSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * -cameraRelativeUp * Time.fixedDeltaTime * delta);} 
			 else rigidbody.AddForce(10.6 * -cameraRelativeUp * Time.fixedDeltaTime * delta);
			 
			 if(xVel.normalized == cameraRelativeRight)
			 	{if(xSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * cameraRelativeRight * Time.fixedDeltaTime * delta);}
			 else rigidbody.AddForce(10.6 * cameraRelativeRight * Time.fixedDeltaTime * delta);
			}
		break;
	case "downleft" :
		//Debug.Log("downleft");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * -cameraRelativeUpRight * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * -cameraRelativeUpRight * Time.fixedDeltaTime * delta);}	
		}
		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))
//		rigidbody.AddForce(airs-airsmod,0,airs-airsmod);
			{if(zVel.normalized == -cameraRelativeUp) 
			 	{if(zSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * -cameraRelativeUp * Time.fixedDeltaTime * delta);} 
			 else rigidbody.AddForce(10.6 * -cameraRelativeUp * Time.fixedDeltaTime * delta);
			 
			 if(xVel.normalized == -cameraRelativeRight)
			 	{if(xSpeed < (airs-airsmod-.1)) rigidbody.AddForce(10.6 * -cameraRelativeRight * Time.fixedDeltaTime * delta);}
			 else rigidbody.AddForce(10.6 * -cameraRelativeRight * Time.fixedDeltaTime * delta);
			 	
//			 if(zVel.normalized == -cameraRelativeUp)
//			 {
//			   if(zSpeed < airs-airsmod-.1)  rigidbody.AddForce(10.6 * -cameraRelativeUp);
//			   else if(zSpeed > airs-airsmod+.1)  rigidbody.AddForce(10.6 * cameraRelativeUp);
//			 } 
//			 else rigidbody.AddForce(10.6 * -cameraRelativeUp);
////			 else if(zVel.normalized == cameraRelativeUp) rigidbody.AddForce(10.6 * -cameraRelativeUp);
//			 
//			 if(xVel.normalized == -cameraRelativeRight)
//			 {
//			   if(xSpeed < airs-airsmod-.1)  rigidbody.AddForce(10.6 * -cameraRelativeRight);
//			   else if(xSpeed > airs-airsmod+.1)  rigidbody.AddForce(10.6 * cameraRelativeRight);
//			 } 
//			 else rigidbody.AddForce(10.6 * -cameraRelativeRight);
			}
		break;	
	case "up" :
		//Debug.Log("up");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * cameraRelativeUp * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * cameraRelativeUp * Time.fixedDeltaTime * delta);}	
		}
		else if(onFloorSemaphore == 0) //&& zSpeed > -airs)
			{if(zSpeed < airs) rigidbody.AddForce((airs*.75) * cameraRelativeUp * Time.fixedDeltaTime * delta);
			 if(xSpeed > .1)
			 {
			 	if(xVel.normalized == cameraRelativeRight) rigidbody.AddForce((airs*.75) * -cameraRelativeRight * Time.fixedDeltaTime * delta);
			 	else if(xVel.normalized == -cameraRelativeRight) rigidbody.AddForce((airs*.75) * cameraRelativeRight * Time.fixedDeltaTime * delta);
			 }
//			 if(xVel.x < -.1)  rigidbody.AddForce((airs*.75) * -cameraRelativeRight);
//			 else if(xVel.x > .1)  rigidbody.AddForce((airs*.75) * cameraRelativeRight);}
}
//Debug.Log((airs*.75) * -cameraRelativeRight);
		break;
	case "right" :
		//Debug.Log("right");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * cameraRelativeRight * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * cameraRelativeRight * Time.fixedDeltaTime * delta);}
		}		
		else if(onFloorSemaphore == 0) //&& xSpeed > -airs)
			{if(xSpeed < airs) rigidbody.AddForce((airs*.75) * cameraRelativeRight * Time.fixedDeltaTime * delta);
			 if(zSpeed > .1)
			 {
			 	if(zVel.normalized == cameraRelativeUp) rigidbody.AddForce((airs*.75) * -cameraRelativeUp * Time.fixedDeltaTime * delta);
			 	else if(zVel.normalized == -cameraRelativeUp) rigidbody.AddForce((airs*.75) * cameraRelativeUp * Time.fixedDeltaTime * delta);
			 }
//			 if(zVel.z < -.1)  rigidbody.AddForce((airs*.75) * -cameraRelativeUp);
//			 else if(zVel.z > .1)  rigidbody.AddForce((airs*.75) * cameraRelativeUp);}
}
		break;
	case "down" :
		//Debug.Log("down");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * -cameraRelativeUp * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * -cameraRelativeUp * Time.fixedDeltaTime * delta);}
		}		
		else if(onFloorSemaphore == 0) //&& zSpeed < airs)
			{if(zSpeed < airs) rigidbody.AddForce((airs*.75) * -cameraRelativeUp * Time.fixedDeltaTime * delta);
			 if(xSpeed > .1)
			 {
			 	if(xVel.normalized == cameraRelativeRight) rigidbody.AddForce((airs*.75) * -cameraRelativeRight * Time.fixedDeltaTime * delta);
			 	else if(xVel.normalized == -cameraRelativeRight) rigidbody.AddForce((airs*.75) * cameraRelativeRight * Time.fixedDeltaTime * delta);
			 }
//			 if(xVel.x < -.1)  rigidbody.AddForce((airs*.75) * -cameraRelativeRight);
//			 else if(xVel.x > .1)  rigidbody.AddForce((airs*.75) * cameraRelativeRight);}
}
		break;
	case "left" : 
//		Debug.Log("left");
		if(onFloorSemaphore > 0)
		{
			if(fullSpeed){
				rigidbody.AddForce(fs * -cameraRelativeRight * Time.fixedDeltaTime * delta);}
			else{rigidbody.AddForce((fs-75) * -cameraRelativeRight * Time.fixedDeltaTime * delta);}
		}		
		else if(onFloorSemaphore == 0) //&& xSpeed < airs)
			{if(xSpeed < airs) rigidbody.AddForce((airs*.75) * -cameraRelativeRight * Time.fixedDeltaTime * delta);
			 if(zSpeed > .1)
			 {
			 	if(zVel.normalized == cameraRelativeUp) rigidbody.AddForce((airs*.75) * -cameraRelativeUp * Time.fixedDeltaTime * delta);
			 	else if(zVel.normalized == -cameraRelativeUp) rigidbody.AddForce((airs*.75) * cameraRelativeUp * Time.fixedDeltaTime * delta);
			 }
//			 if(zVel.z < -.1)  rigidbody.AddForce((airs*.75) * -cameraRelativeUp);
//			 else if(zVel.z > .1)  rigidbody.AddForce((airs*.75) * cameraRelativeUp);}
}
		break;	
	}		
}

function FullSpeedTimer(){ //COROUTINE FUNCTION FOR TAP CODE
//	Debug.Log("started");
//	startedFullSpeedTimer = true;
	yield WaitForSeconds(.07);
	fullSpeed = true;
//	Debug.Log(fullSpeed);
}

function Update() 
{
	//CAMERA ADJUSTMENTS
    cameraRelativeRight = Camera.main.transform.TransformDirection (Vector3.right);
//    cameraRelativeLeft = cam.TransformDirection (Vector3.left);
    cameraRelativeUp = Camera.main.transform.TransformDirection (Vector3.forward);
    cameraRelativeUp.y = 0;
    cameraRelativeUp = cameraRelativeUp.normalized;
    
//    cameraRelativeUpRight = cam.TransformDirection (Vector3(1,0,1));
//    cameraRelativeUpRight.y = 0;
//    cameraRelativeUpRight = cameraRelativeUpRight.normalized;
	cameraRelativeUpRight = (cameraRelativeUp + cameraRelativeRight);
    cameraRelativeUpRight = cameraRelativeUpRight.normalized;
    
	cameraRelativeUpLeft = (cameraRelativeUp - cameraRelativeRight);
	cameraRelativeUpLeft = cameraRelativeUpLeft.normalized;
	
//	var cameraRelativeVelocityX = cam.TransformDirection (Vector3(rigidbody.velocity.x,0,0));
//	relativeRight = Vector3.Project(rigidbody.velocity, cam.transform.right);
//    var cameraSpaceRight = Vector3.right * relativeRight.magnitude;
//    zVel = Vector3.Project(rigidbody.velocity, cam.transform.forward);
//    var cameraSpaceup = cam.transform.InverseTransformDirection(zVel);
//	Debug.Log(xVel + "  " + zVel);
	
//var cameraForwardHorizontalVector = Vector3.Cross(Camera.main.transform.right, Vector3.up).normalized;

//var velocityCameraForward = Vector3.Project(rigidbody.velocity, cameraForwardHorizontalVector);
//var velocityCameraBackward = velocityCameraForward * -1;
//var velocityCameraRight = Vector3.Project(rigidbody.velocity, Camera.main.transform.right);
//var velocityCameraLeft = velocityCameraRight * -1;
//
//var forwardMagnitude = velocityCameraForward.magnitude;
//var backwardMagnitude = velocityCameraBackward.magnitude;
//var rightMagnitude = velocityCameraRight.magnitude;
//var leftMagnitude = velocityCameraLeft.magnitude;
//    Debug.Log(velocityCameraRight + "  " + velocityCameraForward);
//	Debug.Log(cameraSpaceRight + "  " + cameraSpaceup);
//	var cameraRelativeVelocityZ = cam.TransformDirection (Vector3(0,0,rigidbody.velocity.z));
//	cameraRelativeVelocityZ = Vector3.Project(cameraRelativeVelocityZ, cameraRelativeUp);
	
	
//	var camRelVel = cam.TransformDirection (rigidbody.velocity);
//	var velMag = camRelVel.magnitude;
//	camRelVel.y = 0;
//	camRelVel = camRelVel.normalized * airs;
//	camRelVel = camRelVel * velMag;
//	Debug.DrawLine(rigidbody.position, rigidbody.position +cameraRelativeRight,Color.red,.1,false);	
//	Debug.DrawLine(rigidbody.position, rigidbody.position + cameraRelativeUp ,Color.white,.1,false);	
//	Debug.DrawLine(rigidbody.position,rigidbody.position -cameraRelativeRight ,Color.blue,.1,false);	
//	Debug.DrawLine(rigidbody.position,rigidbody.position -cameraRelativeRight ,Color.blue,.1,false);	
	
//	Debug.Log(cameraRelativeVelocity + "CAMERA");
	
	
	
//    cameraRelativeDown = cam.TransformDirection (Vector3.back);
//    cameraRelativeDown.y = 0;
//    cameraRelativeDown = cameraRelativeDown.normalized;
    
//    Debug.Log(cameraRelativeUpLeft + "UPLEFT");
//    Debug.Log(-cameraRelativeRight + "LEFT");
//    Debug.Log(cameraRelativeUp + "UP");
//    Debug.Log(cameraRelativeUp);
	//DEBUG CODE
//	Debug.Log(((gameObject.rigidbody.velocity.y *.1) + (gameObject.rigidbody.mass * .0009)) );
//	Debug.Log(gameObject.rigidbody.velocity.magnitude );
//	Debug.Log(zSpeed );
//	Debug.Log(onFloorSemaphore);
	//Debug.Log(direction);
//	Debug.Log(gameObject.rigidbody.velocity + direction);
	//Debug.Log(memory);
	//MOVEMENT CODE
//	Debug.Log(collider.material.bounciness);
	direction = "";
	if(Input.GetKey("up")) direction += "up";
	else if( Input.GetKey("down") ) direction += "down";
	
	if(Input.GetKey("right")) direction += "right";
	else if(Input.GetKey("left")) direction += "left";
	
	//TAP CODE
	if(direction != directionLastFrame)
	{	if(direction == "")
		{
			StopCoroutine('FullSpeedTimer');
		 	fullSpeed = false;
		}
		else if(directionLastFrame == "")
		{
//			StopCoroutine('FullSpeedTimer');
//			Debug.Log("STOP");
//			startedFullSpeedTimer = false;
//				fullSpeed = false;
//			Debug.Log(fullSpeed);
//			if(!startedFullSpeedTimer)
			StartCoroutine('FullSpeedTimer');
		}
	}
//	else if(!startedFullSpeedTimer)
//	{
//		StartCoroutine('FullSpeedTimer');
////		Debug.Log(fullSpeed);
//	}
	
	
	
	//DRAG ADJUSTMENT AND AIR DIAGONAL SPEED SAVE 
	if(onFloorSemaphore > 0){//ON FLOOR
//		collider.material.bounciness = 0;
		rigidbody.drag = 2.29;
//		if(onFloorSemaphore >= 2){
//			collider.material = null;
//		}
//		else {collider.material = ballPhysic;}
//		if(!inTube) //If Ball Is Not In Tube////////////////////////////////////////////
//			gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 5;
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 5;////////////////
	}	
	else //IN AIR
	{
		xVel = Vector3.Project(rigidbody.velocity, cameraRelativeRight);
		zVel = Vector3.Project(rigidbody.velocity, cameraRelativeUp);
		xSpeed = xVel.magnitude;
		zSpeed = zVel.magnitude;
//		collider.material.bounciness = 0.3;
//		if(!inTube) //If Ball Is Not In Tube////////////////////////////////////////////
//			gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 5;
//		xSpeed = gameObject.rigidbody.velocity.x;
//		zSpeed = gameObject.rigidbody.velocity.z;
//		xSpeedSqr = xSpeed * xSpeed;
//		zSpeedSqr = zSpeed * zSpeed;
//		rigidbody.drag = .01;	
		rigidbody.drag = .1;
//		t = t + 1;
//		Debug.Log(t);
//		xzVel = Vector3(gameObject.rigidbody.velocity.x,0,gameObject.rigidbody.velocity.z);//Store Only x,z
//			if(xzVel.sqrMagnitude > (airs*airs) && xzVel.sqrMagnitude < ((airs*airs)+100))
//			{
//				xzVel.Normalize(); //Convert Vector to magnitude 1, Saving Direction
//				xzVel*=airs; //Set Magnitude To Max
//				gameObject.rigidbody.velocity.x = xzVel.x; //Set Actual X Velocity
//				gameObject.rigidbody.velocity.z = xzVel.z; //Set Actual Z Velocity
//			}
	}
	
	//RESPAWN CODE
	if(transform.position.y < deathheight)
		{Application.LoadLevel(Application.loadedLevel);}
//		{transform.position = spawnpos;
//		 gameObject.rigidbody.velocity = Vector3(0,0,0);}
	//SMASH CODE
	if(smash >= 2) 
		{Application.LoadLevel(Application.loadedLevel);}

//Debug.Log(xSpeed + "  " + zSpeed + "  " + direction );
//Debug.Log(xzVel);	
//Debug.Log(((ballroll.volume - .2) + (gameObject.rigidbody.mass * .1)));	

	//ROLLING SOUND CODE
	if(onFloorSemaphore > 0 && gameObject.rigidbody.velocity.sqrMagnitude > 0){
		ballroll.volume = (gameObject.rigidbody.velocity.sqrMagnitude * .0002) ;
		ballroll.pitch = .4 + ballroll.volume;
		ballroll.mute = false;
	}	
	else
		ballroll.mute = true;
//	Debug.Log(ballroll.volume);		 
}	

function OnCollisionEnter(collision : Collision)
{	//SOUND CODE!!!
	collisionNormal = collision.contacts[0].normal;
//	Debug.Log(collisionNormal);
	xAxisAngle = Vector3.Angle(Vector3.right,collisionNormal);
//	Debug.Log(xAxisAngle);
	xFactor = (1.0/8100)*(xAxisAngle)*(xAxisAngle) + (-1.0/45)*(xAxisAngle) + 1.0;
	
	yAxisAngle = Vector3.Angle(Vector3.up,collisionNormal);
	yFactor = (1.0/8100)*(yAxisAngle)*(yAxisAngle) + (-1.0/45)*(yAxisAngle) + 1.0;
	
	zAxisAngle = Vector3.Angle(Vector3.forward,collisionNormal);
	zFactor = (1.0/8100)*(zAxisAngle)*(zAxisAngle) + (-1.0/45)*(zAxisAngle) + 1.0;
	
	sound.volume = (Mathf.Abs(velocityLastFrame.x) * xFactor * .001) + (Mathf.Abs(velocityLastFrame.y) * yFactor * .001) + 
	(Mathf.Abs(velocityLastFrame.z) * zFactor * .001);//(gameObject.rigidbody.mass * .0009);
//	Debug.Log(sound.volume);
//	Debug.Log(xFactor);
//	Debug.Log(yFactor);
//	Debug.Log(zFactor);
	
	if(collision.gameObject.tag == "SPIKES")//Ball Touches SPIKES
		Application.LoadLevel(Application.loadedLevel);
	
	if(collision.gameObject.tag == "SPRING")//Ball Touches SPRING
	{	
		onFloorSemaphore++;
		sound.pitch = 1;
		sound.PlayOneShot(springhit);
	}
	
	if(collision.gameObject.tag == "TUBE")//Ball Touches TUBE //OBSOLETE
	{
		onFloorSemaphore++;
		sound.pitch = 1;
		sound.PlayOneShot(wallhit);
	}
	
	if(collision.gameObject.tag == "ENEMY")//Ball Touches Wall	
	{	
		audio.pitch = 1;
		audio.PlayOneShot(wallhit);
	} 
	
	if(collision.gameObject.tag == "Untagged")//Ball Touches Wall
	{	
//		Debug.Log("HIT");
		sound.pitch = 1;
//		sound.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.x) * .003) + (Mathf.Abs(gameObject.rigidbody.velocity.z) * .003) + 
//			(gameObject.rigidbody.mass * .0009)); //Wall Sound Code 	
//		Debug.Log(sound.volume);
		sound.PlayOneShot(wallhit);
	}		

	if(collision.gameObject.tag == "FLOOR")//Ball Touches Floor
	{
		onFloorSemaphore++;		
//		Debug.Log("HIT");		
//		if(semaphoreLastFrame == 0) //FALLING FROM AIR
//		{ 	
			sound.pitch = 1;
//			sound.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .01) + (gameObject.rigidbody.mass * .0009));// + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0001) +
////				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0001) + (gameObject.rigidbody.mass * .0009));	
//			Debug.Log(sound.volume);				
//			sound.volume = ((ballroll.volume - .21) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
			//sound.volume = ((ballroll.volume - .3) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
			sound.PlayOneShot(floorhit);
//		}	
//		else if(semaphoreLastFrame > 0)//FLOOR TO FLOOR
//		{
//			sound.pitch = 1;
////			sound.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .001) + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0006) +	
////				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0006) + (gameObject.rigidbody.mass * .0009));	
////			Debug.Log(sound.volume);
//			sound.PlayOneShot(floorhit);
//		}
//		//MEMORY CODE
//		if((memory == true) && (collision.gameObject.tag == "FLOOR")) {
//			Application.LoadLevel(Application.loadedLevel);
//		}				
	}	
	
//	if(collision.gameObject.tag == "FLOORWALL")//Ball Touches Floor on top of Wall
//	{
//		onFloorSemaphore++;		
//		if(onFloorSemaphore == 1) //FALLING FROM AIR
//		{ 
//			sound.pitch = 1;
//			sound.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .01) + (gameObject.rigidbody.mass * .0009));// + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0001) +
////				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0001) + (gameObject.rigidbody.mass * .0009));	
////			Debug.Log(sound.volume);				
////			sound.volume = ((ballroll.volume - .21) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
//			//sound.volume = ((ballroll.volume - .3) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
//			sound.PlayOneShot(floorhit);
//		}	
//		else if(onFloorSemaphore > 1)//FLOOR TO FLOOR
//		{
//			sound.pitch = 1;
//			sound.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .001) + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0006) +	
//				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0006) + (gameObject.rigidbody.mass * .0009));	
//			Debug.Log(sound.volume);
//			sound.PlayOneShot(floorhit);
//		}
////		//MEMORY CODE
////		if((memory == true) && (collision.gameObject.tag == "FLOOR")) {
////			Application.LoadLevel(Application.loadedLevel);
////		}				
//	}	
	
}

function OnCollisionExit(collision : Collision)
{
	if(collision.gameObject.tag == "FLOOR" )//Ball Untouches a Floor
		onFloorSemaphore--;				
	if(collision.gameObject.tag == "SPRING" )//Ball Untouches a Spring
		onFloorSemaphore--;		
	if(collision.gameObject.tag == "TUBE" )//Ball Untouches a Tube//OBSOLETE
		onFloorSemaphore--;				
}

function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "TUBE"){//Ball Enters Tube
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 2;///////////////////////
//		inTube = true;/////////////////////////////////////////////////
		gameObject.GetComponentInChildren(BlobOneSurface).TubeToggle();//OBSOLETE
	}
	
	//NEW MEMORY CODE
	if(trigger.gameObject.tag == "MEMBLOCK")
		Application.LoadLevel(Application.loadedLevel);
	
//	if(trigger.gameObject.tag == "OBSTACLE")//Ball Touches Obstacle
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 18;		
}

function OnTriggerExit(trigger : Collider)
{
	if(trigger.gameObject.tag == "TUBE"){//Ball Exits Tube, Obstacle
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 20;
//		inTube = false;/////////////////////////////////////////////////
		gameObject.GetComponentInChildren(BlobOneSurface).TubeToggle();//OBSOLETE
	}
}

//MEMORY GAME FUNCTIONS///
//function StartMemoryGame()
//{
//	memory = true;
//}
//
//function StopMemoryGame()
//{	
//	memory = false;
//}
//////////////////////////

//function OnTriggerStay(trigger :Collider)
//{
//	
//}
function LateUpdate() 
{
	velocityLastFrame = gameObject.rigidbody.velocity;
	directionLastFrame = direction;
//	semaphoreLastFrame = onFloorSemaphore;

}

function ReturnVelocityLastFrame(){ //Accessed by Spring.js
	return velocityLastFrame;}
	
function IncDecSmashVar(incdec : boolean){ //Accessed by Smash.js
	if(incdec)
		{smash++;}
	else{smash--;}	
}





//function FixedUpdate() {
//	//ADDFORCE CODE
//	//Set Diagonal Force Equal To Linear Force: a^2+b^2=c^2, c=40, a,b=40-11.716
//	switch(direction)
//	{
//	case "upright" :
//		//Debug.Log("upright");
//		if(onFloorSemaphore > 0)//On Floor
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(-fs+fsmod,0,-fs+fsmod);}
//			else{rigidbody.AddForce(-17.67767,0,-17.67767);}	
//		}
//		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))//Air
////		rigidbody.AddForce(-airs+airsmod,0,-airs+airsmod);
//			{if(zSpeed > -airs+airsmod+.1) rigidbody.AddForce(0,0,-(10.6));//airs-airsmod
//			 else if(zSpeed < -airs+airsmod-.1) rigidbody.AddForce(0,0,10.6);
//			 if(xSpeed > -airs+airsmod+.1) rigidbody.AddForce(-(10.6),0,0);
//			 else if(xSpeed < -airs+airsmod-.1) rigidbody.AddForce(10.6,0,0);
//			}
//		break;
//	case "upleft" :
//		//Debug.Log("upleft");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(fs-fsmod,0,-fs+fsmod);}
//			else{rigidbody.AddForce(17.67767,0,-17.67767);}	
//		}
//		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))
////		rigidbody.AddForce(airs-airsmod,0,-airs+airsmod);
//			{if(zSpeed > -airs+airsmod+.1) rigidbody.AddForce(0,0,-(10.6));
//			 else if(zSpeed < -airs+airsmod-.1) rigidbody.AddForce(0,0,10.6);
//			 if(xSpeed < airs-airsmod-.1)  rigidbody.AddForce(10.6,0,0);
//			 else if(xSpeed > airs-airsmod+.1)  rigidbody.AddForce(-(10.6),0,0);
//			}
//		break;
//	case "downright" :
//		//Debug.Log("downright");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(-fs+fsmod,0,fs-fsmod);}
//			else{rigidbody.AddForce(-17.67767,0,17.67767);}	
//		}
//		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))
////		rigidbody.AddForce(-airs+airsmod,0,airs-airsmod);
//			{if(zSpeed < airs-airsmod-.1)  rigidbody.AddForce(0,0,10.6);
//			 else if(zSpeed > airs-airsmod+.1)  rigidbody.AddForce(0,0,-(10.6));
//			 if(xSpeed > -airs+airsmod+.1) rigidbody.AddForce(-(10.6),0,0);
//			 else if(xSpeed < -airs+airsmod-.1) rigidbody.AddForce(10.6,0,0);
//			}
//		break;
//	case "downleft" :
//		//Debug.Log("downleft");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(fs-fsmod,0,fs-fsmod);}
//			else{rigidbody.AddForce(17.67767,0,17.67767);}	
//		}
//		else if(onFloorSemaphore == 0) //&& xSpeedSqr+zSpeedSqr<=(airs*airs))
////		rigidbody.AddForce(airs-airsmod,0,airs-airsmod);
//			{if(zSpeed < airs-airsmod-.1)  rigidbody.AddForce(0,0,10.6);
//			 else if(zSpeed > airs-airsmod+.1)  rigidbody.AddForce(0,0,-(10.6));
//			 if(xSpeed < airs-airsmod-.1)  rigidbody.AddForce(10.6,0,0);
//			 else if(xSpeed > airs-airsmod+.1)  rigidbody.AddForce(-(10.6),0,0);
//			}
//		break;	
//	case "up" :
//		//Debug.Log("up");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(0,0,-fs);}
//			else{rigidbody.AddForce(0,0,-fs+75);}	
//		}
//		else if(onFloorSemaphore == 0) //&& zSpeed > -airs)
//			{if(zSpeed > -airs) rigidbody.AddForce(0,0,-airs*.75);
//			 if(xSpeed < -.1)  rigidbody.AddForce(airs*.75,0,0);
//			 else if(xSpeed > .1)  rigidbody.AddForce(-airs*.75,0,0);}
//		break;
//	case "right" :
//		//Debug.Log("right");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(-fs,0,0);}
//			else{rigidbody.AddForce(-fs+75,0,0);}
//		}		
//		else if(onFloorSemaphore == 0) //&& xSpeed > -airs)
//			{if(xSpeed > -airs) rigidbody.AddForce(-airs*.75,0,0);
//			 if(zSpeed < -.1)  rigidbody.AddForce(0,0,airs*.75);
//			 else if(zSpeed > .1)  rigidbody.AddForce(0,0,-airs*.75);}
//		break;
//	case "down" :
//		//Debug.Log("down");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(0,0,fs);}
//			else{rigidbody.AddForce(0,0,fs-75);}
//		}		
//		else if(onFloorSemaphore == 0) //&& zSpeed < airs)
//			{if(zSpeed < airs) rigidbody.AddForce(0,0,airs*.75);
//			 if(xSpeed < -.1)  rigidbody.AddForce(airs*.75,0,0);
//			 else if(xSpeed > .1)  rigidbody.AddForce(-airs*.75,0,0);}
//		break;
//	case "left" : 
//		//Debug.Log("left");
//		if(onFloorSemaphore > 0)
//		{
//			if(fullSpeed){
//				rigidbody.AddForce(fs,0,0);}
//			else{rigidbody.AddForce(fs-75,0,0);}
//		}		
//		else if(onFloorSemaphore == 0) //&& xSpeed < airs)
//			{if(xSpeed < airs) rigidbody.AddForce(airs*.75,0,0);
//			 if(zSpeed < -.1)  rigidbody.AddForce(0,0,airs*.75);
//			 else if(zSpeed > .1)  rigidbody.AddForce(0,0,-airs*.75);}
//		break;	
//	}		
//}

























