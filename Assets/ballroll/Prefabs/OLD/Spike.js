#pragma strict

function OnCollisionEnter(collision : Collision)
{
	if(collision.gameObject.tag == "Player")//Ball Collides With Spikes
	{	
		Application.LoadLevel(Application.loadedLevel);																													
	}
	else if(collision.gameObject.tag == "ENEMY")//Enemy Collides With Spikes
	{
		Destroy(gameObject);																														
	}
}