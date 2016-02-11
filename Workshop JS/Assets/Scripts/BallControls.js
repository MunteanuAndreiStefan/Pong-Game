#pragma strict

var myCam:Camera;
var trail:TrailRenderer;
static var speed:float;
private var dir:Vector2;
private var rotateAngle:float;
private var connection : boolean;
function Start () 
{
	connection = true;
	yield WaitForSeconds(2);
	GoBall();
}
function GoBall()
{
	speed = 4;
	trail.time = 0.5;
	GetComponent.<ParticleSystem>().startLifetime = 0.5;
	var x = Random.Range(-1,2);
	while(x == 0)
	{
		x = Random.Range(-1,2);
	}
	var y = Random.Range(-1f,2f);
	while(y == 0)
	{
		y = Random.Range(-1f,2f);
	}
	GetComponent.<Rigidbody2D>().velocity = Vector2(x,y).normalized * speed;
}
function Update()
{
	dir = GetComponent.<Rigidbody2D>().velocity;
	transform.Rotate(Vector3(0,0,rotateAngle));
}
function FixedUpdate()
{
	if(connection)
	{
		if(Network.isServer)
		{
			UpdateBallPosition();
		}
	}
}
function UpdateBallPosition()
{
	var x = transform.position.x;
	var y = transform.position.y;
	var z = dir.x;
	var w = dir.y;
	GetComponent.<NetworkView>().RPC("SetBallPosition",RPCMode.OthersBuffered,new Quaternion(x,y,z,w));
	GetComponent.<NetworkView>().RPC("SetScore",RPCMode.AllBuffered,
		new Vector3(ScoreUpdate.player1Score,ScoreUpdate.player2Score,0));
}
function hitFactor(ballPos:Vector2 , racketPos:Vector2 ,
               racketHeight: float ):float {
    return (ballPos.y - racketPos.y) / racketHeight;
}
function OnCollisionEnter2D(colInfo : Collision2D)
{
	var y:float;
	var c:BoxCollider2D = colInfo.collider as BoxCollider2D;
	if(colInfo.transform.name == "topWall")
	{
		if(GetComponent.<Rigidbody2D>().velocity.y >= -0.2 && GetComponent.<Rigidbody2D>().velocity.y <= 0.2)
		{
			if(GetComponent.<Rigidbody2D>().velocity.x < 0)
			{
				dir = new Vector2(-1,0.2).normalized;
			}
			else
			{
				dir = new Vector2(1, 0.2).normalized;
			}
			// Set Velocity with dir * speed
			GetComponent.<Rigidbody2D>().velocity = dir * speed;
		}
	}
	else
	{
		if(GetComponent.<Rigidbody2D>().velocity.y <= 0.2 && GetComponent.<Rigidbody2D>().velocity.y >= -0.2)
		{
			if(GetComponent.<Rigidbody2D>().velocity.x < 0)
			{
				dir = new Vector2(-1,0.2).normalized;
			}
			else
			{
				dir = new Vector2(1, 0.2).normalized;
			}
			// Set Velocity with dir * speed
			GetComponent.<Rigidbody2D>().velocity = dir * speed;
		}
	}
	if (colInfo.gameObject.name == "Player1") {
		speed+= 0.08;
        // Calculate hit Factor
        y=hitFactor(transform.position,
                          colInfo.transform.position,
                          c.size.y);
        // Calculate direction, set length to 1
        dir = new Vector2(1, y + GetComponent.<Rigidbody2D>().velocity.y / 4).normalized;

        // Set Velocity with dir * speed
        GetComponent.<Rigidbody2D>().velocity = dir * speed;
        if(y > 0.1)
        {
        	GetComponent.<AudioSource>().pitch = 1.5;
        }
        else if ( y <= 0.1 && y >= -0.1)
        {
        	GetComponent.<AudioSource>().pitch = 1.1;
        }
        else
        {
        	GetComponent.<AudioSource>().pitch = 0.8;
        }
        GetComponent.<AudioSource>().Play();
    }

    // Hit the right Racket
    if (colInfo.gameObject.name == "AI" || colInfo.gameObject.name == "Player2") {
		speed+= 0.08;
        // Calculate hit Factor
        y=hitFactor(transform.position,
                          colInfo.transform.position,
                          c.size.y);

        // Calculate direction, set length to 1
        dir = new Vector2(-1, y+ GetComponent.<Rigidbody2D>().velocity.y / 4).normalized;
        
        // Set Velocity with dir * speed
        GetComponent.<Rigidbody2D>().velocity = dir * speed;
        if(y > 0.1)
        {
        	GetComponent.<AudioSource>().pitch = 1.5;
        }
        else if ( y <= 0.1 && y >= -0.1)
        {
        	GetComponent.<AudioSource>().pitch = 1.1;
        }
        else
        {
        	GetComponent.<AudioSource>().pitch = 0.8;
        }
        GetComponent.<AudioSource>().Play();
    }
    rotateAngle+= dir.y * 10;
    rotateAngle=rotateAngle % 360;
	
}
function ResetBall()
{
	trail.time = 0;
	GetComponent.<ParticleSystem>().startLifetime = 0.0;
	rotateAngle=0;
	transform.position = Vector2(0,0);
	GetComponent.<Rigidbody2D>().velocity = Vector2(0,0);
	dir = Vector2(0,0);
	yield WaitForSeconds(0.5);
	GoBall();
}
function OnDisconnectedFromServer(info : NetworkDisconnection) 
{
	connection = false;
	Application.LoadLevel(0);
}
function OnPlayerDisconnected(player: NetworkPlayer) {
	connection = false;
	Application.LoadLevel(0);
}
@RPC
function SetBallPosition(pos:Quaternion)
{
	transform.position.x = pos.x;
	transform.position.y = pos.y;
	GetComponent.<Rigidbody2D>().velocity.x = pos.z;
	GetComponent.<Rigidbody2D>().velocity.y = pos.w;
}
@RPC
function SetScore(score:Vector3)
{
	ScoreUpdate.player1Score = score.x;
	ScoreUpdate.player2Score = score.y;
}