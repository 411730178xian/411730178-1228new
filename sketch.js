var face_x = [] 
var face_y = []
var face_size = []
var face_num = 5

var song
var songIsplay=false
var amp

var vol=0
var m_x,m_y
var music_btn,mouse_btn,Speech_btn
var mosueIsplay=true
var myRec = new p5.SpeechRec();
var result

// function showResult()
// 	{
// 		if(myRec.resultValue==true) {
// 			// background(192, 255, 192);
// 			// text(myRec.resultString, width/2, height/2);
//       push()
//         translate(0,0)
//         background(192, 255, 192);
//         fill(255,0,0)
//         textStyle("italic")
//         text(myRec.resultString,1200,10);
//         text(myRec.resultString,0, height/2);
//       pop()
//       result = myRec.resultString
//       if(myRec.resultString==="跳舞")
//       {
//         music_btn_pressed()
//       }
//       if(myRec.resultString==="不要跳")
//       {
//         // song.pause()
//         // mosueIsplay = true
//         // songIsplay = false
//           mouse_btn_pressed()
//         }
// 		}
// 	}


//音樂
function preload(){
  song = loadSound("We Wish You A Merry Christmas.mp3");
}
function mousePressed()
{
  if(!songIsplay){
    song.play()
    songIsplay = true
    amp=new p5.Amplitude()

  }
  else{
    song.pause()
    songIsplay = false

  }
  
}


function setup() {
  
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  for(var i=0;i<face_num;i++){
    face_size[i] = random(10,100)  //臉的大小10~100
    face_x[i] = random(0,width)
    face_y[i] = random(0,height)
  }

  //跳舞
mouse_btn = createButton("跳舞")
mouse_btn.position(10,10)
mouse_btn.size(250, 100);
mouse_btn.style('background-color', 'yellow');
mouse_btn.style('font-size', '44px');
mouse_btn.style('color', 'white');
mouse_btn.mousePressed(mouse_btn_pressed)

  //按鈕暫停
music_btn = createButton("暫停")
music_btn.position(370,10)
music_btn.size(250, 100);
music_btn.style('background-color', 'orange');
music_btn.style('font-size', '44px');
music_btn.style('color', 'white');
music_btn.mousePressed(music_btn_pressed)

//按鈕 語音
Speech_btn = createButton("語音辨識(跳舞/不要跳)")
Speech_btn.position(740,10)
Speech_btn.size(250, 100);
Speech_btn.style('background-color', 'red');
Speech_btn.style('font-size', '32px');
Speech_btn.style('color', 'white');
Speech_btn.mousePressed(Speech_btn_pressed)
}
//跳舞
function music_btn_pressed(){
  song.stop()
  song.play()
  songIsplay = true
  mosueIsplay = false
  amp=new p5.Amplitude()
}

function mouse_btn_pressed(){
  song.pause()
  mosueIsplay = true
  songIsplay = false

}

//按鈕 語音
function Speech_btn_pressed(){
  myRec.onResult = showResult;
  myRec.start();  

}
// function Speech_btn_pressed(){
//   myRec.onResult = showResult;
// 	myRec.start();
 
  // Speech_btn.style('value', '請發音');

// }
function showResult()
	{
		if(myRec.resultValue==true) {
            //顯示辨識文字
          push()
            translate(0,0)
            background(192, 255, 192);
            fill(255,0,0)
            textStyle("italic")
            text(myRec.resultString,1200,10);
            text(myRec.resultString,0, height/2);
          pop()
        //=======================
          result = myRec.resultString
          console.log(1)
          console.log(myRec.resultString)
          if(myRec.resultString==="跳舞")
          {
            music_btn_pressed()
            songIsplay = false
            mosueIsplay = true
            
          }
          if(myRec.resultString==="不要跳")
          {
            song.pause()
            mosueIsplay = true
            songIsplay = false
            }
		}
	}

//利用songIsplay判斷是否需要位移多少(m_x與m_y為位移數值)
if(songIsplay){
  vol = amp.getLevel()
  m_x =map(vol,0,1,0,width) 
  m_y= map(vol,0,1,0,height)
}
else
if(mosueIsplay)
{
  m_x = mouseX
  m_y= mouseY

}

function draw() {
  background("#e0fbfc");
  textSize(60)
  text("X:"+mouseX+"  Y:"+mouseY,60,60)
  
  for(var j=0;j<face_num;j++){
  push()
  var f_s = face_size[j]
      translate(face_x[j],face_y[j]) //把(0,0)座標原點移到視窗的中間
    // fill(255,0,0)
    noStroke()
    // translate(width/2,height/2)
    //頭
    fill(mouseX%256,mouseY%256,100)
    ellipse(0,-f_s,f_s/0.392,f_s/0.392)
    ellipse(0,f_s,f_s/0.333,f_s/0.333) //身體
     //圍巾
    fill(mouseX%200,mouseY%200,100)
    rect(-f_s,-f_s/5,f_s/0.5,f_s/2.85)
    arc(-f_s/1.02,-f_s/40,f_s/2.85,f_s/2.85,90,270) //圍巾左邊
    arc(f_s/1.02,-f_s/40,f_s/2.85,f_s/2.85,270,90) //圍巾右邊
    rect(-f_s,-f_s/5,f_s/2.85,f_s/0.66)
    //眼睛
    fill(0)
    ellipse(-f_s/1.66+map(mouseX,0,width,-f_s/40,f_s/12),-f_s/0.87+map(mouseY,0,height,-f_s/40,f_s/12),f_s/3.33)
    ellipse(f_s/1.66+map(mouseX,0,width,-f_s/40,f_s/12),-f_s/0.87+map(mouseY,0,height,-f_s/40,f_s/12),f_s/3.33)
    rect(-f_s/1.25,-f_s/0.66,f_s/2.5,f_s/10)
    rect(f_s/2.5,-f_s/0.66,f_s/2.5,f_s/10)
    // fill(255)
    // ellipse(-60,-115,10)
    // ellipse(60,-115,10)
    //鼻子
    fill("#eb5e28")
    ellipse(0,-f_s/1.33,f_s/5)
    //嘴巴
    if(!songIsplay){
      fill(0)
      rect(-f_s/3,-f_s/1.82,f_s/1.4,f_s/15) //沒有播放
    }
    else{
      vol = amp.getLevel() //取得聲音值(值為0~1之間)
      console.log(vol)
      arc(0,f_s/4-1,f_s/2,map(vol,0,0.5,f_s/5,f_s/10),0,180)
      fill("#ee6c4d")
      arc(0,-f_s/1.82,f_s/2,f_s/2,0,180)
      fill(0)
      arc(0,-f_s/1.82,f_s/1.4,map(vol,0,0.5,f_s/5,f_s/15),0,180)
    }

    // if(mouseIsPressed) //mouseIsPressed為true，代表有按下滑鼠
    // {  
    //   fill("#ee6c4d")
    //   arc(0,-f_s/1.82,f_s/2,f_s/2,0,180)
    //   fill(0)
    //   arc(0,-f_s/1.82,f_s/1.4,f_s/15,0,180)
    // }
    // else  //mouseIsPressed為false，代表沒有按下滑鼠
    // {  
    //   fill(0)
    //   rect(-f_s/3,-f_s/1.82,f_s/1.4,f_s/15)
    // }
    // noFill()

    //帽子
    fill(0)
    rect(-f_s/1.11,-f_s/0.307,f_s/0.55,f_s/0.66)
    rect(-f_s/0.77,-f_s/0.52,f_s/0.4,f_s/5) //下緣
    fill("#ee6c4d")
    rect(-f_s/1.11,-f_s/0.465,f_s/0.55,f_s/5)
    //釦子
    fill("#f2cc8f")
    ellipse(0,f_s,f_s/5)
    ellipse(0,f_s/2,f_s/5)
  pop()
 }
}

function Speech_btn_pressed(){
  myRec.onResult = showResult;
	myRec.start();
 
  // Speech_btn.style('value', '請發音');

}
// function showResult()
// 	{
// 		if(myRec.resultValue==true) {
//             //顯示辨識文字
//           push()
//             translate(0,0)
//             background(192, 255, 192);
//             fill(255,0,0)
//             textStyle("italic")
//             text(myRec.resultString,1200,10);
//             text(myRec.resultString,0, height/2);
//           pop()
//         //=======================
//           result = myRec.resultString
//           console.log(1)
//           console.log(myRec.resultString)
//           if(myRec.resultString==="跳舞")
//           {
//             music_btn_pressed()
            
//           }
//           if(myRec.resultString==="不要跳")
//           {
//             song.pause()
//             mosueIsplay = true
//             songIsplay = false
//             }
// 		}
// 	}
