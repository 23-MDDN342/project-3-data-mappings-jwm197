/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 20;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];


// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  this.face=new myFace();


  // /*
  //  * Draw the face with position lists that include:
  //  *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
  //  *    bottom_lip, top_lip, nose_tip, nose_bridge, 
  //  */  
   this.draw = function(positions) {
    push();
    scale(1);
   // console.log(positions);
    this.face.drawFace(positions);
   
  stroke(225,255,255);
  //  this.draw_segment(positions.nose_bridge);
    stroke(225,0,0);
  //  this.draw_segment(positions.nose_tip);
    this.draw_segment(positions.bottom_lip);
    stroke(0,225,0);
    //  this.draw_segment(positions.nose_tip);
      this.draw_segment(positions.top_lip);
    pop();
   }
  
  //   // head
  //   ellipseMode(CENTER);
  //   stroke(stroke_color);
  //   fill(this.mainColour);
  //   ellipse(segment_average(positions.chin)[0], 0, 3, 4);
  //   noStroke();


  //   // mouth
  //   fill(this.detailColour);
  //   ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

  //   // eyebrows
  //   fill( this.eyebrowColour);
  //   stroke( this.eyebrowColour);
  //   strokeWeight(0.08);
  //   this.draw_segment(positions.left_eyebrow);
  //   this.draw_segment(positions.right_eyebrow);

  //   // draw the chin segment using points
  //   fill(this.chinColour);
  //   stroke(this.chinColour);
  //   this.draw_segment(positions.chin);

  //   fill(100, 0, 100);
  //   stroke(100, 0, 100);
  //   this.draw_segment(positions.nose_bridge);
  //   this.draw_segment(positions.nose_tip);

  //   strokeWeight(0.03);

  //   fill(this.lipColour);
  //   stroke(this.lipColour);
  //   this.draw_segment(positions.top_lip);
  //   this.draw_segment(positions.bottom_lip);

  //   let left_eye_pos = segment_average(positions.left_eye);
  //   let right_eye_pos = segment_average(positions.right_eye);

  //   // eyes
  //   noStroke();
  //   let curEyeShift = 0.04 * this.eye_shift;
  //   if(this.num_eyes == 2) {
  //     fill(this.detailColour);
  //     ellipse(left_eye_pos[0], left_eye_pos[1], 0.5, 0.33);
  //     ellipse(right_eye_pos[0], right_eye_pos[1], 0.5, 0.33);

  //     // fill(this.mainColour);
  //     // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
  //     // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
  //   }
  //   else {
  //     let eyePosX = (left_eye_pos[0] + right_eye_pos[0]) / 2;
  //     let eyePosY = (left_eye_pos[1] + right_eye_pos[1]) / 2;

  //     fill(this.detailColour);
  //     ellipse(eyePosX, eyePosY, 0.45, 0.27);

  //     fill(this.mainColour);
  //     ellipse(eyePosX - 0.1 + curEyeShift, eyePosY, 0.18);
  //   }
  //  // fill(0)
  //  //ellipse(0,0, 0.5,0.5) center point
  //  //rect(-2,-2,4.5,4) sizing debug 
  // }

  // // example of a function *inside* the face object.
  // // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.face.sideBurn=sideBurns[Math.floor(map(settings[0], 0, 100, 0,sideBurns.length))];
    this.face.sideBurnHeight=map(settings[1], 0, 100, minSideBurnHeight, maxSideBurnHeight);
    this.face.noseHeight=map(settings[2], 0, 100, minNoseHeight, maxNoseHeight);
    
    
    
    this.face.noseDirection=noseDirections[Math.floor(map(settings[3], 0, 100, 0,noseDirections.length))];
    
    this.face.noseY=map(settings[4], 0, 100, minNoseY, maxNoseY);
    this.face.noseWidth=map(settings[5], 0, 100, minNoseWidth, this.face.getMaxNoseWidth());
    
    this.face.eyeWidth=map(settings[6], 0, 100, minEyeWidth, maxEyeWidth);
    this.face.eyeHeight=map(settings[7], 0, 100, minEyeHeight, maxEyeHeight);
    this.face.innerEyeWidth=map(settings[8], 0, 100, minInnerEyeWidth, maxInnerEyeWidth);
    this.face.innerEyeHeight=map(settings[9], 0, 100, minInnerEyeHeight, maxInnerEyeHeight);
    this.face.eyeX=map(settings[10], 0, 100, minEyeX, this.face.getMaxEyeX());
    this.face.earShape=earShapes[Math.floor(map(settings[11], 0, 100, 0,earShapes.length))];
    this.face.earY=map(settings[12], 0, 100, minEarY, maxEarY);
    this.face.innerEarWidth=this.face.earWidth*map(settings[13], 0, 100, minInnerEarWidth, maxInnerEarWidth);
    this.face.innerEarHeight=this.face.headHeight*map(settings[14], 0, 100, minInnerEarHeight, this.face.getMaxInnerEarHeight());
    this.face.hasTeeth=0.5<map(settings[15], 0, 100, 0,1);
    this.face.mouthWidth=map(settings[16], 0, 100, minMouthWidth,maxMouthWidth);
    this.face.mouthHeight=map(settings[17],0,100,minMouthHeight,this.face.getMaxMouthHeight());
    this.face.mouthY=map(settings[18], 0, 100, this.face.getMinMouthY(), this.face.getMaxMouthY());
    this.face.numberOfteeth=Math.floor(map(settings[19], 0, 100, minNumberOfteeth,maxNumberOfTeeth));

    
  }

  // /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {

    let settings = new Array(3);
   settings[0] = map(sideBurns.indexOf(this.face.sideBurn),0,sideBurns.length, 0, 100);
     settings[1] = map(this.face.sideBurnHeight, minSideBurnHeight,maxSideBurnHeight,0, 100);
    settings[2] = map(this.face.noseHeight, minNoseHeight, maxNoseHeight, 0, 100);
   

    settings[3]=map(noseDirections.indexOf(this.face.noseDirection), 0,noseDirections.length, 0, 100);
    settings[4]=map(this.face.noseY, minNoseY, maxNoseY, 0, 100);
    settings[5]=map(this.face.noseWidth,  minNoseWidth, this.face.getMaxNoseWidth(),0, 100);
    settings[6]=map(this.face.eyeWidth, minEyeWidth, maxEyeWidth, 0, 100);
    settings[7]=map(this.face.eyeHeight, minEyeHeight, maxEyeHeight, 0, 100);
    settings[8]= map(this.face.innerEyeWidth, minInnerEyeWidth, maxInnerEyeWidth, 0, 100);
    settings[9]=map(this.face.innerEyeHeight, minInnerEyeHeight, maxInnerEyeHeight, 0, 100);
    settings[10]=map(this.face.eyeX, minEyeX, this.face.getMaxEyeX(), 0, 100);
    settings[11]=map(earShapes.indexOf(this.face.earShape), 0,earShapes.length, 0, 100);
    settings[12]= map(this.face.earY, minEarY, maxEarY, 0, 100);
    settings[13]=map(this.face.innerEarWidth/this.face.earWidth, minInnerEarWidth, maxInnerEarWidth, 0, 100);
    settings[14]=map(this.face.innerEarHeight/this.face.headHeight, minInnerEarHeight, this.face.getMaxInnerEarHeight(), 0, 100);
    settings[15]=map(this.face.hasTeeth?1:0, 0,1, 0, 100);
    settings[16]=map(this.face.mouthWidth, minMouthWidth,maxMouthWidth, 0, 100);
    settings[17]= map(this.face.mouthHeight,minMouthHeight,this.face.getMaxMouthHeight(),0,100);
    settings[18]=map(this.face.mouthY, this.face.getMinMouthY(), this.face.getMaxMouthY(), 0, 100);
    settings[19]=map(this.face.numberOfteeth, minNumberOfteeth,maxNumberOfTeeth, 0, 100);
    
    
    
   
    
    

    
    return settings;
  }
}
