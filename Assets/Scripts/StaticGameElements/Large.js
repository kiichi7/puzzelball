//Large.js

#pragma strict

var pickup : AudioClip;
function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player" && trigger.gameObject.transform.localScale != Vector3(7,7,7))//Ball Collide Large
	{
			trigger.gameObject.GetComponent(balllogic).pickupsnd.pitch = 1;
			trigger.gameObject.GetComponent(balllogic).pickupsnd.volume = .7;
			trigger.gameObject.GetComponent(balllogic).pickupsnd.PlayOneShot(pickup);
			trigger.gameObject.transform.localScale = Vector3(7,7,7);
			trigger.gameObject.rigidbody.mass = 2;
			trigger.gameObject.GetComponentInChildren(Projector).nearClipPlane = 37.9;
			trigger.gameObject.GetComponentInChildren(Projector).farClipPlane = 127;
//			trigger.gameObject.GetComponentInChildren(Projector).fieldOfView = 45;
			trigger.gameObject.GetComponentInChildren(BlobOneSurface).LargeShadowMod();
			//collision.gameObject.rigidbody.AddForce(Vector3.down * 1);
	}
	else if(trigger.gameObject.tag == "ENEMY" && trigger.gameObject.transform.localScale != Vector3(7,7,7))//ENEMY Collide Large
	{
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.pitch = 1;
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.volume = .7;
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.PlayOneShot(pickup);
			trigger.gameObject.transform.localScale = Vector3(7,7,7);
			trigger.gameObject.GetComponent(BallLogicEnemy).aggroChild.transform.localScale = Vector3(3.0/7,3.0/7,3.0/7);
			trigger.gameObject.rigidbody.mass = 2;
			trigger.gameObject.GetComponentInChildren(Projector).nearClipPlane = 37.9;
			trigger.gameObject.GetComponentInChildren(Projector).farClipPlane = 127;
//			trigger.gameObject.GetComponentInChildren(Projector).fieldOfView = 45;
			trigger.gameObject.GetComponentInChildren(BlobOneSurface).LargeShadowMod();
			//collision.gameObject.rigidbody.AddForce(Vector3.down * 1);
	}
}