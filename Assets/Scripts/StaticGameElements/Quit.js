//Quit.js

#pragma strict

function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player")
	{
		Application.Quit();
	}
}