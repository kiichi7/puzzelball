//BallLogicEnemy.js

#pragma strict
//private var spawnpos : Vector3 = Vector3(-9,-2,1); //Respawn Position
var aggroChild : GameObject; //FOR SIZE CHANGE OBJECTS
var floorhit : AudioClip;
var wallhit : AudioClip;
var springhit : AudioClip;
var pickupsnd : AudioSource;
var ballroll : AudioSource; 
var stunsound : AudioSource;
private var onFloorSemaphore : int = 0; //Ball Contact Floor
private var fdrag : float = 2.29; //Floor Drag Magnitude 
//private var inTube : boolean = false; //Toggle Check Player In Tube
private var willAggro : boolean = false; //If True Enemy Can Attack Player
private var stunned : boolean = false; //Is Enemy Stunned
private var AggroObjectReference : Transform = null; // Reference of Target 
private var AggroObjectDirection : Vector3 = Vector3(0,0,0); //Attack Direction 
private var attackReady : boolean = false; //FixedUpdate AddForce Trigger
private var visibleHit : RaycastHit; //Checks if Target is Visible
//var stunSound : AudioClip; //Enemy Stun Sound
var deathheight : float;
private var velocityLastFrame : Vector3;
private var collisionNormal : Vector3;
private var xAxisAngle : float;
private var xFactor : float;
private var yAxisAngle : float;
private var yFactor : float;
private var zAxisAngle : float;
private var zFactor : float;
//private var semaphoreLastFrame : int;
private var smash : int = 0; //When smash == 2 enemy is destroyed, SMASH CONTROL VARIABLE


function stun() //Stun Code
{
	yield WaitForSeconds(2);//STUN TIME DURATION
	renderer.material.color.r = 248/255.0F;
	renderer.material.color.g = 0/255.0F;
	renderer.material.color.b = 255/255.0F;
	stunned = false;
}

function AggroToggle() //Accessed by EnemyAggroToggle.js
{
	willAggro = !willAggro;
}

function GetAggroObjRef(target : Transform) //Accessed by EnemyAggroToggle.js
{
	AggroObjectReference = target;
}

//function CalcAggroObjDir()
//{
//	AggroObjectDirection = AggroObjectReference.position - transform.position;
//}

function FixedUpdate() 
{
	if(attackReady){
		rigidbody.AddForce(AggroObjectDirection*200);
		attackReady = false;	
		//Debug.Log(attackReady);
	}  
}

function Update() 
{
//Debug.Log(onFloorSemaphore);
//Debug.Log(gameObject.rigidbody.velocity.sqrMagnitude);
	if(willAggro && onFloorSemaphore > 0 && !stunned && (gameObject.rigidbody.velocity.sqrMagnitude <= 0.11)){//0.07 //HOW LITTLE MUST ENEMY 
		AggroObjectDirection = AggroObjectReference.position - transform.position;			//MOTION BE TO ATTACK
//		Debug.Log(AggroObjectDirection); 
//		AggroObjectDirection = AggroObjectDirection.normalized;
//		Debug.Log(AggroObjectDirection);
		//Debug.Log(attackReady);
//		Debug.DrawRay (transform.position,AggroObjectDirection * 5, Color.green);
		if(Physics.Raycast(transform.position, AggroObjectDirection, visibleHit, 25)) {
			if(visibleHit.transform.tag == "Player") {
				attackReady = true;
				//rigidbody.AddForce(AggroObjectDirection*50);
			}
		}
	}			
	
//	if(!stunned){} //STUN CODE

	
	
	//Debug.Log(AggroObjectReference);
	//Debug.Log(willAggro); 
	//Debug.Log(AggroObjectDirection*50); 

	//DRAG ADJUSTMENT AND AIR DIAGONAL SPEED ADJUSTMENT 
	if(onFloorSemaphore > 0){//ON FLOOR
//		collider.material.bounciness = 0;
		rigidbody.drag = fdrag;
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 2;
	}	
	else //IN AIR
	{
//		collider.material.bounciness = 0.3;
//		if(!inTube) //If Ball Is Not In Tube
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 5;
		rigidbody.drag = .1;	
	}
	
	//DESTROYED CODE
	if(transform.position.y < deathheight)
		//transform.position = spawnpos;
		{Destroy(gameObject);}
	//SMASH CODE
	if(smash >= 2) 
		{Destroy(gameObject);}
		
	//ROLLING SOUND CODE
	if(onFloorSemaphore > 0 && gameObject.rigidbody.velocity.sqrMagnitude > 0){
		ballroll.volume = (gameObject.rigidbody.velocity.sqrMagnitude * .0002) ;
		ballroll.pitch = .4 + ballroll.volume;
		ballroll.mute = false;
	}	
	else
		ballroll.mute = true;
}	



function OnCollisionEnter(collision : Collision)
{
//	Debug.Log(collision.gameObject.tag);
	collisionNormal = collision.contacts[0].normal;
//	Debug.Log(collisionNormal);
	xAxisAngle = Vector3.Angle(Vector3.right,collisionNormal);
//	Debug.Log(xAxisAngle);
	xFactor = (1.0/8100)*(xAxisAngle)*(xAxisAngle) + (-1.0/45)*(xAxisAngle) + 1.0;
	
	yAxisAngle = Vector3.Angle(Vector3.up,collisionNormal);
	yFactor = (1.0/8100)*(yAxisAngle)*(yAxisAngle) + (-1.0/45)*(yAxisAngle) + 1.0;
	
	zAxisAngle = Vector3.Angle(Vector3.forward,collisionNormal);
	zFactor = (1.0/8100)*(zAxisAngle)*(zAxisAngle) + (-1.0/45)*(zAxisAngle) + 1.0;
	
	audio.volume = (Mathf.Abs(velocityLastFrame.x) * xFactor * .001) + (Mathf.Abs(velocityLastFrame.y) * yFactor * .001) + 
	(Mathf.Abs(velocityLastFrame.z) * zFactor * .001);//(gameObject.rigidbody.mass * .0009);
//	Debug.Log(audio.volume);
//	Debug.Log(xFactor);
//	Debug.Log(yFactor);
//	Debug.Log(zFactor);	
//	Debug.Log(Mathf.Abs(velocityLastFrame.x) * xFactor + Mathf.Abs(velocityLastFrame.y) * yFactor +
//					Mathf.Abs(velocityLastFrame.z) * zFactor);	
				
	if(collision.gameObject.tag == "SPIKES")//Ball Touches SPIKES
		Destroy(gameObject);
							
	if(collision.gameObject.tag == "SPRING")//Ball Touches SPRING
	{
		onFloorSemaphore++;
		audio.pitch = 1;
		audio.PlayOneShot(springhit);
	}
	
	if(collision.gameObject.tag == "TUBE")//Ball Touches TUBE//OBSOLETE
	{
		onFloorSemaphore++;
		audio.pitch = 1;
		audio.PlayOneShot(wallhit);
		//STUN CODE
		if(!stunned && (Mathf.Abs(velocityLastFrame.x) * xFactor + Mathf.Abs(velocityLastFrame.y) * yFactor +
					Mathf.Abs(velocityLastFrame.z) * zFactor) > 15)//HOW HARD MUST ENEMY COLLIDE TO STUN
		{
			stunned = true; 
			renderer.material.color = Color.yellow;
			stunsound.Play();
	  		StartCoroutine("stun");
		}
	}		
	
	if(collision.gameObject.tag == "ENEMY")//Ball Touches Wall	
	{	//SOUND CODE
		audio.pitch = 1;
//		audio.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.x) * .003) + (Mathf.Abs(gameObject.rigidbody.velocity.z) * .003) + 
//			(gameObject.rigidbody.mass * .0009)); //Wall Sound Code 
		audio.PlayOneShot(wallhit);
		//STUN CODE
		if(!stunned && (Mathf.Abs(velocityLastFrame.x) * xFactor + Mathf.Abs(velocityLastFrame.y) * yFactor +
					Mathf.Abs(velocityLastFrame.z) * zFactor) > 15)//HOW HARD MUST ENEMY COLLIDE TO STUN
		{
			stunned = true; 
			renderer.material.color = Color.yellow;
			stunsound.Play();
	  		StartCoroutine("stun");
	  	}
	}  		
	
	if(collision.gameObject.tag == "Untagged")//Ball Touches Wall	
	{	//SOUND CODE
		audio.pitch = 1;
//		audio.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.x) * .003) + (Mathf.Abs(gameObject.rigidbody.velocity.z) * .003) + 
//			(gameObject.rigidbody.mass * .0009)); //Wall Sound Code 
		audio.PlayOneShot(wallhit);
		//STUN CODE
		if(!stunned && (Mathf.Abs(velocityLastFrame.x) * xFactor + Mathf.Abs(velocityLastFrame.y) * yFactor +
					Mathf.Abs(velocityLastFrame.z) * zFactor) > 15)//HOW HARD MUST ENEMY COLLIDE TO STUN
		{
			stunned = true; 
			renderer.material.color = Color.yellow;
			stunsound.Play();
	  		StartCoroutine("stun");
	  	}
	}  			


	if(collision.gameObject.tag == "FLOOR")//Ball Touches Floor
	{
		onFloorSemaphore++;
		//SOUND CODE
//		if(onFloorSemaphore == 1) //FALLING FROM AIR
//		{ 
			audio.pitch = 1;
//			audio.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .01) + (gameObject.rigidbody.mass * .0009));// + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0001) +
//				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0001) + (gameObject.rigidbody.mass * .0009));	
//			Debug.Log(sound.volume);				
//			sound.volume = ((ballroll.volume - .21) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
			//sound.volume = ((ballroll.volume - .3) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
			audio.PlayOneShot(floorhit);
//		}	
//		else if(onFloorSemaphore > 1)//FLOOR TO FLOOR
//		{
//			audio.pitch = 1;
////			audio.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .001) + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0006) +	
////				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0006) + (gameObject.rigidbody.mass * .0009));	
////			Debug.Log(sound.volume);
//			audio.PlayOneShot(floorhit);
//		}
		//STUN CODE
		if(!stunned && (Mathf.Abs(velocityLastFrame.x) * xFactor + Mathf.Abs(velocityLastFrame.y) * yFactor +
					Mathf.Abs(velocityLastFrame.z) * zFactor) > 15)//HOW HARD MUST ENEMY COLLIDE TO STUN
		{
			stunned = true; 
			renderer.material.color = Color.yellow;
			stunsound.Play();
	  		StartCoroutine("stun");
		}
																			
	}	
		
//	if(collision.gameObject.tag == "FLOORWALL")//Ball Touches Floor on top of Wall
//	{
//		onFloorSemaphore++;
//		//SOUND CODE
//		if(onFloorSemaphore == 1) //FALLING FROM AIR
//		{ 
//			audio.pitch = 1;
//			audio.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .01) + (gameObject.rigidbody.mass * .0009));// + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0001) +
////				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0001) + (gameObject.rigidbody.mass * .0009));	
////			Debug.Log(sound.volume);				
////			sound.volume = ((ballroll.volume - .21) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
//			//sound.volume = ((ballroll.volume - .3) + (gameObject.rigidbody.mass * .1)); //Floor Sound Code
//			audio.PlayOneShot(floorhit);
//		}	
//		else if(onFloorSemaphore > 1)//FLOOR TO FLOOR
//		{
//			audio.pitch = 1;
//			audio.volume = ((Mathf.Abs(gameObject.rigidbody.velocity.y) * .001) + (Mathf.Abs(gameObject.rigidbody.velocity.x) *.0006) +	
//				(Mathf.Abs(gameObject.rigidbody.velocity.z) *.0006) + (gameObject.rigidbody.mass * .0009));	
////			Debug.Log(sound.volume);
//			audio.PlayOneShot(floorhit);
//		}
//		//STUN CODE
//		if(gameObject.rigidbody.velocity.sqrMagnitude > 25 && stunned == false)
//		{
//			stunned = true; 
//			renderer.material.color = Color.yellow;
//			audio.PlayOneShot(stunSound);
//	  		StartCoroutine("stun");
//		}
//	}			
		
		//Debug.Log("HIT");
//		sound.pitch = 1;
//		sound.volume = ((ballroll.volume - .2) + (gameObject.rigidbody.mass * .1)); //Wall Sound Code
//		sound.PlayOneShot(wallhit);
	
	
	if(collision.gameObject.tag == "Player" && stunned == false)//Enemy Hits The Player
	{
		//if(collision.gameObject.transform.localScale != Vector3(7,7,7))
		if(collision.gameObject.transform.localScale.x <= gameObject.transform.localScale.x) 
		{
			//Debug.Log("HIT"); 
			Application.LoadLevel(Application.loadedLevel);
		}
		else(Destroy(gameObject));	
	}
			
}

function OnCollisionStay(collision : Collision)
{
	if(stunned == false && collision.gameObject.tag == "Player")//Enemy Hits The Player
	{
		//if(collision.gameObject.transform.localScale != Vector3(7,7,7))
		if(collision.gameObject.transform.localScale.x <= gameObject.transform.localScale.x) 
		{
			//Debug.Log("HIT"); 
			Application.LoadLevel(Application.loadedLevel);
		}
		else(Destroy(gameObject));	
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


function OnTriggerEnter(trigger : Collider)//OBSOLETE
{
	if(trigger.gameObject.tag == "TUBE"){//Ball Enters Tube
		gameObject.GetComponentInChildren(BlobOneSurface).TubeToggle();
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 2;
//		inTube = true;
	}
//	if(trigger.gameObject.tag == "OBSTACLE")//Ball Touches Obstacle
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 18;		
}

function OnTriggerExit(trigger : Collider)//OBSOLETE
{
	if(trigger.gameObject.tag == "TUBE"){//Ball Exits Tube, Obstacle
		gameObject.GetComponentInChildren(BlobOneSurface).TubeToggle();
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 20;
//		gameObject.GetComponentInChildren(BlobOneSurface).shadowDistanceTolerance = 1;
//		inTube = false;
	}

}

function LateUpdate() 
{
	velocityLastFrame = gameObject.rigidbody.velocity;
//	semaphoreLastFrame = onFloorSemaphore;
}

function ReturnVelocityLastFrame(){  //USED FOR Spring.js 
	return velocityLastFrame;}
	
function IncDecSmashVar(incdec : boolean){ //Accessed by Smash.js
	if(incdec)
		{smash++;}
	else{smash--;}	
}	























