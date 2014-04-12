
//9/12/13
//Demo almost complete
//fixin bugs
//AI collision detection bug
//layer fixes

//9/2/13
//Level 10 done
//Convert shadow script to static readonly array version DONE
//Make win Image full screen DONE
//Add congradulations to hub level MAKE NEW SCRIPT FOR PROGRESS UNLOCKS DONE DONE DONE DONE!!!
//LEFT TO DO
//Add incompetech music, credits in hub level

//8/19/13
//Worked on level 10
//

//8/18/13
//Worked on level 10

//8/12/13
//UPDATED 2D level textures, added mouse snap tip in hublevel

//8/12/13 1:... AM
//Changing wall physic material worked to prevent rolling up walls, BUT the game is no longer "ergonomic". The ball rotation speed is too fast
//fast so it's visually displeasing and the movement feels erratic. Perhaps I'm just not a master of the physics system yet, but fun and enjoyable
//controls trump realism every time, so i'm stuck with continous hit sound on angled floors. Modifying sound generation may help. 
//The slowdown on inclines actually "feels" realistic though since you'd expect to be slower on inclines so that works out.  

//8/11/13
//Different torque drags for sizes worked decently... but ball bounces too high when colliding with a wall because of the torque force...
//and climbs up floors...No way to fix wall bouncing without tweaking torque velocity which breaks max speed, and forcing a high minimum wall 
//height is not feasible for level design... MUST CONVERT BACK...

//8/8/13
//Converting to AddTorque for ground controls is a failure, can't recreate same max speeds as before.  
//May need solution for angled floors and continous hit sound, or just compromise.
//FINISH LEVEL 10
//CHECK ALL LEVELS
//FINISH HUB LEVEL

//7/28/2013	
//FINISH LEVEL 10
//CHECK ALL LEVELS
//FINISH HUB LEVEL


//7/27/2013
//FIX SPRING		7/28 REVERTED TO ORIGINAL SOLUTION AGAIN, MODIFIED PREFAB -> WALLS UNDER AND ON SIDE, FLOOR ON TOP OF SIDES, WORKS GOOD!!!
//FIX CAMERA SNAP   7/28 DONE!!!!


//7/18/2013
//IMPLEMENT SPRING FUNCTION USING ANGLE OF ROTATION AS WELL  DONE SORTA!!!
//WRITE CAMERA SNAP SCRIPT 
//FINISH LEVEL 10
//CHECK ALL LEVELS
//FINISH HUB LEVEL
//PROFIT!!!


//4/29/13
//FINISH IMPLEMENTING MOTION SCRIPT
//ADJUST SWITCHES IN RELATION TO MOTION SCRIPT

//3/26/13
//New teleport functionality DISCARDED
//Enemy change size functionality  DONE!!!

//2/19/13
//TODO
//ADD TRIPLE LAYER FUNCTIONALITY, ADD CHECK FOR TOPMOST LAYER RAY HIT LAYER AND ASSIGN TO BALL

//2/11/13
//TODO
//ADD A SHADOW LAYER THAT ACCEPTS ALL LAYERS DONE!!!

//2/10/13
//TWEAKED BALL, ENEMY COLLIDER SIZE FOR NO RAYMOD COLLISIONS. RAY CODE FIXES.

//2/9/13
//BEGAN LEVEL 8
//TODO 2/10/13 DONE
//TWEAK RAYMOD SO RAY DOES NOT COLLIDE WITH BALL, MOSTLY DIAGONALS!!! ALL SIZES!!! 

//2/7/13
//TAP SYSTEM IMPLEMENTED.


//TODOLIST 1/8/13
//TWEAK TUBE LEVEL 6 //DONE
//SHADOW LAYERS LEVELS 3,4,5,6 // DONE
//RENDER SETTINGS LEVEL 7 //DONE
//TWEAK TUBE LEVEL 1,2 //DONE


//TUBE SHADOW TWEAKING,GENERAL SHADOW TWEAKING   DONE?
//AIR MOVEMENT TWEAKING  


//LEVEL MAKING INSTRUCTION
//EVERY LEVEL: DELETE CAMERA, PLACE MAIN CAMERA PREFAB, PLACE BALL, DRAG BALL PREFAB TO CAMERA REFERENCE FOLLOW AND FADE
//PLACE WIN PREFAB, DRAG TO PLACED EXIT REFERENCE SPOT
//AFTER LEVEL COMPLETE, ASSIGN SHADOW LAYERS ACCORDINGLY
//FOR EVERY TUBE PLACEMENT TOUCHING FLOOR, PLACE SHADOW ABSORB PADS ACCORDINGLY
//

