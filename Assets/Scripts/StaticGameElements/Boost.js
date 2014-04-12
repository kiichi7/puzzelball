//Boost.js

#pragma strict

var force : int;

function OnTriggerEnter(collision : Collider)
{
	if(collision.gameObject.tag == "Player")//Ball Collides Boost 
		{	
			collision.gameObject.rigidbody.AddForce(transform.forward * -force, ForceMode.Impulse);
		}
	if(collision.gameObject.tag == "ENEMY")//Ball Collides Boost 
		{	
			collision.gameObject.rigidbody.AddForce(transform.forward * -force, ForceMode.Impulse);
		}	
}