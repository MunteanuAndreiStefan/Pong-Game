#pragma strict
function Start()
{
	var spr = GetComponent(SpriteRenderer);
	if(spr == null)
	{
		return;
	}
	
	transform.localScale = Vector3(1,1,1);
	var width = spr.sprite.bounds.size.x;
	var height = spr.sprite.bounds.size.y;
	
	var worldScreenHeight = Camera.main.orthographicSize * 2.0;
	var worldScreenWidth:float = worldScreenHeight / Screen.height * Screen.width;
	
	transform.localScale.x = worldScreenWidth / width;
	transform.localScale.y = 0.5 / height;
	transform.position = Vector3(0,0 - worldScreenHeight / 2 + 0.25);
}