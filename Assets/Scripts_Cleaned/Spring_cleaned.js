//Spring.js

#pragma strict

var forceMultiplier : float;
//private var reflectDir : Vector3;
private var hitObjVelLastFrame : Vector3;
private var velocityLastFrame : Vector3; //SOUND VARIABLES
private var collisionNormal : Vector3;
private var xAxisAngle : float;
private var xFactor : float;
private var yAxisAngle : float;
private var yFactor : float;
private var zAxisAngle : float;
private var zFactor : float;

function OnCollisionEnter(trigger : Collision)
{
	if(trigger.gameObject.tag == "Player")//Ball Collides With Spring
	{//Debug.Log("enter");
	
		collisionNormal = trigger.contacts[0].normal;
		xAxisAngle = Vector3.Angle(Vector3.right,collisionNormal);
		xFactor = (1.0/8100)*(xAxisAngle)*(xAxisAngle) + (-1.0/45)*(xAxisAngle) + 1.0;
		yAxisAngle = Vector3.Angle(Vector3.up,collisionNormal);
		yFactor = (1.0/8100)*(yAxisAngle)*(yAxisAngle) + (-1.0/45)*(yAxisAngle) + 1.0;
		zAxisAngle = Vector3.Angle(Vector3.forward,collisionNormal);
		zFactor = (1.0/8100)*(zAxisAngle)*(zAxisAngle) + (-1.0/45)*(zAxisAngle) + 1.0;
//		Debug.Log(Mathf.Abs(transform.eulerAngles.z));
		hitObjVelLastFrame = trigger.gameObject.GetComponent(balllogic).ReturnVelocityLastFrame();
		
		audio.volume = (Mathf.Abs(velocityLastFrame.x) * xFactor * .001) + (Mathf.Abs(velocityLastFrame.y) * yFactor * .001) + 
		(Mathf.Abs(velocityLastFrame.z) * zFactor * .001); //TESTING REQUIRED
		audio.Play();
		var velproject : Vector3 = Vector3.Project(hitObjVelLastFrame,transform.up);		
		trigger.gameObject.rigidbody.AddForce( transform.up * ((Mathf.Abs(velproject.x) * xFactor) + 
		(Mathf.Abs(velproject.y) * yFactor) + (Mathf.Abs(velproject.z) * zFactor)) * forceMultiplier
			, ForceMode.Impulse);	
//		
				
				
//		}
																																
	}
	else if(trigger.gameObject.tag == "ENEMY")//Ball Collides With Spring
	{//Debug.Log("enter");
		collisionNormal = trigger.contacts[0].normal;
		xAxisAngle = Vector3.Angle(Vector3.right,collisionNormal);
		xFactor = (1.0/8100)*(xAxisAngle)*(xAxisAngle) + (-1.0/45)*(xAxisAngle) + 1.0;
		yAxisAngle = Vector3.Angle(Vector3.up,collisionNormal);
		yFactor = (1.0/8100)*(yAxisAngle)*(yAxisAngle) + (-1.0/45)*(yAxisAngle) + 1.0;
		zAxisAngle = Vector3.Angle(Vector3.forward,collisionNormal);
		zFactor = (1.0/8100)*(zAxisAngle)*(zAxisAngle) + (-1.0/45)*(zAxisAngle) + 1.0;
		
		hitObjVelLastFrame = trigger.gameObject.GetComponent(BallLogicEnemy).ReturnVelocityLastFrame();
		
		audio.volume = (Mathf.Abs(velocityLastFrame.x) * xFactor * .001) + (Mathf.Abs(velocityLastFrame.y) * yFactor * .001) + 
		(Mathf.Abs(velocityLastFrame.z) * zFactor * .001); //TESTING REQUIRED
		audio.Play();			
		trigger.gameObject.rigidbody.AddForce(transform.up * ((Mathf.Abs(hitObjVelLastFrame.x) * xFactor) + 
		(Mathf.Abs(hitObjVelLastFrame.y) * yFactor) + (Mathf.Abs(hitObjVelLastFrame.z) * zFactor)) * forceMultiplier
			, ForceMode.Impulse);																																		
	}
}

function LateUpdate() 
{
	velocityLastFrame = gameObject.rigidbody.velocity;
}