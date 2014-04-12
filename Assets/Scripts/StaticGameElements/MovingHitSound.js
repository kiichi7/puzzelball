#pragma strict

private var velocityLastFrame : Vector3;
private var collisionNormal : Vector3;
private var xAxisAngle : float;
private var xFactor : float;
private var yAxisAngle : float;
private var yFactor : float;
private var zAxisAngle : float;
private var zFactor : float;

function OnCollisionEnter(collision : Collision)
{
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
	
	audio.pitch = 1;
	audio.Play();
}	

function LateUpdate() 
{
	velocityLastFrame = gameObject.rigidbody.velocity;
//	semaphoreLastFrame = onFloorSemaphore;
}