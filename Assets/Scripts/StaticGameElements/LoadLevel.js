//LoadLevel.js

#pragma strict

var LoadLevel : int;

function Start()
{
	if(PlayerPrefs.GetInt("LevelProgress",1) > LoadLevel){
			renderer.material.color = Color.green;
		}
}

function OnTriggerEnter(trigger : Collider)
{
	if(trigger.gameObject.tag == "Player")
	{
		if(PlayerPrefs.GetInt("LevelProgress",1) >= LoadLevel){
			Application.LoadLevel(LoadLevel);
		}
		
		//if saved level progress >= loadlevel , load!!!
	}
}