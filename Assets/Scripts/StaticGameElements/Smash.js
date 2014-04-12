//smash.js

#pragma strict

function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player")//Ball Collides With Smash
	{	
//	Debug.Log("HIT");
		trigger.gameObject.GetComponent(balllogic).IncDecSmashVar(true);																														
	}
	else if(trigger.gameObject.tag == "ENEMY")//Enemy Collides With Smash
	{
		trigger.gameObject.GetComponent(BallLogicEnemy).IncDecSmashVar(true);																														
	}
}

function OnTriggerExit(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player")//Ball Collides With Smash
	{
//	n Debug.Log("EXIT");
		trigger.gameObject.GetComponent(balllogic).IncDecSmashVar(false);																														
	}
	else if(trigger.gameObject.tag == "ENEMY")//Enemy Collides With Smash
	{
		trigger.gameObject.GetComponent(BallLogicEnemy).IncDecSmashVar(false);																														
	}
}
