#pragma strict

var topWall:BoxCollider2D;
var bottomWall:BoxCollider2D;
var leftWall:BoxCollider2D;
var rightWall:BoxCollider2D;
var backKey:KeyCode;
var menuKey:KeyCode;

var Player1 : Transform;
var Player2 : Transform;

function Start () {	
	Screen.SetResolution(800,480,false);
    var worldScreenHeight = Camera.main.orthographicSize * 2.0;
    var worldScreenWidth = worldScreenHeight / Screen.height * Screen.width;
	topWall.size = new Vector2(worldScreenWidth,1);
	topWall.offset = new Vector2(0,worldScreenHeight/2 + 0.4);
	
	bottomWall.size = new Vector2(worldScreenWidth,1);
	bottomWall.transform.position.y = 0 - worldScreenHeight / 2;
		
	rightWall.size = new Vector2(1,worldScreenHeight);
	rightWall.offset = new Vector2(worldScreenWidth/2 + 0.5,0);
		
	leftWall.size = new Vector2(1,worldScreenHeight);
	leftWall.offset = new Vector2(-worldScreenWidth/2 - 0.5,0);
		
	Player1.position.x = 0-worldScreenWidth/2 + 0.24;
	Player2.position.x = worldScreenWidth/2 -0.25;
}
function Update()
{
	if(Input.GetKey(backKey))
	{
		if(Network.isServer)
		{
			Network.Disconnect();
		}
		if(Network.isClient)
		{
			Network.Disconnect();
		}
		Application.LoadLevel(0);
	}
}
