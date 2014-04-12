//Reset.js

#pragma strict

//var winsound : AudioClip;

function OnTriggerEnter(trigger : Collider) 
{ 
	if(trigger.gameObject.tag == "Player")
	{
//		audio.pitch = 1;
//		audio.volume = .3;	
//		audio.PlayOneShot(winsound);
		PlayerPrefs.DeleteKey("LevelProgress");
		Application.LoadLevel(Application.loadedLevel);
	}
	
}		