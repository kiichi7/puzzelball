//WinScript.js

#pragma strict

var winsound : AudioClip;
var win : GUITexture;
var NextLevel : int; //Next Level
private var isExit : boolean; //Have you activated exit yet?

function OnTriggerEnter(trigger : Collider) 
{ 
	//Win Code
	if(trigger.gameObject.tag == "Player" && !isExit)
	{
		isExit = true;
		//Time.timeScale = 0;
		audio.pitch = 1;
//		audio.volume = .2;	
		audio.PlayOneShot(winsound);
		win.guiTexture.pixelInset.x = Screen.width * -.5;
		win.guiTexture.pixelInset.y = Screen.height * -.5;
		win.guiTexture.pixelInset.width = Screen.width;
		win.guiTexture.pixelInset.height = Screen.height;
		win.enabled = true;
		if(PlayerPrefs.GetInt("LevelProgress",1) < NextLevel)
			PlayerPrefs.SetInt("LevelProgress", NextLevel);
		//if saved level progress < next level, saved level progress = next level
		//win.
		trigger.gameObject.tag = "Untagged";
		trigger.gameObject.GetComponent.<balllogic>().enabled = false;
		yield WaitForSeconds(2);
		Application.LoadLevel(0);
	}
	
}		