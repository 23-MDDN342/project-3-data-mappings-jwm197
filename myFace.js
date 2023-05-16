//my consts 
//sideburns
const sideBurns = ["none", "square", "triangle"];
const minSideBurnHeight=.1;
const maxSideBurnHeight=3;
//nose
const minNoseHeight=0.5;
const maxNoseHeight=4;
const minNoseWidth=0.5;
const maxNoseWidth=6;
const minNoseY=-1.5;
const maxNoseY=1.5; 
const noseDirections = ["left", "right", "both"];
//eyes
const minEyeX=.5;
const minEyeWidth=1;
const maxEyeWidth=5;
const minEyeHeight=1;
const maxEyeHeight=5;
const minInnerEyeWidth=.1;
const maxInnerEyeWidth=1;
const minInnerEyeHeight=.1;
const maxInnerEyeHeight=1;
const eyeResizeSize=1;
const innerEyeResizeSize=0.7;
//ear
const minEarY=-1;
const maxEarY=1;
const earShapes=["circle","triangle","square","none"];
const minInnerEarWidth=0.1;
const maxInnerEarWidth=0.6;
const minInnerEarHeight=.1;
const maxInnerEarHeight=.6;
//mouth
const minMouthHeight=.5;
const minMouthWidth=.5;
const maxMouthWidth=7;
const minNumberOfteeth=3;
const maxNumberOfTeeth=8;
const minMouthNoseGap=.25;


const myStrokeWeight=0.2;

//colours
const red=[188,66,46];
const yellow=[225,191,91];
const blue=[31,62,109];
const black=[15,17,7];
const grey=[211,211,209];
const white=[255,255,255];
const myBgCol=[35,168,178];//light blue
const green=[86,115,90];
const darkGrey=[110,110,110];
class myFace{
 
  headHeight=8;
  headWidth=8; 
  
  foreHeadHeight=5;
  hairHeight=10;
  earWidth=3;
  skinColour=yellow;
  hairColour=blue;
  
  sideBurnHeight=0;
  noseX=0;
  eyeBallCol=white;
  eyeCentreCol=black;
  eyeY=-3;
  mouthColour=red;
  innerEarCol=this.skinColour;
  eyeStroke=true; 
  earShape="none";
  noseCol=grey;
  
  constructor(){
    this.faceX=0;
    this.sideBurn=sideBurns[Math.floor(p5.prototype.random() * sideBurns.length)];
    if(this.sideBurn!="none"){
      this.sideBurnHeight=p5.prototype.random(minSideBurnHeight,maxSideBurnHeight);
    }
    this.earShape=earShapes[Math.floor(Math.random() * earShapes.length)];
    this.noseHeight=p5.prototype.random(minNoseHeight,maxNoseHeight);
    this.noseDirection=noseDirections[Math.floor(Math.random() * noseDirections.length)];
    this.noseY=p5.prototype.random(minNoseY,maxNoseY);
    this.noseWidth=p5.prototype.random(minNoseWidth,this.getMaxNoseWidth());
    this.eyeWidth=p5.prototype.random(minEyeWidth,maxEyeWidth);
    this.eyeX=p5.prototype.random(minEyeX,this.getMaxEyeX());
    this.eyeHeight=p5.prototype.random(minEyeHeight,maxEyeHeight);
    this.innerEyeWidth=p5.prototype.random(minInnerEyeWidth,maxInnerEyeWidth);
    this.innerEyeHeight=p5.prototype.random(minInnerEyeHeight,maxInnerEyeHeight);
    this.earY=p5.prototype.random(minEarY,maxEarY);
    this.innerEarWidth=this.earWidth*p5.prototype.random(minInnerEarWidth,maxInnerEarWidth);
    this.innerEarHeight=this.headHeight*p5.prototype.random(minInnerEarHeight,this.getMaxInnerEarHeight());
    this.mouthHeight=p5.prototype.random(minMouthHeight,this.getMaxMouthHeight());
    this.mouthWidth=p5.prototype.random(minMouthWidth,maxMouthWidth);
    this.hasTeeth=Math.random()<0.6;
    this.mouthY=p5.prototype.random(this.getMinMouthY(),this.getMaxMouthY());
    this.numberOfteeth=Math.floor(p5.prototype.random(minNumberOfteeth,maxNumberOfTeeth));
   
  
  }
  
  getMaxEyeX(){
    return this.headWidth/2+this.eyeWidth*.25;
  }
  getMinMouthY(){
    return this.noseY+this.noseHeight/2+this.mouthHeight/2; 
  }
  getMaxMouthY(){
    return this.headHeight/2-this.mouthHeight/2;
  }
  getMaxMouthHeight(){
    return this.headHeight/2-(this.noseY+this.noseHeight/2);
  }
  getMaxNoseWidth(){
    if (this.noseDirection=="right"||this.earShape=="none"){
      return maxNoseWidth;
    }
    return this.headWidth/2-.3;
  }
  getMaxInnerEarHeight(){
    let size=map(this.headHeight/2+this.sideBurnHeight,this.headHeight/2+minSideBurnHeight,this.headHeight/2+maxSideBurnHeight,minInnerEarHeight,maxInnerEarHeight);
    if(size<maxInnerEarHeight){
      return size;
    }
    return maxInnerEarHeight;
  }
  
  drawSkin(){
    rectMode(CENTER);
    fill(this.skinColour);
    quad(-this.headWidth/2, -this.headHeight/2, this.headWidth/2, -this.foreHeadHeight,
    this.headWidth/2, this.headHeight/2, -this.headWidth/2, this.headHeight/2);
    
  }
  drawFace(positions){
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
    if(this.earY+this.innerEarHeight/2>this.headHeight/4){
      this.earShape="none";
      return;
    }
    if(this.earShape=="circle"){
      ellipseMode(CENTER);
      ellipse(-this.headWidth/2-this.earWidth/2,this.earY,this.innerEarWidth,this.innerEarHeight);
    }
    else if(this.earShape=="square"){
      
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
    //resize the inner eye width or height so that there is some white in the eye if both are a large size
    if(this.innerEyeWidth>innerEyeResizeSize&&this.innerEyeHeight>innerEyeResizeSize-.1){
      //do a more extreme resize if the eye is tiny and the pupil is big 
      if(this.innerEyeWidth+this.innerEyeHeight>=1.1&&this.eyeWidth+this.eyeHeight<3){
        
        if(this.innerEyeWidth<this.innerEyeHeight){
          this.innerEyeWidth=.4;
        }
        else{
          this.innerEyeHeight=.4;
        }
        this.eyeStroke=false;
      }
      //resize whichever is smaller of height and width to keep it about a 50% chance of which is being resized
      else if(this.innerEyeWidth<this.innerEyeHeight){
        this.innerEyeWidth=innerEyeResizeSize;
      }
      else{
        this.innerEyeHeight=innerEyeResizeSize;
      }
    }
     //resize the eyes if both the width and heigh are so small they just look black
     if(this.eyeWidth<eyeResizeSize&&this.eyeHeight<eyeResizeSize){
      if(this.eyeWidth<this.eyeHeight){
        this.eyeWidth=eyeResizeSize;
      }
    }

    //make a cyclops if the eyes will overlap   
    if(this.eyeX-this.eyeWidth/2<0){
      this.eyeX=0;
    }
    //left eye
    fill(this.eyeBallCol);
    ellipse(-this.eyeX, this.eyeY, this.eyeWidth, this.eyeHeight);
    if(!this.eyeStroke){
      strokeWeight(0);
    }
    
    fill(this.eyeCentreCol);
    ellipse(-this.eyeX, this.eyeY, this.eyeWidth*this.innerEyeWidth, this.eyeHeight*this.innerEyeHeight);
    strokeWeight(myStrokeWeight);
    //draw right eye if not a cyclops
    if(this.eyeX!=0){
      fill(this.eyeBallCol);
      ellipse(this.eyeX, this.eyeY, this.eyeWidth, this.eyeHeight);
      fill(this.eyeCentreCol);
      if(!this.eyeStroke){
        strokeWeight(0);
      }
      ellipse(this.eyeX, this.eyeY, this.eyeWidth*this.innerEyeWidth, this.eyeHeight*this.innerEyeHeight);
      strokeWeight(myStrokeWeight);
    }
  }
  drawNose(){
    fill(this.noseCol);
    //make gap between mouth and nose if nose and mouth are too close
    let noseHeightReduction=0;
    if(this.noseY+this.noseHeight/2+minMouthNoseGap>=this.mouthY-this.mouthHeight/2){
      noseHeightReduction=minMouthNoseGap;
    }
    //draw left facing:
    if(this.noseDirection=="left"){
      triangle(this.noseX,this.noseY-this.noseHeight/2,this.noseX,this.noseY+this.noseHeight/2-noseHeightReduction,this.noseX-this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
    }
    //draw right facing:
    else if(this.noseDirection=="right"){
      triangle(this.noseX,this.noseY-this.noseHeight/2,this.noseX,this.noseY+this.noseHeight/2-noseHeightReduction,this.noseX+this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
    }
    //draw symetrical nose
    else{
      triangle(this.noseX,this.noseY-this.noseHeight/2,this.noseX+this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction,this.noseX-this.noseWidth,this.noseY+this.noseHeight/2-noseHeightReduction);
    }
   
  }

}