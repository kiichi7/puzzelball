//LoadMenu.js

#pragma strict

function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player")
	{
		Application.LoadLevel(0);
	}
}