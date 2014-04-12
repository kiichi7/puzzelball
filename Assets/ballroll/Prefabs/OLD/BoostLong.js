//BoostLong.js

#pragma strict

var force : int;

function OnTriggerEnter(collision : Collider)
{
	if(collision.gameObject.tag == "Player")//Ball Collides Boost 
		{	
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.1,ForceMode.Impulse);
//			Debug.Log("1");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.2,ForceMode.Impulse);
//			Debug.Log("2");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.3,ForceMode.Impulse);
//			Debug.Log("3");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.4,ForceMode.Impulse);
//			Debug.Log("4");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.5,ForceMode.Impulse);
//			Debug.Log("5");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.6,ForceMode.Impulse);
//			Debug.Log("6");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.7,ForceMode.Impulse);
//			Debug.Log("7");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.8,ForceMode.Impulse);
//			Debug.Log("8");
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*.9,ForceMode.Impulse);
//			Debug.Log("9");Debug.Log(collision.gameObject.rigidbody.velocity);
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*1,ForceMode.Impulse);
//			Debug.Log("10");Debug.Log(collision.gameObject.rigidbody.velocity);
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*1,ForceMode.Impulse);
//			Debug.Log("11");Debug.Log(collision.gameObject.rigidbody.velocity);
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*1,ForceMode.Impulse);
//			Debug.Log("12");Debug.Log(collision.gameObject.rigidbody.velocity);
			yield WaitForSeconds(.1);
			collision.gameObject.rigidbody.AddForce(transform.forward * -force*1,ForceMode.Impulse);
//			Debug.Log("13");Debug.Log(collision.gameObject.rigidbody.velocity);
		}	
}