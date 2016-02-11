#pragma strict
static var player1Score : int = 0;
static var player2Score : int = 0;
var theSkin:GUISkin;
private var myBall : Transform;
function Start()
{
	myBall = GameObject.FindGameObjectWithTag("Ball").transform;
}
static function UpdateScore (wallName:String) {
	if(wallName == "leftWall")
	{
		player2Score += 1;
	}
	else if(wallName == "rightWall")
	{
		player1Score += 1;
	}
}
function OnGUI()
{
	GUI.skin = theSkin;
	GUI.Label(new Rect(Screen.width / 2 - Screen.width / 16 - 40,
				 Screen.height - Screen.height/8, 80,Screen.height / 10),
		""+player1Score);
	GUI.Label(new Rect(Screen.width / 2 + Screen.width / 16 - 40, 
				Screen.height - Screen.height/8, 80,Screen.height / 10),
		""+player2Score);
	
	//RESET BUTTON
	if(GUI.Button(new Rect(Screen.width/2 + Screen.width / 8 + 1,
		Screen.height - Screen.height/9 - Screen.height/40,
		Screen.width/9,Screen.height/9),""))
	{
		player1Score = 0;
		player2Score = 0;
		myBall.gameObject.SendMessage("ResetBall");
	}
}