function timber(){
	//create the canvas
	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext("2d");
	canvas.width = 640;
	canvas.height = 720;
	var id = "timber";
	var mainX = 0;
	var mainY = 0;
	var selectX = 0;
	var selectY = 0;
	var slider1 = new Slider(420, 0.25);
	var slider2 = new Slider(500,0.25);
	// texture(s)
	var dir = "img/timber-assets/";
	var sliderButton = new Image();
	var sliderBar1 = new Image();
	var sliderBar2 = new Image();
	var sliderBar3 = new Image();
	var sliderBar4 = new Image();
	//icons
	var icon1 = new Image();
	var icon2 = new Image();
	var icon3 = new Image();
	var icon4 = new Image();
	var logo  = new Image();
	//var like  = new Image();
	var button1 = new Button(dir+"like.png", 600);
	//background
	var background = new Image();
	sliderButton.src = dir+"slider-button.png";
	sliderBar1.src = dir+"slider-bar1.png";
	sliderBar2.src = dir+"slider-bar2.png";
	sliderBar3.src = dir+"slider-bar3.png";
	sliderBar4.src = dir+"slider-bar4.png";
	icon1.src = dir+"darker.png";
	icon2.src = dir+"lighter.png";
	icon3.src = dir+"warmer.png";
	icon4.src = dir+"cooler.png";
	logo.src =  dir+"logo.png";
	//like.src =  dir+"like.png";
	background.src = dir+"background.jpg";

	//desktop events
	canvas.addEventListener("mousedown", function (e) {e.preventDefault();checkXY(e,false);down();return false;},false);
	canvas.addEventListener("mousemove", function (e) {e.preventDefault();checkXY(e,false);move();return false;},false);
	canvas.addEventListener("mouseup", function (e) {e.preventDefault();checkXY(e,false);up();return false;},false);
	//mobile events
	canvas.addEventListener("touchstart", function (e) {e.preventDefault();checkXY(e,true);down();return false;},false);
	canvas.addEventListener("touchmove", function (e) {e.preventDefault();checkXY(e,true);move();return false;},false);
	
	function checkXY(event,mobile){
		//set x and y click
		selectX = 0;
		selectY = 0;
		if (mobile) {
			selectX = event.touches[0].pageX;
			selectY = event.touches[0].pageY;
			selectX -= canvas.offsetLeft;
			//USE THIS IF USING skrollr.js
			if (typeof s === 'undefined') {	selectY -= canvas.offsetTop; }
			else selectY -= canvas.offsetTop - s.getScrollTop();
			//ELSE, USE THIS IF NOT USING skrollr.js
			//selectY -= canvas.offsetTop;
		}
		else{
			if (event.x != undefined && event.y != undefined){
				selectX = event.x;
				selectY = event.y + window.pageYOffset;
			}
			else{ //fix mozilla issue
				selectX = event.clientX + document.body.scrollLeft +
					document.documentElement.scrollLeft;
				selectY = event.clientY + document.body.scrollTop +
					document.documentElement.scrollTop;
			}
			selectX -= canvas.offsetLeft;
			selectY -= canvas.offsetTop;
		}
	}
	
	function down(){
		slider1.select();
		slider2.select();
		button1.select();
	}
	function move(){ slider1.move(); slider2.move(); button1.move(); }
	function up(){ slider1.release(); slider2.release(); button1.release(); }
	
	function Button(src, y) {
		this.y=y;
		this.img = new Image();
		this.img.src=src;
		Button.prototype.select = function(){}
		Button.prototype.release = function(){ this.action=true; }
		Button.prototype.move = function() {
			if (selectX > ((canvas.width/2)-(this.img.width/2)) &&
				selectX < ((canvas.width/2)+(this.img.width/2)) &&
				selectY > this.y && selectY < this.y+this.img.height/2){
					this.animateY = this.img.height/2;
					document.body.style.cursor = 'pointer';
			}
			else {
				if (this.animateY != 0) { document.body.style.cursor = 'default'; }
				this.animateY = 0;
			}
		}
		Button.prototype.draw = function(){
			//ctx.drawImage(this.img,(canvas.width/2)-(this.img.width/2),this.y);
			ctx.drawImage(this.img, 0,this.animateY,this.img.width,this.img.height/2,
									 (canvas.width/2)-(this.img.width/2),this.y,this.img.width,this.img.height/2);
		}
	}
	function Slider(y, m){
		//declare & init variables
		this.y=y;
		this.m=m;
		this.value=0.5; //50%
		this.width=16;
		this.height=32;
		this.padding=12; //easier to grab
		this.selected=false;
		//define nested functions
		Slider.prototype.setMargin = function(m){ this.m=m; }
		Slider.prototype.setY = function(y){ this.y=y; }
		Slider.prototype.isSelectable = function(){
			if (selectX > (this.a-sliderBar1.width+mainX) && selectX < (this.b+sliderBar4.width+mainX) && //just bar: Math.abs(selectX-(this.a+(this.b-this.a)*this.value)) <= this.width/2
			selectY > (this.y-this.padding+mainY) && selectY < (this.y+sliderBar4.height+this.padding+mainY))
			{ return true; } else return false;
		}
		Slider.prototype.select = function(){
			if (this.isSelectable()) {this.selected = true; this.move();}
			else this.selected = false;
		}
		Slider.prototype.release = function(){ this.selected=false; }
		Slider.prototype.move = function() {
			if (this.selected){
				this.value = (selectX-this.a-mainX)/(this.b-this.a);
				this.value = this.value > 0 ? this.value : 0;
				this.value = this.value < 1 ? this.value : 1;
			}
		}
		Slider.prototype.update = function(){
			this.a = this.m*canvas.width;
			this.b = (1-this.m)*canvas.width;
		}
		Slider.prototype.draw = function(){
			//draw slider bar
			ctx.drawImage(sliderBar1,this.a-sliderBar1.width+mainX,this.y+mainY); //left-end
			ctx.drawImage(sliderBar2,this.a+mainX,this.y+mainY,(this.b-this.a)*this.value,sliderBar2.height); //left
			ctx.drawImage(sliderBar3,this.a+(this.b-this.a)*this.value+mainX,this.y+mainY,(this.b-this.a)*(1-this.value),sliderBar3.height); //right
			ctx.drawImage(sliderBar4,this.b+mainX,this.y+mainY); //right-end
			//draw slider
			ctx.drawImage(sliderButton, (this.a+((this.b-this.a)*this.value))-(this.width/2)-2+mainX, this.y+mainY);
		}
		this.update();
	}
	
	var update = function (modifier) {
		if (button1.action) {
			document.getElementById('special-button').click();
		}
	}
	// Draw everything
	function render() {
		ctx.clearRect (0,0, canvas.width, canvas.height);
		//canvas.width = canvas.width;
		ctx.globalCompositeOperation = "overlay";
		ctx.drawImage(background,0,0,canvas.width, canvas.height);
		//warm or cold
		ctx.fillStyle = slider2.value < .5 ?
			"rgba(50,0,0,"+(Math.abs((slider2.value)-.5))+")" :
			"rgba(0,0,50,"+(Math.abs((slider2.value)-.5))+")";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		//brightness
		ctx.fillStyle = slider1.value < .5 ?
			"rgba(0,0,0,"+(Math.abs((slider1.value)-.5)*1)+")" :
			"rgba(255,255,255,"+(Math.abs((slider1.value)-.5)*1)+")";
		ctx.fillRect(0,0,canvas.width,canvas.height);
		ctx.globalCompositeOperation = "source-over";
		//draw icons first
		ctx.drawImage(logo, (canvas.width/2)-(logo.width/2), 0);
		ctx.drawImage(icon1, slider1.a-48+mainX, slider1.y-6+mainY);
		ctx.drawImage(icon2, slider1.b+16+mainX, slider1.y-6+mainY);
		ctx.drawImage(icon3, slider2.a-48+mainX, slider2.y-6+mainY);
		ctx.drawImage(icon4, slider2.b+16+mainX, slider2.y-6+mainY);
		//ctx.drawImage(like, (canvas.width/2)-(logo.width/2), 600);
		//draw sliders for icons
		slider1.draw();
		slider2.draw();
		button1.draw();
	};
	// The system loop
	function main() {
		var now = Date.now();
		var delta = now - then;
	
		update(delta / 1000);
		render();
	
		then = now;
	};
	var then = Date.now();
	setInterval(main, 1); // Execute as fast as possible
	
	this.setMainX = function(x){ mainX=x; }
	this.setMainY = function(y){ mainY=y; }
	this.checkWidth = function(){adjustWidth();}
	this.setBackground = function(src){background.src=dir+src;}
	this.renderCanvas = function(){ return canvas.toDataURL("image/png"); }
	function adjustWidth(){
		canvas.width = document.getElementById(id).offsetWidth;
		slider1.update();
		slider2.update();
	}
	this.getCanvas = function(){ return canvas; }
	this.getId =  function(){ return id; }
	window.addEventListener("resize",function(){adjustWidth();});
}
//initialize everything
timber = new timber();
timber.checkWidth();
document.getElementById(timber.getId()).appendChild(timber.getCanvas());
