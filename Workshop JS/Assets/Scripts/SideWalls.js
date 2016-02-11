#pragma strict

function OnTriggerEnter2D(triggerInfo : Collider2D)
{
	if(triggerInfo.name == "ball")
	{
		GetComponent.<AudioSource>().Play();
		ScoreUpdate.UpdateScore(transform.name);
		triggerInfo.gameObject.SendMessage("ResetBall");
	}
}