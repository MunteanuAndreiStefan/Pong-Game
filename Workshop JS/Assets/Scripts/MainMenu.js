#pragma strict
import System.Net;
var backKey : KeyCode;
var mySkin:GUISkin;
private var showNetBtn : boolean;
private var keyboard : TouchScreenKeyboard;
private var text:String;
private var mainCam:Transform;
private var dirX:short;
private var dirY:short;
private var mod:short;
function Start()
{
	dirX = 1;
	dirY = 1;
	mainCam = Camera.main.transform;
	text = "Enter IP Address";
	showNetBtn = true;
}
function Update()
{
	if(Input.GetKey(backKey))
	{
		Application.Quit();
	}
	mod = Random.Range(0,2);
	switch(mod)
	{
		case 0:
			mainCam.Translate(dirX*Time.deltaTime,0,0);
			break;
		case 1:
			mainCam.Translate(0,dirY*Time.deltaTime,0);
			break;
	}
	if(mainCam.position.x >= 1.7 && mainCam.position.x <= 1.8)
	{
		dirX=-1;
	}
	else if(mainCam.position.x <= -1.7 && mainCam.position.x >= -1.8)
	{
		dirX= 1;
	}
	if(mainCam.position.y >= 1.7 && mainCam.position.y <= 1.8)
	{
		dirY=-1;
	}
	else if(mainCam.position.y <= -1.7 && mainCam.position.y >= -1.8)
	{
		dirY= 1;
	}
}
function OnServerInitialized() {
	showNetBtn = false;
}
function OnConnectedToServer() 
{
	ScoreUpdate.player1Score = 0;
	ScoreUpdate.player2Score = 0;
	Application.LoadLevel(2);
}
function OnPlayerConnected(player: NetworkPlayer) 
{
	ScoreUpdate.player1Score = 0;
	ScoreUpdate.player2Score = 0;
	Application.LoadLevel(2);
}
 
function GetIP():String
{
	var strHostName:String = "";
	strHostName = System.Net.Dns.GetHostName();
	 
	 var ipEntry:IPHostEntry = System.Net.Dns.GetHostEntry(strHostName);
	 
	var addr:IPAddress[] = ipEntry.AddressList;
	 
	return addr[addr.Length-1].ToString();
 
}
//GUI Buttons
function OnGUI()
{
	var x = Screen.width / 2;
	var y = Screen.height / 2;
	GUI.skin = mySkin;
	GUI.enabled = showNetBtn;
	if(GUI.Button(new Rect(x - x/3, 10 ,x*2/3, y * 2 / 5),"Single Player"))
	{
		ScoreUpdate.player1Score = 0;
		ScoreUpdate.player2Score = 0;
		Application.LoadLevel(1);
	}
	if(GUI.Button(new Rect(x - x/3, 20 + 1 * y * 2 / 5,x*2/3,y*2/5),"Start Server"))
	{
		Network.InitializeServer(10,7836,false);
	}
	if(GUI.Button(new Rect(x - x/3, 30 + 2 * y * 2 / 5,x*2/3,y * 2 / 5),"Connect"))
	{
		Network.Connect(text,7836);
		//Network.Connect("127.0.0.1",7836);
	}
	
	if(GUI.Button(new Rect(x - x/3 + x*2/3, 30 + 2 * y * 2 / 5,x*2/4,y * 2 / 5),"Key"))
	{
		keyboard = TouchScreenKeyboard.Open(text,TouchScreenKeyboardType.Default,false,false);
	}
	if(keyboard)
	{
		text = keyboard.text;
	}
	
	GUI.enabled = !showNetBtn;
	GUI.Label(new Rect(x - x/3, 40 + 3 * y * 2 / 5,x*2/2,y*2/5),"IP Address: " + GetIP());
}