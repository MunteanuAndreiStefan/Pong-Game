#pragma strict
var mainCam:Camera;
var ball:Transform;
private var dif:float;
private var handicap:float;
private var limit:float;
function Start()
{
	limit = 5;
}
function Update () {
	dif = mainCam.ScreenToWorldPoint(new Vector3(0f,Screen.height,0f)).y - 0.40;
	if(transform.position.y > dif)
	{
		transform.position.y = dif;	
	}
	if(transform.position.y < - 0.64 )
	{
		transform.position.y = - 0.64;	
	}
	transform.GetComponent.<Rigidbody2D>().velocity.x = 0;
}
function FixedUpdate()
{
	handicap = Random.Range(1,limit);
	transform.GetComponent.<Rigidbody2D>().velocity.y = ball.GetComponent.<Rigidbody2D>().velocity.y / handicap;
	if(limit > 1)
	{
		limit -= 0.0001;
	}
}