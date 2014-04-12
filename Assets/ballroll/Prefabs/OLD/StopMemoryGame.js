//StopMemoryGame.js

#pragma strict

//private var MemoryGameStop : boolean = false;
//var MemStopMaterial : Material;
//var DefaultMaterial : Material; 
var ToDisable : GameObject[]; 
var ToEnable : GameObject[]; 

//function OnCollisionEnter(collision : Collision)
//{
function OnTriggerEnter(trigger : Collider){
	if(trigger.gameObject.tag == "Player"){//Ball Touches a Floor
		//if(collision.gameObject.tag == "Player")//Ball Touches a Floor
//		MemoryGameStop = false;
//		renderer.material = DefaultMaterial;
//		collision.gameObject.GetComponent(balllogic).StopMemoryGame(); 	
		
		for(memObject in ToDisable){
			memObject.SetActive(false);
		}
		for(memObject in ToEnable){
			memObject.SetActive(true);
		}	
		
		gameObject.SetActive(false);
	}	
}

//function EnableScript() {
//	MemoryGameStop = true;
//	renderer.material = MemStopMaterial;
//}