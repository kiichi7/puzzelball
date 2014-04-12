var target : Transform;
var distance = 10.0;

var xSpeed = 250.0;
var ySpeed = 120.0;

var yMinLimit = -20;
var yMaxLimit = 80;

private var rotation;
private var position;

private var x = 0.0;
private var y = 0.0;
private var keyPressed : boolean = false;

@script AddComponentMenu("Camera-Control/Mouse Orbit")

function Start () {
    var angles = transform.eulerAngles;
    x = angles.y;
    y = angles.x;

	// Make the rigid body not change rotation
   	if (rigidbody)
		rigidbody.freezeRotation = true;
	
	Screen.showCursor = false;		//ADDED THIS
}

function Update (){
	
	if(Input.GetMouseButtonDown(0)) //CAMERA SNAP CODE ADDED
	{
		keyPressed = true;
	}
}

function LateUpdate () {
    if (target) {
        x += Input.GetAxis("Mouse X") * xSpeed * 0.02;
        y -= Input.GetAxis("Mouse Y") * ySpeed * 0.02;
 		
 		y = ClampAngle(y, yMinLimit, yMaxLimit);
 		      
 		if(keyPressed)  //CAMERA SNAP CODE ADDED
		{
	//		Debug.Log((transform.rotation.y <= 225) && (transform.rotation.y > 135));
			if((transform.eulerAngles.y <= 225) && (transform.eulerAngles.y > 135)){
	//			transform.eulerAngles = Vector3(0,180,0); Debug.Log("180");
//				rotation = Quaternion.Euler(transform.eulerAngles.x, 180, transform.eulerAngles.z); x = 0.0; y = 0.0;
				x = 180.0;
			}
				
			else if((transform.eulerAngles.y <= 135) && (transform.eulerAngles.y > 45)){
	//			transform.eulerAngles = Vector3(0,90,0); Debug.Log("90");
				x = 90.0;
			}
				
			else if((transform.eulerAngles.y <= 315) && (transform.eulerAngles.y > 225)){
	//			transform.eulerAngles = Vector3(0,270,0); Debug.Log("270");
				x = 270.0;
			}	
							
			else {
	//				transform.eulerAngles = Vector3(0,0,0);Debug.Log("0");
					x = 0.0;
				 }	
			
			keyPressed = false;		
		}       
// 		else {         
        		rotation = Quaternion.Euler(y, x, 0);
//        	 }	
        		
        position = rotation * Vector3(0.0, 0.0, -distance) + target.position;
        
        transform.rotation = rotation;
        transform.position = position;
    
   
	    
    }
}

static function ClampAngle (angle : float, min : float, max : float) {
	if (angle < -360)
		angle += 360;
	if (angle > 360)
		angle -= 360;
	return Mathf.Clamp (angle, min, max);
}