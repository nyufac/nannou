nannou
======

Compiling template engine based on pattern matching

Example usage
-------------

Imagine you want render tree-like structure

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