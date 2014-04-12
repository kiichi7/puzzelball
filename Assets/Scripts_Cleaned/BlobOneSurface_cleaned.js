//BlobOneSurface.js

#pragma strict

var shadowProjector : Projector; // the shadow projector

private var inTube : boolean = false;
private var hit : RaycastHit;
private var dist : float;            

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







