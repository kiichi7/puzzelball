//BlobOneSurface.js

#pragma strict

var shadowProjector : Projector; // the shadow projector
//var shadowDistanceTolerance : float = 0.5; // positive number used to cast shadow on terrains correctly

//private var inTubeShadow : float = 0.1;//THE OLD
private var inTube : boolean = false;
private var hit : RaycastHit;
private var dist : float;            
//private var origNearClipPlane : float;
//private var origFarClipPlane : float;

private var ray : Ray;  // Direction rays
private var rayleft : Ray; //.............
private var rayright : Ray;//............
private var raytop : Ray; //..............
private var raybot : Ray; //..............
private var raytopleft : Ray; //..........
private var raytopright : Ray; //.........
private var raybotleft : Ray; //..........
private var raybotright : Ray; //.........

private var raymodleft : Vector3; // Direction Ray Size Modifier
private var raymodright : Vector3;//.............
private var raymodtop : Vector3; //...............
private var raymodbot : Vector3; //...............
private var raymodtopleft : Vector3; //..........
private var raymodtopright: Vector3; //.........
private var raymodbotleft : Vector3; //..........
private var raymodbotright: Vector3; //.........

private static var layerMapping: int[] = [
    /* 0*/ 0,
    /* 1*/ 0,
    /* 2*/ 0,
    /* 3*/ 0,
    /* 4*/ 0,
    /* 5*/ 0,
    /* 6*/ 0,
    /* 7*/ 0,
    /* 8*/ 0,
    /* 9*/ 0,
    /*10*/ ~((1 << 10) | (1 << 21) | (1 << 9)),
    /*11*/ ~((1 << 11) | (1 << 21) | (1 << 22) | (1 << 9)),
    /*12*/ ~((1 << 12) | (1 << 22) | (1 << 23) | (1 << 9)),
    /*13*/ ~((1 << 13) | (1 << 23) | (1 << 24) | (1 << 9)),
    /*14*/ ~((1 << 14) | (1 << 24) | (1 << 25) | (1 << 9)),
    /*15*/ ~((1 << 15) | (1 << 25) | (1 << 26) | (1 << 9)),
    /*16*/ ~((1 << 16) | (1 << 26) | (1 << 27) | (1 << 9)),
    /*17*/ ~((1 << 17) | (1 << 27) | (1 << 28) | (1 << 9)),
    /*18*/ ~((1 << 18) | (1 << 28) | (1 << 29) | (1 << 9)),
    /*19*/ ~((1 << 19) | (1 << 29) | (1 << 30) | (1 << 9)),
    /*20*/ ~((1 << 20) | (1 << 30) | (1 << 9)),
    /*21*/ ~((1 << 21) | (1 << 10) | (1 << 11) | (1 << 9)),
    /*22*/ ~((1 << 22) | (1 << 11) | (1 << 12) | (1 << 9)),
    /*23*/ ~((1 << 23) | (1 << 12) | (1 << 13) | (1 << 9)),
    /*24*/ ~((1 << 24) | (1 << 13) | (1 << 14) | (1 << 9)),
    /*25*/ ~((1 << 25) | (1 << 14) | (1 << 15) | (1 << 9)),
    /*26*/ ~((1 << 26) | (1 << 15) | (1 << 16) | (1 << 9)),
    /*27*/ ~((1 << 27) | (1 << 16) | (1 << 17) | (1 << 9)),
    /*28*/ ~((1 << 28) | (1 << 17) | (1 << 18) | (1 << 9)),
    /*29*/ ~((1 << 29) | (1 << 18) | (1 << 19) | (1 << 9)),
    /*30*/ ~((1 << 30) | (1 << 19) | (1 << 20) | (1 << 9)),
    /*31*/ 0
];


function ReturnIgnoreLayer(){ //I THINK THIS IS OBSOLETE!?!?
	return shadowProjector.ignoreLayers;}

function TubeToggle(){ //Accessed by balllogic.js //OBSOLETE
	inTube = !inTube;}
	

function Awake() {
	MediumShadowMod();
}

function Start() {
    if(!shadowProjector) shadowProjector = transform.GetComponentInChildren.<Projector>();
//    origNearClipPlane = shadowProjector.nearClipPlane;
//    origFarClipPlane = shadowProjector.farClipPlane;
}

function SmallShadowMod() {
	raymodleft = Vector3(.75,0,0);
	raymodright = Vector3(-.75,0,0);
	raymodtop = Vector3(0,0,.75);
	raymodbot = Vector3(0,0,-.75);
	raymodtopleft = Vector3(.54,0,.54);
	raymodtopright = Vector3(-.54,0,.54);
	raymodbotleft = Vector3(.54,0,-.54);
	raymodbotright = Vector3(-.54,0,-.54);
}

function MediumShadowMod() {
	raymodleft = Vector3(1.5,0,0);
	raymodright = Vector3(-1.5,0,0);
	raymodtop = Vector3(0,0,1.5);
	raymodbot = Vector3(0,0,-1.5);
	raymodtopleft = Vector3(1.05,0,1.05);
	raymodtopright = Vector3(-1.05,0,1.05);
	raymodbotleft = Vector3(1.05,0,-1.05);
	raymodbotright = Vector3(-1.05,0,-1.05);
}

function LargeShadowMod() {
	raymodleft = Vector3(3.5,0,0);
	raymodright = Vector3(-3.5,0,0);
	raymodtop = Vector3(0,0,3.5);
	raymodbot = Vector3(0,0,-3.5); 
	raymodtopleft = Vector3(2.46,0,2.46);
	raymodtopright = Vector3(-2.46,0,2.46);
	raymodbotleft = Vector3(2.46,0,-2.46);
	raymodbotright = Vector3(-2.46,0,-2.46);
}

function LateUpdate() {
    ray = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);
	rayleft = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodleft 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);
    rayright = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodright 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);
    raytop = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodtop 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);
    raybot = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodbot 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);        
    raytopleft = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodtopleft 
        	+ shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);       
    raytopright = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodtopright 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);                         
    raybotleft = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodbotleft 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);                                           
    raybotright = new Ray(transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodbotright 
            + shadowProjector.transform.forward.normalized,
            shadowProjector.transform.forward);                                                                              
   
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green);
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodleft
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green); 
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodright  
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green); 
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodtop 
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green); 
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodbot 
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green);               
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodtopleft
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green);                        
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodtopright
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green);  
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodbotleft
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green);        
//     Debug.DrawRay (transform.parent.position + Vector3.up * transform.parent.localScale.y * .45f + raymodbotright
//            + shadowProjector.transform.forward.normalized,
//            shadowProjector.transform.forward * 89, Color.green);             
                           
    
    if (Physics.Raycast (ray , hit, 89)) 
    {
//    Debug.Log("RAY" + hit.transform);
//    Debug.Log(LayerMask.LayerToName(hit.transform.gameObject.layer));
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
	    shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
	  
//    Debug.Log(shadowProjector.ignoreLayers);
    }
    else if (Physics.Raycast (rayleft , hit, 89)) 
    {
//    	Debug.Log("RAYLEFT" + hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
	 	shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
    else if (Physics.Raycast (rayright , hit, 89)) 
    {
//    Debug.Log("RAYRIGHT" + hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
	 	shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
    else if (Physics.Raycast (raytop , hit, 89)) 
    {
//    Debug.Log("RAYTOP" + hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
	  	shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
    else if (Physics.Raycast (raybot , hit, 89)) 
    {
//    Debug.Log("RAYBOT" + hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
	 	shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];	
    }
    else if (Physics.Raycast (raytopleft , hit, 89)) 
    {
//    Debug.Log("RAYTOPLEFT"+ hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
		shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
    else if (Physics.Raycast (raytopright , hit, 89)) 
    {
//    Debug.Log("RAYTOPRIGHT" + hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
		shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
    else if (Physics.Raycast (raybotleft , hit, 89)) 
    {
//    Debug.Log("RAYBOTLEFT"+ hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
		shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
    else if (Physics.Raycast (raybotright , hit, 89)) 
    {
//    Debug.Log("RAYBOTRIGHT"+ hit.transform);
	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
	  	shadowProjector.ignoreLayers = layerMapping[transform.parent.gameObject.layer];
    }
}







//LESS EFFICIENT FINAL VERSION

//    if (Physics.Raycast (ray , hit, 89)) 
//    //if (Physics.SphereCastAll (ray, .5, origFarClipPlane - origNearClipPlane,hit, ~shadowProjector.ignoreLayers))
//    {
////    Debug.Log("RAY" + hit.transform);
////    Debug.Log(LayerMask.LayerToName(hit.transform.gameObject.layer));
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));							
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));	
////    Debug.Log(~((1 << transform.parent.gameObject.layer)));
////    Debug.Log(shadowProjector.ignoreLayers);
//    }
//    else if (Physics.Raycast (rayleft , hit, 89)) 
//    {
////    	Debug.Log("RAYLEFT" + hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));		
//    }
//    else if (Physics.Raycast (rayright , hit, 89)) 
//    {
////    Debug.Log("RAYRIGHT" + hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));	
//    }
//    else if (Physics.Raycast (raytop , hit, 89)) 
//    {
////    Debug.Log("RAYTOP" + hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));	
//    }
//    else if (Physics.Raycast (raybot , hit, 89)) 
//    {
////    Debug.Log("RAYBOT" + hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));		
//    }
//    else if (Physics.Raycast (raytopleft , hit, 89)) 
//    {
////    Debug.Log("RAYTOPLEFT"+ hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));	
//    }
//    else if (Physics.Raycast (raytopright , hit, 89)) 
//    {
////    Debug.Log("RAYTOPRIGHT" + hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));		
//    }
//    else if (Physics.Raycast (raybotleft , hit, 89)) 
//    {
////    Debug.Log("RAYBOTLEFT"+ hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));	
//    }
//    else if (Physics.Raycast (raybotright , hit, 89)) 
//    {
////    Debug.Log("RAYBOTRIGHT"+ hit.transform);
//	    transform.parent.gameObject.layer = hit.transform.gameObject.layer;
//	    if(transform.parent.gameObject.layer == 10)
//			shadowProjector.ignoreLayers = ~((1 << 10) + (1 << 21) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 11)
//			shadowProjector.ignoreLayers = ~((1 << 11) + (1 << 21) + (1 << 22) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 12)
//			shadowProjector.ignoreLayers = ~((1 << 12) + (1 << 22) + (1 << 23) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 13)
//			shadowProjector.ignoreLayers = ~((1 << 13) + (1 << 23) + (1 << 24) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 14)
//			shadowProjector.ignoreLayers = ~((1 << 14) + (1 << 24) + (1 << 25) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 15)
//			shadowProjector.ignoreLayers = ~((1 << 15) + (1 << 25) + (1 << 26) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 16)
//			shadowProjector.ignoreLayers = ~((1 << 16) + (1 << 26) + (1 << 27) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 17)
//			shadowProjector.ignoreLayers = ~((1 << 17) + (1 << 27) + (1 << 28) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 18)
//			shadowProjector.ignoreLayers = ~((1 << 18) + (1 << 28) + (1 << 29) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 19)
//			shadowProjector.ignoreLayers = ~((1 << 19) + (1 << 29) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 20)
//			shadowProjector.ignoreLayers = ~((1 << 20) + (1 << 30) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 21)
//			shadowProjector.ignoreLayers = ~((1 << 21) + (1 << 10) + (1 << 11) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 22)
//			shadowProjector.ignoreLayers = ~((1 << 22) + (1 << 11) + (1 << 12) + (1 << 9));
//		else if(transform.parent.gameObject.layer == 23)
//			shadowProjector.ignoreLayers = ~((1 << 23) + (1 << 12) + (1 << 13) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 24)
//			shadowProjector.ignoreLayers = ~((1 << 24) + (1 << 13) + (1 << 14) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 25)
//			shadowProjector.ignoreLayers = ~((1 << 25) + (1 << 14) + (1 << 15) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 26)
//			shadowProjector.ignoreLayers = ~((1 << 26) + (1 << 15) + (1 << 16) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 27)
//			shadowProjector.ignoreLayers = ~((1 << 27) + (1 << 16) + (1 << 17) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 28)
//			shadowProjector.ignoreLayers = ~((1 << 28) + (1 << 17) + (1 << 18) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 29)
//			shadowProjector.ignoreLayers = ~((1 << 29) + (1 << 18) + (1 << 19) + (1 << 9));	
//		else if(transform.parent.gameObject.layer == 30)
//			shadowProjector.ignoreLayers = ~((1 << 30) + (1 << 19) + (1 << 20) + (1 << 9));	
////		else if(transform.parent.gameObject.layer == 9)
////			shadowProjector.ignoreLayers = ~((32767 << 9));	
//    }



//OLDER ATTEMPT AT MAKING SHADOWS WORK GOOD


//    if (Physics.Raycast (ray , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    //if (Physics.SphereCastAll (ray, .5, origFarClipPlane - origNearClipPlane,hit, ~shadowProjector.ignoreLayers))
//    {
//   	//Debug.Log(hit.distance);
////   	Debug.Log(ray.direction);
////   	Debug.Log(Vector3.Angle(Vector3.down,hit.normal));
////   	Debug.Log((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+38);
////   	Debug.DrawLine(hit.point,hit.normal);
//
////		if(inTube)                                   //THE OLD
////			shadowDistanceTolerance = inTubeShadow;	//THE OLD
////		else										//THE OLD
////   			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+38;//THE OLD
//
////   		Debug.Log((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37);
////    	if(hit.distance >= 4)
////    		shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+39;
////    	  //shadowDistanceTolerance = 10;
////    	else 
////    	  shadowDistanceTolerance = 2.5;//hit.distance * .05 + 2;
//    	 
//        
////		  Debug.Log(dist);
//        
////        if(inTube)
////        shadowProjector.nearClipPlane = 7.8;
////        else
//
////        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);//THE OLD
//        
////		  dist = 12 for large ball
////        if(dist >= 10)
////        shadowProjector.nearClipPlane = 11;//value higher than 12
////        else
////        shadowProjector.nearClipPlane = origNearClipPlane;
//        
////        shadowProjector.farClipPlane = dist + shadowDistanceTolerance; //THE OLD
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 5;
////			if(dist > 
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        
//        //Debug.Log("Ray hit at: " + hit.point + ", distance: " + dist);
//    }
//    else if (Physics.Raycast (rayleft , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
////    	if(hit.distance >= 4)
////    	  shadowDistanceTolerance = 13;
////    	else 
////    	  shadowDistanceTolerance = 2.5;//hit.distance * .05 + 2;
//    	
//    	
////    	if(inTube)
////			shadowDistanceTolerance = inTubeShadow;
////		else	
////   			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+38;
////        dist = hit.distance + origNearClipPlane;
////        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);
////        shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//
//    }
//    else if (Physics.Raycast (rayright , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//    
//    }
//    else if (Physics.Raycast (raytop , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//	
//    }
//    else if (Physics.Raycast (raybot , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//    }
//    else if (Physics.Raycast (raytopleft , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//    }
//    else if (Physics.Raycast (raytopright , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//    }
//    else if (Physics.Raycast (raybotleft , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//    }
//    else if (Physics.Raycast (raybotright , hit, origFarClipPlane - origNearClipPlane, ~shadowProjector.ignoreLayers)) 
//    {
//        dist = hit.distance + (transform.position.y - transform.parent.position.y - 
//        		transform.parent.localScale.y * .45f); //origNearClipPlane;
////        shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
//        if(inTube)
//        {
//        	shadowDistanceTolerance = .1;
////			shadowProjector.nearClipPlane = dist - .05;
////			shadowProjector.farClipPlane = dist + .05;
//		}
//		else
//		{ 
////			shadowDistanceTolerance = 1;
//			shadowDistanceTolerance = ((-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+80)*.05;
////			shadowDistanceTolerance = (-18.0 / 90)*(Vector3.Angle(ray.direction,hit.normal))+37.3;
////			shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance, 0);	
////			shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//        }
//        shadowProjector.nearClipPlane = Mathf.Max(dist - shadowDistanceTolerance , 
//        		transform.position.y - transform.parent.position.y - transform.parent.localScale.y * .45f);	
//		shadowProjector.farClipPlane = dist + shadowDistanceTolerance;
//    }
//    else
//    {
//    	shadowDistanceTolerance = 0;
//    	shadowProjector.nearClipPlane = 0;
//        shadowProjector.farClipPlane = 0;
//    }	
//}