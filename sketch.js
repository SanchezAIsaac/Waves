var img
var x
var y
var t
//translation amount(see bottom of the code with the copy functions)

var s
//smoothness

var button
var buttonValue
//buttons for filter on/off

function preload() {
    img = loadImage("images/kittens.jpg");
//You HAVE to name your image "kittens.jpg"
}

function setup() {
  x = img.width/2
  y = img.height/2
  buttonValue = 1

  createCanvas(x+230,y+100)
  angleMode(DEGREES)

  img.resize(x,y)
  image(img,0,0,x,y)
  //Halves the size of the image to not strain the filter too much
 
  sSlider = createSlider(1, 10, 0)
  sSlider.position(x+39, 400)
  sSlider.mouseClicked(refresh)
  textSize(16);
  text("Smoothness: "+(11-round(sSlider.value())), x+39, 400);
  //Creates a slider for smoothness

  xDSlider = createSlider(0, 10, 0)
  xDSlider.position(x+39, 450)
  xDSlider.mouseClicked(refresh)
  text("Number of Waves: "+(2*round(xDSlider.value())), x+39, 450);
  //Creates a slider for the number of waves

  yDSlider = createSlider(0, 10, 0)
  yDSlider.position(x+39, 500)
  yDSlider.mouseClicked(refresh)
  text("Height Multiplier of Waves: "+round(yDSlider.value()), x+9, 500);
  //creates a slider for a height adjuster for the waves

  button = createButton('Filter On/Off');
  button.position(x+39, 350);
  button.mousePressed(buttonTouch);
  //creates a button to press to turn the color filter on and off
}

function buttonTouch(){
  buttonValue *= -1
  refresh()
}

function gradientFilter(){
//Creates a transparent overlay image to (later) overlay it on top of the photo
  img2 = createImage(x,y)
  img2.loadPixels()
    for(i=0;i<x;i++){
      for(k=0;k<y;k++){
        var c = color(255-k*(255/y),200-k*(255/2*y),k*(255/y),128)
        img2.set(i,k,c)
      }
   }
  img2.updatePixels()
  image(img2,0,0, x, y)
  background(255)
}

function refresh(){
  background(255)
  s = round(sSlider.value())
  xD = round(xDSlider.value())
  yD = round(yDSlider.value())

  if(buttonValue == 1){
  gradientFilter()
  }
//Checks if the button is on or off

  text("Smoothness: "+(11-round(sSlider.value())), x+39, 400);
  text("Number of Waves: "+(2*round(xDSlider.value())), x+39, 450);
  text("Height Multiplier of Waves: "+round(yDSlider.value()), x+9, 500);

  for(i=0;i<x;i+=s){
    t= 10*yD*sin(xD*i)
    copy(img, i, 0, s, y, i, t, s, y);
    if(buttonValue == 1){
      copy(img2, i, 0, s, y, i, t, s, y);
//Copies vertical chunks of the image, offsets them by an amount
//directly proportional to any mathematical function, then pastes them
    }
  }
}




