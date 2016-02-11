private var speed:float = 4;
var buttonUp:GUISkin;
var buttonDown:GUISkin;
private var Player1:Transform;
private var Player2:Transform;
private var dif:float;
var mainCam:Camera;
function Start()
{
	Player1 = GameObject.FindGameObjectWithTag("Player1").transform;
	Player2 = GameObject.FindGameObjectWithTag("Player2").transform;
}
function Update () 
{
	if(Network.isServer)
	{
			GetComponent.<NetworkView>().RPC("SetPlayer1Pos",RPCMode.OthersBuffered,
				new Vector3(0,Player1.position.y,0));		
	}
	if(Network.isClient)
	{
			GetComponent.<NetworkView>().RPC("SetPlayer2Pos",RPCMode.OthersBuffered,
				new Vector3(0,Player2.position.y,0));	
	}
	GetComponent.<Rigidbody2D>().velocity.x = 0;
	dif = mainCam.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y - 0.50;
	if(transform.position.y > dif)
	{
		transform.position.y = dif;	
	}
	if(transform.position.y < - 0.64 )
	{
		transform.position.y = - 0.64;
	}
	GetComponent.<Rigidbody2D>().velocity.x = 0;
}
function OnGUI()
{
	GUI.skin = buttonUp;
	if(GUI.RepeatButton(Rect(0 + Screen.width/40,
		Screen.height - Screen.height/9 - Screen.height/40,
		Screen.width/8,Screen.height/9),""))
	{
		if(Network.isServer)
		{
			Player1.transform.Translate(0,speed * Time.deltaTime,0);
		}
		else if(Network.isClient)
		{
			Player2.transform.Translate(0,speed * Time.deltaTime,0);
		}
	}
	GUI.skin = buttonDown;
	if(GUI.RepeatButton(Rect(Screen.width - Screen.width/40 - Screen.width/8,
		Screen.height - Screen.height/9 - Screen.height/40,
		Screen.width/8,Screen.height/9),""))
	{
		if(Network.isServer)
		{
			Player1.transform.Translate(0,-speed * Time.deltaTime,0);
		}
		else if(Network.isClient)
		{
			Player2.transform.Translate(0,-speed * Time.deltaTime,0);
		}
	}
}
@RPC
function SetPlayer1Pos(playerPos : Vector3)
{
	Player1.position.y = playerPos.y;
}

@RPC
function SetPlayer2Pos(playerPos : Vector3)
{
	Player2.position.y = playerPos.y;
}