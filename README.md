nannou
======

Compiling template engine based on pattern matching

Example usage
-------------

Imagine you want render imageboard message, represented as:

```javascript
{
	id:	123
	, title: ''
	, author: 'Anonymous'
	, date: 0
	, reflink: {
		host: 'localhost'
		, board: 's'
		, post: 123
		, url: 'http://localhost/s/res/12.html#123'
	}
	, attaches: []
	, message: 'fdsdffds'
}
```

So you write simple

```html
<!--/ message author email -->
<a name="<?id?>"></a>
<span class="info">
  <input type="checkbox" name="delete" value="<?id?>" />
  <span class="title"><?title?></span>
  <span class="postername"><?{author:author, email:email}?></span>
  <? _.perks && perks || '' :: ?>
  <span class="timestamp"><?rtl._d(date)?></span>
  <span class="reflink">
	№<a href="<?reflink?>" msg="postnum"><?id?></a>&nbsp;
  </span>
  <? _.menu && {stdmenu: menu} || '' ?>
  <br clear="left">
</span> 
<? _.attaches ||  '' ?>
<? _.attaches && _.attaches.length > 2 ? '<br clear="both"/>' : '' ?>
<blockquote class="message"><?message?>
<? _.cutted ? '<div class="abbrev">Сообщение слишком длинное и было обрезано.</div>' : ''?>
<? _.pingbacks && _.pingbacks.length && {pingbacks: pingbacks} || '' ?>
</blockquote>

<!--/ author email -->
<a href="<?email?>"><?author?></a>

<!--/ author email=='' -->
<?author?>

<!--/ stdmenu -->
<span class="stdmenu">[<?stdmenu :: / ?>]</span>

<!--/ perk -->
<sup><?perk?></sup>

<!--/ video -->
<div style="float: left; margin: 5px; margin-right: 10px;"><?video?></div>

<!--/ h!==undefined w!==undefined url size name -->
<span class="attach">
<span class="filesize">
<a target="_blank" href="<?url?>"><?name?></a>
(<em><?size?>КиБ, <?w?>×<?h?>пикс.</em>)
</span>
<br />
<a target="_blank" href="<?url?>">
<? _.thumb && thumb || '<div class="nothumb">Нет картинки</div>' ?>
</a>
</span>

<!--/ h w url thumb -->
<img src="<?url?>" width="<?w?>" height="<?h?>" alt="" class="img" msg="toggle-image" />

<!--/ pingbacks -->
<div class="pingbacks">Ответы: <? pingbacks ::, ?>.</div>

<!--/ board!==undefined host!==undefined post url -->
<a href="<?url?>" msg="reflink">&gt;&gt;<?host?><?board?><?post?></a>
```

and does not care about element relations, matching will be done automatically.

Another example. Tree-like structure

```javascript
{
	title: 'Root'
	children: [
		{title: 'First child', children: []},
		{title: 'Another child', children: [
			{title: 'A', children: []},
			{title: 'B', children: []},
			{title: 'C', children: []}
		]}
	]
}
```

to render that you need only:

```html
<!--/ title children -->
<li>	
	<? title ?>
	<ul><? children ?></ul>
</li>
```