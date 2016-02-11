private var speed:float = 4;
var mainCamera:Camera;
var buttonUp:GUISkin;
var buttonDown:GUISkin;
private var dif:float;
function Update () 
{
	dif = mainCamera.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y - 0.50;
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
		Screen.height - Screen.height/6,
		Screen.width/8,Screen.height/6),""))
	{
		transform.Translate(0,speed * Time.deltaTime,0);
	}
	GUI.skin = buttonDown;
	if(GUI.RepeatButton(Rect(Screen.width - Screen.width/40 - Screen.width/8,
		Screen.height - Screen.height/6,
		Screen.width/8,Screen.height/6),""))
	{
		transform.Translate(0,-speed * Time.deltaTime,0);
	}
}