#pragma strict

var movePosition : Vector3[];
var speed : int;
private var positionIndex : int = 0;

function Update () {
	if(transform.position == movePosition[positionIndex]){
		if(movePosition.Length == positionIndex + 1)
			positionIndex = 0;
		else positionIndex++;			
			
	}
//	Debug.Log(positionIndex);		
	transform.position = Vector3.MoveTowards(transform.position, movePosition[positionIndex], speed * Time.deltaTime);
}