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
		
//		Debug.Log(zFactor);
//		Debug.Log(transform.up * ((Mathf.Abs(velproject.x) * xFactor) + 
//		(Mathf.Abs(velproject.y) * yFactor) + (Mathf.Abs(velproject.z) * zFactor)) * forceMultiplier);
//		Debug.Log(Vector3.Project(hitObjVelLastFrame,transform.up));
//		Debug.Log(Vector3.Project(Vector3((Mathf.Abs(hitObjVelLastFrame.x) * xFactor),(Mathf.Abs(hitObjVelLastFrame.y) * yFactor),
//		(Mathf.Abs(hitObjVelLastFrame.z) * zFactor)),transform.up) * forceMultiplier);
		
//		Debug.DrawLine(transform.position,(transform.position + Vector3.Project(Vector3((Mathf.Abs(hitObjVelLastFrame.x) * xFactor),(Mathf.Abs(hitObjVelLastFrame.y) * yFactor),
//		(Mathf.Abs(hitObjVelLastFrame.z) * zFactor)),transform.up) * forceMultiplier) , Color.white, 9999); 
		
		
		
//		var temp : Vector3 = Vector3.Project(Vector3((Mathf.Abs(hitObjVelLastFrame.x) * xFactor),(Mathf.Abs(hitObjVelLastFrame.y) * yFactor),
//		(Mathf.Abs(hitObjVelLastFrame.z) * zFactor)),transform.up);
		
//		Debug.Log(transform.up * (temp.x + temp.y + temp.z) * forceMultiplier);
		
//		trigger.gameObject.rigidbody.AddForce(transform.up * (temp.x + temp.y + temp.z) * forceMultiplier, ForceMode.Impulse);
		var velproject : Vector3 = Vector3.Project(hitObjVelLastFrame,transform.up);
//		Debug.Log(trigger.contacts[0].point);
//		reflectDir = Vector3.Reflect (hitObjVelLastFrame.normalized, trigger.contacts[0].normal);
//		Debug.DrawLine(transform.position, transform.position - hitObjVelLastFrame, Color.white, 9999);
//		Debug.DrawLine(transform.position, transform.position + reflectDir*30, Color.black, 9999);
//		var tempx : Vector3 = Vector3.Project(Vector3(hitObjVelLastFrame.x * xFactor,0,0),transform.up);
//		var tempy : Vector3 = Vector3.Project(Vector3(0,hitObjVelLastFrame.y * yFactor,0),transform.up);
//		var tempz : Vector3 = Vector3.Project(Vector3(0,0,hitObjVelLastFrame.z * zFactor),transform.up);
//		Debug.Log(tempx + "TEMPX" + " " + velproject + " " + "VELPROJECT");
//		Debug.Log(tempx + tempy + tempz + " temps");
//		Debug.Log(transform.up * ((Mathf.Abs(velproject.x) * xFactor) + 
//		(Mathf.Abs(velproject.y) * yFactor) + (Mathf.Abs(velproject.z) * zFactor)) );
		
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
		
//		Debug.Log(yFactor);
//		Debug.Log(transform.up * ((Mathf.Abs(velocityLastFrame.x) * xFactor) + 
//		(Mathf.Abs(velocityLastFrame.y) * yFactor) + (Mathf.Abs(velocityLastFrame.z) * zFactor)) * forceMultiplier);
		
		trigger.gameObject.rigidbody.AddForce(transform.up * ((Mathf.Abs(hitObjVelLastFrame.x) * xFactor) + 
		(Mathf.Abs(hitObjVelLastFrame.y) * yFactor) + (Mathf.Abs(hitObjVelLastFrame.z) * zFactor)) * forceMultiplier
			, ForceMode.Impulse);
			
			
			
		//yVelocity = trigger.gameObject.GetComponent(BallLogicEnemy).ReturnVelocityLastFrame();
//		Debug.Log(yVelocity);	
//		if(Mathf.Abs(trigger.gameObject.rigidbody.velocity.y) > 0)
//		{
//			Debug.Log(trigger.gameObject.rigidbody.velocity.y);
			//audio.volume = (Mathf.Abs(yVelocity) * .0009);
			//audio.Play();
			//trigger.gameObject.rigidbody.AddForce(transform.up * (-yVelocity * forceMultiplier)//trigger.gameObject.rigidbody.mass
			//	, ForceMode.Impulse);
//		}
																																
	}
}

function LateUpdate() 
{
	velocityLastFrame = gameObject.rigidbody.velocity;
//	semaphoreLastFrame = onFloorSemaphore;
}