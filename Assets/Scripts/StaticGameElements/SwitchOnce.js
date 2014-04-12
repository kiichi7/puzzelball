//SwitchOnce.js

#pragma strict

private var memObject : GameObject;
private var isSwitched : boolean = false; 
//var isMemory : boolean;
//var MemStopGameObj : StopMemoryGame; //REFERENCE TO STOPMEMORYGAME OBJECT
var ToDisable : GameObject[]; 
var ToEnable : GameObject[]; 
var animationDisable : GameObject[];
var animationEnable : GameObject[]; 

function OnTriggerEnter(trigger : Collider) 
{ 
	if(((trigger.gameObject.tag == "Player") || (trigger.gameObject.tag == "ENEMY"))  && (isSwitched == false))
	{
		isSwitched = true;
		renderer.material.color = Color.black;
		
//		if(isMemory){
//			trigger.gameObject.GetComponent(balllogic).StartMemoryGame(); 
//			//MemStopGameObj.GetComponent(StopMemoryGame).EnableScript();
//			MemStopGameObj.EnableScript();	
//		}
		
		for(memObject in ToDisable){
			memObject.SetActive(false);
		}
		for(memObject in ToEnable){
			memObject.SetActive(true);
		}
		for(memObject in animationDisable){
			for(var animState : AnimationState in memObject.animation){
				animState.speed = 0;
			}  
		}	
		for(memObject in animationEnable){
			for(var animState : AnimationState in memObject.animation){
				animState.speed = 1;
			}  
		}	
	}	
}		