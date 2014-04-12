//EnemyAggroToggle.js

#pragma strict

function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player"){
		gameObject.SendMessageUpwards("GetAggroObjRef", trigger.transform);
		gameObject.SendMessageUpwards("AggroToggle");
	}
}

function OnTriggerExit(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player"){
		gameObject.SendMessageUpwards("AggroToggle");
		//gameObject.SendMessageUpwards("GetAggroObjRef", null);
	}		
		
}
