//my consts 
//sideburns
const faceScale=0.5;
const eyeHeightScalar=7;
const sideBurns = ["none", "square", "triangle"];
const minSideBurnHeight=.1*faceScale;
const maxSideBurnHeight=3*faceScale;
//nose
// const minNoseHeight=0.5*faceScale;
// const maxNoseHeight=4*faceScale;
// const minNoseWidth=0.5*faceScale;
// const maxNoseWidth=6*faceScale;
// const minNoseY=-1.5*faceScale;
// const maxNoseY=1.5*faceScale; 
const noseDirections = ["left", "right", "both"];
//eyes
// const minEyeX=.5*faceScale;
// const minEyeWidth=1*faceScale;
// const maxEyeWidth=5*faceScale;
// const minEyeHeight=1*faceScale;
// const maxEyeHeight=5*faceScale;
const minInnerEyeWidth=.1*faceScale;
const maxInnerEyeWidth=1*faceScale;
const minInnerEyeHeight=.1*faceScale;
const maxInnerEyeHeight=1*faceScale;
// const eyeResizeSize=1;
// const innerEyeResizeSize=0.7;
//ear
const minEarY=-1*faceScale;
const maxEarY=1*faceScale;
const earShapes=["circle","triangle","square","none"];
const minInnerEarWidth=0.1;
const maxInnerEarWidth=0.6;
const minInnerEarHeight=.1;
const maxInnerEarHeight=.6;
//mouth
// const minMouthHeight=.5*faceScale;
// const minMouthWidth=.5*faceScale;
// const maxMouthWidth=7*faceScale;
const minNumberOfteeth=3;
const maxNumberOfTeeth=8;
// const minMouthNoseGap=.25*faceScale;


const myStrokeWeight=0.2*faceScale;

//colours
const red=[188,66,46];
const yellow=[225,191,91];
const blue=[31,62,109];
const black=[0,0,0];
const grey=[211,211,209];
const white=[255,255,255];
const myBgCol=[35,168,178];//light blue
const green=[86,115,90];
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
  eyeStroke=true; 
  earShape="none";
  noseCol=grey;
  
  constructor(){

    this.sideBurn=sideBurns[Math.floor(p5.prototype.random() * sideBurns.length)];
    if(this.sideBurn!="none"){
      this.sideBurnHeight=p5.prototype.random(minSideBurnHeight,maxSideBurnHeight);
    }
    this.earShape=earShapes[Math.floor(Math.random() * earShapes.length)];
    
    this.noseDirection=noseDirections[Math.floor(Math.random() * noseDirections.length)];
 
    this.innerEyeWidth=p5.prototype.random(minInnerEyeWidth,maxInnerEyeWidth);
    this.innerEyeHeight=p5.prototype.random(minInnerEyeHeight,maxInnerEyeHeight);
    this.earY=p5.prototype.random(minEarY,maxEarY);
    this.innerEarWidth=this.earWidth*p5.prototype.random(minInnerEarWidth,maxInnerEarWidth);
    this.innerEarHeight=this.headHeight*p5.prototype.random(minInnerEarHeight,this.getMaxInnerEarHeight());
  
    this.hasTeeth=Math.random()<0.6;
   
    this.numberOfteeth=Math.floor(p5.prototype.random(minNumberOfteeth,maxNumberOfTeeth));
   
  
  }
  
  
  getMaxInnerEarHeight(){
    return maxInnerEarHeight;
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
    rect(0,this.mouthY,this.mouthWidth,this.mouthHeight);
   //draw teeth if face has teeth and the teeth won't make the mouth completely filled with the stroke
    if(this.hasTeeth&&!this.mouthWidth/this.numberOfteeth+myStrokeWeight*1.1<this.mouthWidth/this.numberOfteeth*2-myStrokeWeight*1.1){
      line(-this.mouthWidth/2,this.mouthY,this.mouthWidth/2,this.mouthY);
      for(let i=1;i<this.numberOfteeth;i++){
        line(-this.mouthWidth/2+this.mouthWidth/this.numberOfteeth*i,this.mouthY-this.mouthHeight/2,-this.mouthWidth/2+this.mouthWidth/this.numberOfteeth*i,this.mouthY+this.mouthHeight/2);
      }
    }
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

    //left eye
    fill(this.eyeBallCol);
    let leftEyeWidth=this.positions.left_eye[3][0]-this.positions.left_eye[0][0];
    let leftEyeHeight=eyeHeightScalar*(this.positions.left_eye[4][1]-this.positions.left_eye[2][1]);
    ellipse(segment_average(this.positions.left_eye)[0],
     this.eyeY, 
     leftEyeWidth,
      leftEyeHeight);
    
    
    
    
    fill(this.eyeCentreCol);
    ellipse(segment_average(this.positions.left_eye)[0], this.eyeY, leftEyeWidth*this.innerEyeWidth, leftEyeHeight*this.innerEyeHeight);
    strokeWeight(myStrokeWeight);
    // //draw right eye 
    let rightEyeWidth=this.positions.right_eye[3][0]-this.positions.right_eye[0][0];
    let rightEyeHeight=eyeHeightScalar*(this.positions.right_eye[5][1]-this.positions.right_eye[1][1]);

    
      fill(this.eyeBallCol);
      ellipse(segment_average(this.positions.right_eye)[0], this.eyeY, rightEyeWidth, rightEyeHeight);
      fill(this.eyeCentreCol);
      
      ellipse(segment_average(this.positions.right_eye)[0], this.eyeY, rightEyeWidth*this.innerEyeWidth, rightEyeHeight*this.innerEyeHeight);
      strokeWeight(myStrokeWeight);
    
  }
  drawNose(){
    fill(this.noseCol);
    //make gap between mouth and nose if nose and mouth are too close
    let noseHeightReduction=0;
    // if(this.noseY+this.noseHeight/2+minMouthNoseGap>=this.mouthY-this.mouthHeight/2){
    //   noseHeightReduction=minMouthNoseGap;
    // }
    
    this.noseX=this.positions.nose_bridge[0][0];
    //draw left facing:
    if(this.noseDirection=="left"){
      
      triangle(this.noseX,this.positions.nose_bridge[0][1],this.noseX,this.positions.nose_tip[2][1],this.positions.nose_tip[0][0],this.positions.nose_tip[2][1]);

      //triangle(this.noseX,this.noseY-this.noseHeight/2,this.noseX,this.noseY+this.noseHeight/2-noseHeightReduction,this.noseX-this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
      // triangle(this.positions.nose_bridge[0][0],this.positions.nose_bridge[0][1],this.positions.nose_bridge[0][0],this.positions.nose_tip[2][1],this.noseX-this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
    }
    //draw right facing:
    else if(this.noseDirection=="right"){
      //triangle(this.noseX,this.noseY-this.noseHeight/2,this.noseX,this.noseY+this.noseHeight/2-noseHeightReduction,this.noseX+this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
      triangle(this.noseX,this.positions.nose_bridge[0][1],this.noseX,this.positions.nose_tip[2][1],this.positions.nose_tip[4][0],this.positions.nose_tip[2][1]);
    }
    //draw symetrical nose
    else{
      // triangle(this.noseX,this.noseY-this.noseHeight/2,this.noseX+this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction,this.noseX-this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
      triangle(this.noseX,this.positions.nose_bridge[0][1],this.positions.nose_tip[4][0],this.positions.nose_tip[2][1],this.positions.nose_tip[0][0],this.positions.nose_tip[2][1]);
    }
   
  }

}