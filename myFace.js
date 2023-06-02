//my consts 
//sideburns
const faceScale=0.5;
const eyeHeightScalar=7;
const sideBurns = [ "triangle", "square","none"];
const minSideBurnHeight=.1*faceScale;
const maxSideBurnHeight=4*faceScale;
//nose

const noseDirections=["left","both","right"];
//eyes
const pupilSizes=["wide","tall","small"];
const minInnerEyeWidth=.3;
const maxInnerEyeWidth=0.76;
const minInnerEyeHeight=.3;
const maxInnerEyeHeight=.63;

//ear
const minEarY=-1*faceScale;
const maxEarY=1*faceScale;
const earShapes=["circle","triangle","square","none"];

//mouth
const minNumberOfteeth=3;
const maxNumberOfTeeth=8;



const myStrokeWeight=0.2*faceScale;

//colours
const red=[188,66,46];
const yellow=[225,191,91];
const blue=[31,62,109];
const black=[0,0,0];
const grey=[211,211,209];
const white=[255,255,255];
const darkGrey=[110,110,110];


class myFace{
 
  headHeight=8*faceScale;
  headWidth=8*faceScale; 
  
  foreHeadHeight=5*faceScale;
  hairHeight=10*faceScale;
  earWidth=3*faceScale;
  skinColour=yellow;
  hairColour=blue;
  
  sideBurnHeight=0;
  //noseX=0;
  eyeBallCol=white;
  eyeCentreCol=black;
  eyeY=-3*faceScale;
  mouthColour=red;
  innerEarCol=this.skinColour;
  //eyeStroke=true; 
  earShape="none";
  noseCol=grey;
  
  constructor(){
    
    this.sideBurn="triangle";
    
    this.sideBurnHeight=this.getAverage(minSideBurnHeight,maxSideBurnHeight);
    
    this.earShape="square";
    this.noseDirection="both";
    this.pupilSize="wide";
 
    // this.innerEyeWidth=this.getAverage(minInnerEyeWidth,maxInnerEyeWidth);
    // this.innerEyeHeight=this.getAverage(minInnerEyeHeight,maxInnerEyeHeight);
    this.earY=this.getAverage(minEarY,maxEarY);
   
  
    this.hasTeeth=true;
   
    this.numberOfteeth=Math.floor(this.getAverage(minNumberOfteeth,maxNumberOfTeeth));
   
  
  }
  getAverage(min, max){
    return map(0.5, 0, 1, min, max);
  }

  
  drawSkin(){
    rectMode(CENTER);
    fill(this.skinColour);
    quad(-this.headWidth/2, -this.headHeight/2, this.headWidth/2, -this.foreHeadHeight,
    this.headWidth/2, this.headHeight/2, -this.headWidth/2, this.headHeight/2);
    
  }
  drawFace(positions){
    this.positions=positions;
    strokeWeight(myStrokeWeight);
    this.drawEar();
    this.drawHair();
    this.drawSkin();
    this.drawMouth();
    this.drawNose();
    this.drawEyes();
    
    
  }
  drawEar(){
    stroke(0);
    rectMode(CORNER);
    fill(this.skinColour);
    rect(-this.headWidth/2-this.earWidth,-this.headHeight/2,this.earWidth,this.headHeight);
    fill(this.innerEarCol);
    this.innerEarWidth=.7*(this.positions.left_eyebrow[this.positions.left_eyebrow.length-1][0]-this.positions.left_eyebrow[0][0]);
    this.innerEarHeight=1.1*(this.positions.right_eyebrow[this.positions.right_eyebrow.length-1][0]-this.positions.right_eyebrow[0][0]);
    if(this.earShape=="circle"){
      ellipseMode(CENTER);
      ellipse(-this.headWidth/2-this.earWidth/2,this.earY,this.innerEarWidth,this.innerEarHeight);
    }
    else if(this.earShape=="square"){
      rectMode(CENTER);
      rect(-this.headWidth/2-this.earWidth/2,this.earY,this.innerEarWidth,this.innerEarHeight);
    }
    else if(this.earShape=="triangle"){
      triangle(-this.headWidth/2-this.earWidth/2-this.innerEarWidth/2,this.earY-this.innerEarHeight/2,
      -this.headWidth/2-this.earWidth/2-this.innerEarWidth/2,this.earY+this.innerEarHeight/2,
      -this.headWidth/2-this.earWidth/2+this.innerEarWidth/2,this.earY);
    }
  }
  drawMouth(){
   
    fill(this.mouthColour);
    rectMode(CENTER);

    this.mouthY=0.1+(segment_average(this.positions.bottom_lip)[1]+segment_average(this.positions.top_lip)[1])/2;
    this.mouthWidth=this.positions.top_lip[6][0]-this.positions.top_lip[0][0];
    this.mouthHeight=this.positions.bottom_lip[3][1]-this.positions.top_lip[4][1];
    let mouthX=(segment_average(this.positions.bottom_lip)[0]+segment_average(this.positions.top_lip)[0])/2;
    push();
    translate(mouthX,0);
    rect(0,this.mouthY,this.mouthWidth,this.mouthHeight);
   //draw teeth if face has teeth and the teeth won't make the mouth completely filled with the stroke
    if(this.hasTeeth&&!this.mouthWidth/this.numberOfteeth+myStrokeWeight*1.1<this.mouthWidth/this.numberOfteeth*2-myStrokeWeight*1.1){
      line(-this.mouthWidth/2,this.mouthY,this.mouthWidth/2,this.mouthY);
      for(let i=1;i<this.numberOfteeth;i++){
        line(-this.mouthWidth/2+this.mouthWidth/this.numberOfteeth*i,this.mouthY-this.mouthHeight/2,-this.mouthWidth/2+this.mouthWidth/this.numberOfteeth*i,this.mouthY+this.mouthHeight/2);
      }
    }
    pop();
  }
  drawHair(){
    fill(this.hairColour);
    
    beginShape();
    vertex(-this.headWidth/2-this.earWidth, -this.headHeight/2);
    vertex(this.headWidth/2,-this.hairHeight);
    vertex(this.headWidth/2, -this.headHeight/2);
    
    if(this.sideBurn=="square"){
    vertex(-this.headWidth/2, -this.headHeight/2);
    vertex(-this.headWidth/2, -this.headHeight/2+this.sideBurnHeight);  
    vertex(-this.headWidth/2-this.earWidth, -this.headHeight/2+this.sideBurnHeight);
      
    }
    else if(this.sideBurn=="triangle"){
      vertex(-this.headWidth/2, -this.headHeight/2);
      vertex(-this.headWidth/2-this.earWidth, -this.headHeight/2+this.sideBurnHeight);
    }
    vertex();
    endShape(CLOSE);
    stroke(0);
  }
  drawEyes(){
    //calculate eye width and height:
    let leftEyeWidth=this.positions.left_eye[3][0]-this.positions.left_eye[0][0];
    let leftEyeHeight=eyeHeightScalar*(this.positions.left_eye[4][1]-this.positions.left_eye[2][1]);
    let rightEyeWidth=this.positions.right_eye[3][0]-this.positions.right_eye[0][0];
    let rightEyeHeight=eyeHeightScalar*(this.positions.right_eye[5][1]-this.positions.right_eye[1][1]);
    let eyeHeight=this.getAverage(leftEyeHeight,rightEyeHeight);
    let eyeWidth=this.getAverage(leftEyeWidth,rightEyeWidth);


    
    //console.log(this.innerEyeWidth+" "+this.innerEyeHeight); 
    //left eye
    fill(this.eyeBallCol);
    ellipse(segment_average(this.positions.left_eye)[0],this.eyeY, eyeWidth,eyeHeight);
   //draw right eye 
   
   ellipse(segment_average(this.positions.right_eye)[0], this.eyeY, eyeWidth, eyeHeight);

  //pupils:
  //calculate size:
  if(this.pupilSize=="wide"){
    this.innerEyeWidth=maxInnerEyeWidth;
    this.innerEyeHeight=minInnerEyeHeight;
  }
  else if(this.pupilSize=="tall"){
    this.innerEyeWidth=minInnerEyeWidth;
    this.innerEyeHeight=maxInnerEyeHeight;
  }
  else{
    
    this.innerEyeWidth=minInnerEyeWidth;
    this.innerEyeHeight=minInnerEyeHeight;
    
  }
//pupils:
    fill(this.eyeCentreCol);
    //left
    ellipse(segment_average(this.positions.left_eye)[0], this.eyeY, eyeWidth*this.innerEyeWidth, eyeHeight*this.innerEyeHeight);
    //right  
    ellipse(segment_average(this.positions.right_eye)[0], this.eyeY, eyeWidth*this.innerEyeWidth, eyeHeight*this.innerEyeHeight);
  }
  drawNose(){
    fill(this.noseCol);
    let sidewaysTipOffset=0.1;
    this.noseX=this.positions.nose_bridge[0][0];
    //draw left facing:
    if(this.noseDirection=="left"){
      
      triangle(this.noseX,this.positions.nose_bridge[0][1],this.noseX,this.positions.nose_tip[2][1],this.positions.nose_tip[0][0]-sidewaysTipOffset,this.positions.nose_tip[2][1]);
    }
    //draw right facing:
    else if(this.noseDirection=="right"){
      
      triangle(this.noseX,this.positions.nose_bridge[0][1],this.noseX,this.positions.nose_tip[2][1],this.positions.nose_tip[4][0]+sidewaysTipOffset,this.positions.nose_tip[2][1]);
    }
    //draw symetrical nose
    else{
      triangle(this.noseX,this.positions.nose_bridge[0][1],this.positions.nose_tip[4][0],this.positions.nose_tip[2][1],this.positions.nose_tip[0][0],this.positions.nose_tip[2][1]);
    }
   
  }

}