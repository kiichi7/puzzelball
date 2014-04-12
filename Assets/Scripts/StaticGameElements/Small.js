//Small.js

#pragma strict

var pickup : AudioClip;
function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player" && trigger.gameObject.transform.localScale != Vector3(1.5,1.5,1.5))//Ball Collide Small
		{
			//Debug.Log("in");
			trigger.gameObject.GetComponent(balllogic).pickupsnd.pitch = 1;
			trigger.gameObject.GetComponent(balllogic).pickupsnd.volume = .7;
			trigger.gameObject.GetComponent(balllogic).pickupsnd.PlayOneShot(pickup);
			trigger.gameObject.transform.localScale = Vector3(1.5,1.5,1.5);
			trigger.gameObject.rigidbody.mass = .7;
			trigger.gameObject.GetComponentInChildren(Projector).nearClipPlane = 7.64;
			trigger.gameObject.GetComponentInChildren(Projector).farClipPlane = 96.74;
//			trigger.gameObject.GetComponentInChildren(Projector).fieldOfView = 12;
			trigger.gameObject.GetComponentInChildren(BlobOneSurface).SmallShadowMod();
		}
	else if(trigger.gameObject.tag == "ENEMY" && trigger.gameObject.transform.localScale != Vector3(1.5,1.5,1.5))//ENEMY Collide Small
	{
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.pitch = 1;
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.volume = .7;
			trigger.gameObject.GetComponent(BallLogicEnemy).pickupsnd.PlayOneShot(pickup);
			trigger.gameObject.transform.localScale = Vector3(1.5,1.5,1.5);
			trigger.gameObject.GetComponent(BallLogicEnemy).aggroChild.transform.localScale = Vector3(2,2,2);
			trigger.gameObject.rigidbody.mass = .7;
			trigger.gameObject.GetComponentInChildren(Projector).nearClipPlane = 7.64;
			trigger.gameObject.GetComponentInChildren(Projector).farClipPlane = 96.74;
//			trigger.gameObject.GetComponentInChildren(Projector).fieldOfView = 45;
			trigger.gameObject.GetComponentInChildren(BlobOneSurface).SmallShadowMod();
			//collision.gameObject.rigidbody.AddForce(Vector3.down * 1);
	}		
}