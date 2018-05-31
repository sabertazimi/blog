---
layout:     post
title:      "Bootstrap Basic Notes"
subtitle:   "Be a stupid learner"
date:       2017-03-05
author:     "sabertazimi"
header-img: "img/home-bg.jpg"
tags:
    - Web
    - Front End
    - CSS
    - Bootstrap
---

* [Bootstrap Notes](#bootstrap-notes)
	* [Grid System](#grid-system)
		* [Basic](#basic)
		* [row](#row)
	* [Nav](#nav)
		* [NavBar](#navbar)
			* [Class](#class)
			* [Structure](#structure)
		* [BreadCrumb](#breadcrumb)
		* [ScrollSpy](#scrollspy)
	* [Tabs and Pills](#tabs-and-pills)
		* [Tab Pane](#tab-pane)
		* [Tab Pane JS API](#tab-pane-js-api)
		* [Tab Pane JS Events](#tab-pane-js-events)
	* [Collapse](#collapse)
		* [Accordion](#accordion)
	* [Text](#text)
	* [Form](#form)
		* [Form Basic](#form-basic)
		* [CheckBox and Select](#checkbox-and-select)
		* [Form Alerts and Prompts](#form-alerts-and-prompts)
	* [Table](#table)
		* [Table Basic Class](#table-basic-class)
	* [Card](#card)
		* [Panel](#panel)
		* [Well](#well)
	* [Images](#images)
		* [Img Class](#img-class)
		* [Thumbnail](#thumbnail)
		* [Media](#media)
		* [Embed](#embed)
	* [Alerts and Prompts](#alerts-and-prompts)
		* [Labels](#labels)
		* [Badges](#badges)
		* [Alerts](#alerts)
		* [Progress Bars](#progress-bars)
		* [Tooltip](#tooltip)
		* [Popover](#popover)
		* [Modal](#modal)
	* [Button](#button)
	* [Jumbotron](#jumbotron)
	* [Icon-Fonts](#icon-fonts)
	* [Carousel(Slide Show)](#carouselslide-show)
	* [Common Class](#common-class)
		* [color](#color)
		* [size](#size)
		* [state](#state)
		* [aniatmion](#aniatmion)

# Bootstrap Notes

```html
<UI API>
	<container/content>
	<header>
	</header>
	<body>
	</body>
	<footer>
	</footer>
</container/content>
</UI API>
```

## Grid System

### Basic

-   设置宽度:   col-xs/sm/md/lg-num
-   设置偏移量: col-xs/sm/md/lg-pull/push/offset-num

### row

-   row
-   row-header/row-content/row-footer

## Nav

### NavBar

#### Class

-   navbar navbar-default
-   navbar-inverse(color) navbar-fixed-top
-   navbar-form
-   nav-tabs nav-pills
-   navbar-left/right

#### Structure

navbar > container > nav/navbar-header/navbar-nav/navbar-form > li/a

```html
<nav class="navbar navbar-default">
	<div class="container-fluid">
		<!-- Brand and toggle get grouped for better mobile display -->
		<div class="navbar-header">
			<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
				<span class="sr-only">Toggle navigation</span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
				<span class="icon-bar"></span>
			</button>
			<a class="navbar-brand" href="#">Brand</a>
		</div>

		<!-- Collect the nav links, forms, and other content for toggling -->
		<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
			<ul class="nav navbar-nav">
				<li class="active"><a href="#">Link <span class="sr-only">(current)</span></a></li>
				<li><a href="#">Link</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else here</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Separated link</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">One more separated link</a></li>
					</ul>
				</li>
			</ul>
			<form class="navbar-form navbar-left" role="search">
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Search">
				</div>
				<button type="submit" class="btn btn-default">Submit</button>
			</form>
			<ul class="nav navbar-nav navbar-right">
				<li><a href="#">Link</a></li>
				<li class="dropdown">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li><a href="#">Action</a></li>
						<li><a href="#">Another action</a></li>
						<li><a href="#">Something else here</a></li>
						<li role="separator" class="divider"></li>
						<li><a href="#">Separated link</a></li>
					</ul>
				</li>
			</ul>
		</div><!-- /.navbar-collapse -->
	</div><!-- /.container-fluid -->
</nav>
```

```css
body{
	padding:50px 0px 0px 0px;
	z-index:0;
}

.navbar-inverse {
	background: #303F9F;
}

.navbar-inverse .navbar-nav > .active > a,
.navbar-inverse .navbar-nav > .active > a:hover,
.navbar-inverse .navbar-nav > .active > a:focus {
	color: #fff;
	background: #1A237E;
}

.navbar-inverse .navbar-nav > .open > a,
.navbar-inverse .navbar-nav > .open > a:hover,
.navbar-inverse .navbar-nav > .open > a:focus {
	color: #fff;
	background: #1A237E;
}

.navbar-inverse .navbar-nav .open .dropdown-menu> li> a,
.navbar-inverse .navbar-nav .open .dropdown-menu {
	background-color: #303F9F;
	color:#eeeeee;
}

.navbar-inverse .navbar-nav .open .dropdown-menu> li> a:hover {
	color:#000000;
}
```

### BreadCrumb

路径导航栏 - Home -> Library -> Data

```html
<ol class="breadcrumb">
	<li><a href="#">Home</a></li>
	<li><a href="#">Library</a></li>
    <li class="active">Data</li>
</ol>
```

### ScrollSpy

```css
body {
    position: relative;
}

.affix {
    top: 100px
}

```

```html
<body data-spy="scroll" data-target="#navbar-example" data-offset="200">

<nav class="hidden-xs col-sm-2" id="navbar-example">
    <ul class="nav nav-tabs" role="tablist" data-spy="affix" data-offset-top="400">
        <li><a href="#history">Our History</a></li>
        <li><a href="#corporate">Corporate</a></li>
        <li><a href="#facts">Facts</a></li>
    </ul>
</nav>


<!-- 在某个地方 -->
<div id="history">
  ...
</div>
<div id="corporate">
  ...
</div>
<div id="facts">
  ...
</div>

</body>
```

## Tabs and Pills

-   nav-tabs/nav-pills
-   nav-justified/nav-stacked
-   link - active/disabled

```html
<ul class="nav nav-tabs/nav-pills nav-justified/nav-stacked">
	<li role="presentation" class="active"><a href="#">Home</a></li>
    <li role="presentation" class="disabled"><a href="#">Messages</a></li>
	<li role="presentation" class="dropdown">
    	<a class="dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">
      		Dropdown <span class="caret"></span>
    	</a>
    	<ul class="dropdown-menu">
      		...
    	</ul>
  	</li>
</ul>
```

### Tab Pane

```html
<div>

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>
    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>
    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>
    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane fade in active" id="home">...</div>
    <div role="tabpanel" class="tab-pane fade" id="profile">...</div>
    <div role="tabpanel" class="tab-pane fade" id="messages">...</div>
    <div role="tabpanel" class="tab-pane fade" id="settings">...</div>
  </div>

</div>
```

### Tab Pane JS API

```js
$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})

$('#myTabs a[href="#profile"]').tab('show') // Select tab by name
$('#myTabs a:first').tab('show') 			// Select first tab
$('#myTabs a:last').tab('show') 			// Select last tab
$('#myTabs li:eq(2) a').tab('show') 		// Select third tab (0-indexed)
```

### Tab Pane JS Events

-   hide.bs.tab (on the current active tab)
-   show.bs.tab (on the to-be-shown tab)
-   hidden.bs.tab (on the previous active tab, the same one as for the hide.bs.tab event)
-   shown.bs.tab (on the newly-active just-shown tab, the same one as for the show.bs.tab event)

```js
$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
  e.target // newly activated tab
  e.relatedTarget // previous active tab
})
```

## Collapse

href/data-target -> id

```html
<a class="btn btn-primary" role="button" data-toggle="collapse" href="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  Link with href
</a>

<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
  Button with data-target
</button>

<div class="collapse in" id="collapseExample">
  <div class="well">
    ...
  </div>
```

### Accordion

panel-body/list-group

```html
<div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingOne">
      <h4 class="panel-title">
        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingTwo">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingTwo">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading" role="tab" id="headingThree">
      <h4 class="panel-title">
        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </a>
      </h4>
    </div>
    <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
      <div class="panel-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div>
```

## Text

-   text-center/left/right
-   text-primary/info/success/danger

## Form

```html
<!-- type,format,value -->
<input
id=”” name=””
type=”text/email/password/radiobutton/checkbox(checked)/submit/number/range/color/date/url”
value=”(textfield/buttontext)”
placeholder=”(默认占位文字)”

<!-- validate input data -->

required
pattern=”[0-9a-zA-z]{5/13-16}”      <!-- []:可用字符 {}:字符数目 -->
min=”(number)”
max=”(number)”
step=”(步长:指定输入数字必须倍数关系)”
<!-- validate input data-->
/>
```

### Form Basic

-   `<form class="form-horizontal" role="form">`
-   `<form class="form-inline" role="form">`

```html
<form class="form-horizontal" role="form">
	<!-- input -->
	<div class="form-group">
		<label for="firstname" class="col-sm-2 control-label">First Name</label>
		<div class="col-sm-10">
			<input type="text" class="form-control" id="firstname" name="firstname" placeholder="Enter First Name">
		</div>
	</div>
	<!-- input -->
	<div class="form-group">
		<label for="lastname" class="col-sm-2 control-label">Last Name</label>
		<div class="col-sm-10">
			<input type="text" class="form-control" id="lastname" name="lastname" placeholder="Enter Last Name">
		</div>
	</div>
	<!-- input-addon -->
	<div class="form-group">
		<label for="telnum" class="col-xs-12 col-sm-2 control-label">Contact Tel.</label>
		<div class="col-xs-5 col-sm-4 col-md-3">
			<div class="input-group">
				<div class="input-group-addon">(</div>
				<input type="tel" class="form-control" id="areacode" name="areacode" placeholder="Area code">
				<div class="input-group-addon">)</div>
			</div>
		</div>
		<div class="col-xs-7 col-sm-6 col-md-7">
			<input type="tel" class="form-control" id="telnum" name="telnum" placeholder="Tel. number">
		</div>
	</div>
	<!-- input -->
	<div class="form-group">
		<label for="emailid" class="col-sm-2 control-label">Email</label>
		<div class="col-sm-10">
			<input type="email" class="form-control" id="emailid" name="emailid" placeholder="Email">
		</div>
	</div>
	<!-- check box and select -->
	<div class="form-group">
		<div class="checkbox col-sm-5 col-sm-offset-2">
			<label class="checkbox-inline">
				<input type="checkbox" name="approve" value="">
				<strong>May we contact you?</strong>
			</label>
		</div>
		<div class="col-sm-3 col-sm-offset-1">
			<select class="form-control">
				<option>Tel.</option>
				<option>Email</option>
			</select>
		</div>
	</div>
	<!-- textarea -->
	<div class="form-group">
		<label for="feedback" class="col-sm-2 control-label">Your Feedback</label>
		<div class="col-sm-10">
			<textarea class="form-control" id="feedback" name="feedback" rows="12"></textarea>
		</div>
	</div>
	<!-- submit button -->
	<div class="form-group">
		<div class="col-sm-offset-2 col-sm-10">
			<button type="submit" class="btn btn-primary">Send Feedback</button>
		</div>
	</div>
</form>
```

```html
<form>
	<div class="form-group">
		<label for="exampleInputEmail1">Email address</label>
		<input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
	</div>
	<div class="form-group">
		<label for="exampleInputPassword1">Password</label>
		<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
	</div>
	<div class="form-group">
		<label for="exampleInputFile">File input</label>
		<input type="file" id="exampleInputFile">
		<p class="help-block">Example block-level help text here.</p>
	</div>
	<div class="checkbox">
		<label>
			<input type="checkbox"> Check me out
		</label>
	</div>
	<button type="submit" class="btn btn-default">Submit</button>
</form>

<div class="row">
	<div class="col-lg-6">
		<div class="input-group">
			<div class="input-group-btn">
				<button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Action <span class="caret"></span></button>
				<ul class="dropdown-menu">
					<li><a href="#">Action</a></li>
					<li><a href="#">Another action</a></li>
					<li><a href="#">Something else here</a></li>
					<li role="separator" class="divider"></li>
					<li><a href="#">Separated link</a></li>
				</ul>
			</div><!-- /btn-group -->
			<input type="text" class="form-control" aria-label="...">
		</div><!-- /input-group -->
	</div><!-- /.col-lg-6 -->
</div>
```

### CheckBox and Select

```html
<div class="form-group">
	<div class="checkbox col-sm-5 col-sm-offset-2">
		<label class="checkbox-inline">
			<input type="checkbox" name="approve" value="">
			<strong>May we contact you?</strong>
		</label>
	</div>
	<div class="col-sm-3 col-sm-offset-1">
		<select class="form-control">
			<option>Tel.</option>
			<option>Email</option>
		</select>
	</div>
</div>
```

### Form Alerts and Prompts

-   has-color
-   has-feedback
-   form-control-feedback(icon)
-   control-label/form-control/help-block

```html
<div class="form-group has-success has-feedback">
	<label class="control-label" for="inputSuccess2">Input with success</label>
	<input type="text" class="form-control" id="inputSuccess2" aria-describedby="inputSuccess2Status">
	<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
	<span id="inputSuccess2Status" class="sr-only">(success)</span>
</div>
<div class="form-group has-warning has-feedback">
	<label class="control-label" for="inputWarning2">Input with warning</label>
	<input type="text" class="form-control" id="inputWarning2" aria-describedby="inputWarning2Status">
	<span class="glyphicon glyphicon-warning-sign form-control-feedback" aria-hidden="true"></span>
	<span id="inputWarning2Status" class="sr-only">(warning)</span>
</div>
<div class="form-group has-error has-feedback">
	<label class="control-label" for="inputError2">Input with error</label>
	<input type="text" class="form-control" id="inputError2" aria-describedby="inputError2Status">
	<span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
	<span id="inputError2Status" class="sr-only">(error)</span>
</div>
<div class="form-group has-success has-feedback">
	<label class="control-label" for="inputGroupSuccess1">Input group with success</label>
	<div class="input-group">
		<span class="input-group-addon">@</span>
		<input type="text" class="form-control" id="inputGroupSuccess1" aria-describedby="inputGroupSuccess1Status">
	</div>
	<span class="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>
	<span id="inputGroupSuccess1Status" class="sr-only">(success)</span>
</div>
```

## Table

### Table Basic Class

-  table-striped
-  table-bordered
-  table-hover
-  table-condensed
-  table-responsive

```html
<div class="table-responsive">
	<table class="table table-striped">
		<tr>
			<td>&nbsp;</td>
			<th>2013</th>
			<th>2014</th>
			<th>2015</th>
		</tr>
		<tr>
			<th>Employees</th>
			<td>15</td>
			<td>30</td>
			<td>40</td>
		</tr>
		<tr>
			<th>Guests Served</th>
			<td>15000</td>
			<td>45000</td>
			<td>100,000</td>
		</tr>
		<tr>
			<th>Special Events</th>
			<td>3</td>
			<td>20</td>
			<td>45</td>
		</tr>
		<tr>
			<th>Annual Turnover</th>
			<td>$251,325</td>
			<td>$1,250,375</td>
			<td>~$3,000,000</td>
		</tr>
	</table>
</div>
```

## Card

### Panel

```html
<div class="panel panel-primary">
	<div class="panel-heading">
		<h3	class="panel-title">Facts At a Glance</h3>
	</div>
	<div class="panel-body">
		<dl	class="dl-horizontal">
			<dt>Started</dt>
			<dd>3 Feb. 2013</dd>
			<dt>Major Stake Holder</dt>
			<dd>HK Fine Foods Inc.</dd>
			<dt>Last Year's Turnover</dt>
			<dd>$1,250,375</dd>
			<dt>Employees</dt>
			<dd>40</dd>
		</dl>
	</div>
</div>
```

### Well

-   well/well-xs/well-sm

```html
<div class="well">
	<blockquote>
		<p>paragraph</p>
		<footer>
			Yogi Berra,<cite title="Source Title">The Wit and Wisdom of Yogi Berra, 2014</cite>
		</footer>
	</blockquote>
</div>
```

## Images

### Img Class

-   img-responsive
-   img-rounded
-   img-circle
-   img-thumbnail

### Thumbnail

```html
<div class="row">
	<div class="col-sm-6 col-md-4">
		<div class="thumbnail">
			<img class="img-thumbnail" src="..." alt="...">
			<div class="caption">
				<h3>Thumbnail label</h3>
				<p>...</p>
				<p>
					<a href="#" class="btn btn-primary btn-xs" role="button">Button</a>
					<a href="#" class="btn btn-default btn-xs" role="button">Button</a>
				</p>
			</div>
		</div>
	</div>
</div>
```

### Media

-   media
-   media-list(ul)
-   media-object
-   media-body
-   media-heading
-   media-left/right
-   media-top/middle/bottom

```html
<ul class="media-list">
	<li class="media">
		<div class="media-left media-middle">
			<a href="#">
				<img class="media-object" src="..." alt="...">
			</a>
		</div>
		<div class="media-body">
			<h4 class="media-heading">Media heading</h4>
			...
		</div>
	</li>
</ul>
```

### Embed

-   embed-responsive
-   embed-responsive-item
-   targets: `<iframe>, <embed>, <video>, <object>`

```html
<!-- 16:9 aspect ratio -->
<div class="embed-responsive embed-responsive-16by9">
	<iframe class="embed-responsive-item" src="..."></iframe>
</div>

<!-- 4:3 aspect ratio -->
<div class="embed-responsive embed-responsive-4by3">
	<iframe class="embed-responsive-item" src="..."></iframe>
</div>
```

## Alerts and Prompts

### Labels

-   target: span
-   label
-   label-color
-   label-size

```html
<span class="label label-default label-xs">Default</span>
<span class="label label-primary label-sm">Primary</span>
<span class="label label-success label-md">Success</span>
<span class="label label-info label-lg">Info</span>
<span class="label label-warning">Warning</span>
<span class="label label-danger">Danger</span>
```

### Badges

```html
<button class="btn btn-primary" type="button">
	Messages <span class="badge">4</span>
</button>
```

### Alerts

-   alert
-   alert-color
-   alert-dismissible
-   alert-link

```html
<div class="alert alert-warning alert-dismissible" role="alert">
	<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	<strong>Warning!</strong> Better check yourself, you're not looking too good.
	<a href="#" class="alert-link">...</a>
</div>
```

### Progress Bars

-   progress-bar
-   width/aria-valuemin/aria-valuemax
-   progress-bar-color
-   progress-bar-striped
-   stacked: put multi-progress-bar into same .progress

```html
<div class="progress">
	<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
		<span class="sr-only">40% Complete (success)</span>
	</div>
</div>
<div class="progress">
	<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%">
		<span class="sr-only">20% Complete</span>
	</div>
</div>
<div class="progress">
	<div class="progress-bar progress-bar-warning" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style="width: 60%">
		<span class="sr-only">60% Complete (warning)</span>
	</div>
</div>
<div class="progress">
	<div class="progress-bar progress-bar-danger" role="progressbar" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100" style="width: 80%">
		<span class="sr-only">80% Complete (danger)</span>
	</div>
</div>
```

### Tooltip

-   data-toggle="tooltip"
-   data-placement="left"
-   title="Tooltip on left"

```js
// manually initialization
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
})
```

```html
<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="left" title="Tooltip on left">Tooltip on left</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Tooltip on top">Tooltip on top</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom">Tooltip on bottom</button>

<button type="button" class="btn btn-default" data-toggle="tooltip" data-placement="right" title="Tooltip on right">Tooltip on right</button>
```

### Popover

-   data-container="body"
-   data-toggle="popover"
-   data-trigger="focus"
-   data-placement="left"
-   title="left"
-   data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."

```js
// manually initialization
$(function () {
  $('[data-toggle="popover"]').popover()
})
```

```html
<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="left" title="left" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on left
</button>

<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="top" title="top" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on top
</button>

<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="bottom" title="bottom" data-content="Vivamus
sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on bottom
</button>

<button type="button" class="btn btn-default" data-container="body" data-toggle="popover" data-placement="right" title="right" data-content="Vivamus sagittis lacus vel augue laoreet rutrum faucibus.">
  Popover on right
</button>
```

### Modal

```html
data-dismiss ="modal"
```

修饰.modal-dialog、.modal-content

$().modal('');

```html
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="myModalLabel">Modal title</h4>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

```html
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@mdo">Open modal for @mdo</button>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@fat">Open modal for @fat</button>
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" data-whatever="@getbootstrap">Open modal for @getbootstrap</button>

<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="exampleModalLabel">New message</h4>
      </div>
      <div class="modal-body">
        <form>
          <div class="form-group">
            <label for="recipient-name" class="control-label">Recipient:</label>
            <input type="text" class="form-control" id="recipient-name">
          </div>
          <div class="form-group">
            <label for="message-text" class="control-label">Message:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Send message</button>
      </div>
    </div>
  </div>
</div>
```

## Button

-   targets: a/input/button
-   base:    btn
-   color:   btn-primary btn-success btn-warning btn-danger btn-info
-   size:    btn-xs/sm/lg
-   display: btn-block/btn-main
-   group:   btn-toolbar/btn-group/btn-group-vertical/btn-group-lg

```html
<div class="btn-toolbar">
	<div class="btn-group">
		<button class="btn">左</button>
		<button class="btn">中</button>
		<button class="btn">右</button>
	</div>
</div>

<div class="btn-group btn-group-vertical">
	<button class="btn">上</button>
	<button class="btn">中</button>
	<button class="btn">下</button>
</div>
```

-   other:   btn-social-icon

```html
<button data-toggle=”” data-target-”” data-dismiss=””></button>
```

## Jumbotron

```html
<div class="jumbotron">
	<div class="container">
		<div class="main">
			<h1>We are Broadway</h1>
			<a href ="#" class="btn-main">
				Get started
			</a>
		</div>
	</div>
</div>
```

## Icon-Fonts

```html
<span class="glyphicon glyphicon-home" aria-hidden="true"></span>
<i class="fa fa-phone/fa-fax/fa-envelope"></i>
```

## Carousel(Slide Show)

```html
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="..." alt="...">
      <div class="carousel-caption">
        ...
      </div>
    </div>
    <div class="item">
      <img src="..." alt="...">
      <div class="carousel-caption">
        ...
      </div>
    </div>
    ...
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
```

```js
.carousel(options)

Initializes the carousel with an optional options object and starts cycling through items.
Copy

$('.carousel').carousel({
  interval: 2000
})

.carousel('cycle')

Cycles through the carousel items from left to right.
.carousel('pause')

Stops the carousel from cycling through items.
.carousel(number)

Cycles the carousel to a particular frame (0 based, similar to an array).
.carousel('prev')

Cycles to the previous item.
.carousel('next')

Cycles to the next item.
```

## Common Class

### color

-   default/primary/info/warnings/danger

### size

-   xs/sm/md/lg

### state

-   active
-   disabled

### aniatmion

-   collapse
-   fade
-   in
