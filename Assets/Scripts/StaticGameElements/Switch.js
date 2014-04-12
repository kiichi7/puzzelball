//Switch.js

#pragma strict

private var memObject : GameObject;
//private var animState : AnimationState;
private var isSwitched : boolean = false; 
private var color : Color;
var ToDisable : GameObject[]; 
var ToEnable : GameObject[]; 
var animationDisable : GameObject[];
var animationEnable : GameObject[]; 

function Awake(){
	color = renderer.material.color;//STORE INITIAL COLOR TO RESTORE LATER
}

function OnTriggerEnter(trigger : Collider) 
{ 
	if(((trigger.gameObject.tag == "Player") || (trigger.gameObject.tag == "ENEMY")) && (isSwitched == false))
	{
		isSwitched = true;
		renderer.material.color = Color.black;
		
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
	else if((trigger.gameObject.tag == "Player") || (trigger.gameObject.tag == "ENEMY"))
	{
	 	isSwitched = false;
		renderer.material.color = color;
		
		for(memObject in ToDisable){
			memObject.SetActive(true);
		}
		for(memObject in ToEnable){
			memObject.SetActive(false);
		}
		for(memObject in animationDisable){
			for(var animState : AnimationState in memObject.animation){
				animState.speed = 1;
			}  
		}	
		for(memObject in animationEnable){
			for(var animState : AnimationState in memObject.animation){
				animState.speed = 0;
			}  
		}	
	}	
}		