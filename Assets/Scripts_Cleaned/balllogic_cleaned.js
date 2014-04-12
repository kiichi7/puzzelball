//balllogic.js
#pragma strict
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

}
		break;	
	}		
}

function FullSpeedTimer(){ //COROUTINE FUNCTION FOR TAP CODE
//	Debug.Log("started");
	yield WaitForSeconds(.07);
	fullSpeed = true;
//	Debug.Log(fullSpeed);
}

function Update() 
{
	//CAMERA ADJUSTMENTS
    cameraRelativeRight = Camera.main.transform.TransformDirection (Vector3.right);

    cameraRelativeUp = Camera.main.transform.TransformDirection (Vector3.forward);
    cameraRelativeUp.y = 0;
    cameraRelativeUp = cameraRelativeUp.normalized;
    

	cameraRelativeUpRight = (cameraRelativeUp + cameraRelativeRight);
    cameraRelativeUpRight = cameraRelativeUpRight.normalized;
    
	cameraRelativeUpLeft = (cameraRelativeUp - cameraRelativeRight);
	cameraRelativeUpLeft = cameraRelativeUpLeft.normalized;
	
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

			StartCoroutine('FullSpeedTimer');
		}
	}

	
	
	
	//DRAG ADJUSTMENT AND AIR DIAGONAL SPEED SAVE 
	if(onFloorSemaphore > 0){//ON FLOOR
//		collider.material.bounciness = 0;
		rigidbody.drag = 2.29;
}
	else //IN AIR
	{
		xVel = Vector3.Project(rigidbody.velocity, cameraRelativeRight);
		zVel = Vector3.Project(rigidbody.velocity, cameraRelativeUp);
		xSpeed = xVel.magnitude;
		zSpeed = zVel.magnitude;
	
		rigidbody.drag = .1;

	}
	
	//RESPAWN CODE
	if(transform.position.y < deathheight)
		{Application.LoadLevel(Application.loadedLevel);}
//		{transform.position = spawnpos;
//		 gameObject.rigidbody.velocity = Vector3(0,0,0);}
	//SMASH CODE
	if(smash >= 2) 
		{Application.LoadLevel(Application.loadedLevel);}

	

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

		sound.PlayOneShot(wallhit);
	}		

	if(collision.gameObject.tag == "FLOOR")//Ball Touches Floor
	{
		onFloorSemaphore++;		

			sound.pitch = 1;
				
	}	
	

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

		gameObject.GetComponentInChildren(BlobOneSurface).TubeToggle();//OBSOLETE
	}
	
	//NEW MEMORY CODE
	if(trigger.gameObject.tag == "MEMBLOCK")
		Application.LoadLevel(Application.loadedLevel);
	

}




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































