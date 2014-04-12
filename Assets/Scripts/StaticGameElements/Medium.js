//Medium.js

#pragma strict

var pickup : AudioClip;
function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player" && trigger.gameObject.transform.localScale != Vector3(3,3,3))//Ball Collide Medium
		{
			trigger.gameObject.GetComponent(balllogic).pickupsnd.pitch = 1;
			trigger.gameObject.GetComponent(balllogic).pickupsnd.volume = .7;
			trigger.gameObject.GetComponent(balllogic).pickupsnd.PlayOneShot(pickup);
			trigger.gameObject.transform.localScale = Vector3(3,3,3);
			trigger.gameObject.rigidbody.mass = 1;
			trigger.gameObject.GetComponentInChildren(Projector).nearClipPlane = 15.9;
			trigger.gameObject.GetComponentInChildren(Projector).farClipPlane = 105;
//			trigger.gameObject.GetComponentInChildren(Projector).fieldOfView = 20;
			trigger.gameObject.GetComponentInChildren(BlobOneSurface).MediumShadowMod();
		}
	else if(trigger.gameObject.tag == "ENEMY" && trigger.gameObject.transform.localScale != Vector3(3,3,3))//ENEMY Collide Medium
	{
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.pitch = 1;
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.volume = .7;
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.PlayOneShot(pickup);
			trigger.gameObject.transform.localScale = Vector3(3,3,3);
			trigger.gameObject.GetComponent(BallLogicEnemy).aggroChild.transform.localScale = Vector3(1,1,1);
			trigger.gameObject.rigidbody.mass = 1;
			trigger.gameObject.GetComponentInChildren(Projector).nearClipPlane = 15.9;
			trigger.gameObject.GetComponentInChildren(Projector).farClipPlane = 105;
//			trigger.gameObject.GetComponentInChildren(Projector).fieldOfView = 45;
			trigger.gameObject.GetComponentInChildren(BlobOneSurface).MediumShadowMod();
			//collision.gameObject.rigidbody.AddForce(Vector3.down * 1);
	}			
}