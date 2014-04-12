//ProgressUnlock.js

#pragma strict

private var memObject : GameObject;
var ProgressLevel : int;
var ToEnable : GameObject[]; 
var ToDisable : GameObject[]; 


function Start () {
	if(PlayerPrefs.GetInt("LevelProgress",1) >= ProgressLevel){
			
		for(memObject in ToDisable){
			memObject.SetActive(false);
		}
		for(memObject in ToEnable){
			memObject.SetActive(true);	
		}		
	}
}

