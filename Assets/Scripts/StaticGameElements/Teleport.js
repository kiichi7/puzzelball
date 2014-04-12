//Teleport.js

#pragma strict
//var otherPortal : Transform;
//private var normal : Vector3; 
var spawnpos : Vector3;
//public var ignoreTime : float = 1;

function OnTriggerEnter(c : Collider) 
{ 
	if(c.gameObject.tag == "Player")
	{	
		c.gameObject.transform.position = spawnpos;	
//        c.transform.localEulerAngles += Quaternion.LookRotation(otherPortal.forward).eulerAngles;
//        c.transform.position = otherPortal.TransformDirection(Vector3.Reflect(c.transform.position - transform.position, c.transform.forward)) + otherPortal.position;
//        c.rigidbody.velocity = otherPortal.TransformDirection(c.transform.InverseTransformDirection(Vector3.Reflect(c.rigidbody.velocity,c.transform.forward)));
//        Physics.IgnoreCollision(c.collider,otherPortal.collider,true);
//        yield WaitForSeconds(ignoreTime);
//        Physics.IgnoreCollision(c.collider,otherPortal.collider,false);
    }

	
	
	else if(c.gameObject.tag == "ENEMY")
	{
		c.gameObject.transform.position = spawnpos;
		//trigger.gameObject.rigidbody.velocity = Vector3(0,0,0);
	}
}		


//trigger.transform.position = otherPortal.transform.position; //+ Vector3.up * 2;
//		var velocity : Vector3 = trigger.rigidbody.velocity;
//		velocity = Vector3.Reflect(velocity,trigger.transform.forward);
//		velocity = transform.InverseTransformDirection(velocity);
//		velocity = otherPortal.transform.TransformDirection(velocity);
//		trigger.rigidbody.velocity = velocity;
//				//trigger.gameObject.transform.position = spawnpos;
//		//trigger.gameObject.rigidbody.velocity = Vector3(0,0,0);