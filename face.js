/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = 
false;
//  true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 9;

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
  //   push();
  //   scale(1);
  //  console.log(positions);
    this.face.drawFace(positions);
   
  stroke(225,255,255);
   // this.draw_segment(positions.nose_bridge);
     stroke(225,0,0);
    //  this.draw_segment(positions.left_eye);
    //  this.draw_segment(positions.right_eye);
  //    this.draw_segment(positions.left_eyebrow);
     //this.draw_segment(positions.nose_tip);
    // // this.draw_segment(positions.bottom_lip);
    //   stroke(0,225,0);
    // // // //  this.draw_segment(positions.nose_tip);
    //     this.draw_segment(positions.top_lip);

      //  stroke(255);
      //   ellipse(positions.left_eye[2][0],positions.left_eye[2][1],.05);
      //   ellipse(positions.left_eye[4][0],positions.left_eye[4][1],.05);
      //   ellipse(positions.right_eye[1][0],positions.right_eye[1][1],.05);
      //   ellipse(positions.right_eye[5][0],positions.right_eye[5][1],.05);
      //   ellipse(positions.top_lip[0][0],positions.top_lip[0][1],.05);
      //   ellipse(positions.top_lip[6][0],positions.top_lip[6][1],.05);
      //  ellipse(positions.top_lip[4][0],positions.top_lip[4][1],.05);
      //  ellipse(positions.bottom_lip[3][0],positions.bottom_lip[3][1],.05);
   //pop();
   }
  
  

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
    this.face.sideBurn=sideBurns[round(map(settings[0], 0, 100, 0,sideBurns.length))];
    this.face.sideBurnHeight=map(settings[1], 0, 100, minSideBurnHeight, maxSideBurnHeight);
    this.face.noseDirection=noseDirections[round(map(settings[2], 0, 100, 0,noseDirections.length))];
    
    this.face.pupilSize=pupilSizes[round(map(settings[3], 0, 100, 0,pupilSizes.length))];
    this.face.earShape=earShapes[round(map(settings[4], 0, 100, 0,earShapes.length))];
    this.face.earY=map(settings[5], 0, 100, minEarY, maxEarY);
   
    this.face.hasTeeth=0.5<map(settings[6], 0, 100, 0,1);
    
    this.face.numberOfteeth=Math.floor(map(settings[7], 0, 100, minNumberOfteeth,maxNumberOfTeeth));
    this.face.masculineLip=0.5<map(settings[8], 0, 100, 0,1);
    
  }

  // /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {

    let settings = new Array(NUM_SLIDERS);
   settings[0] = map(sideBurns.indexOf(this.face.sideBurn),0,sideBurns.length, 0, 100);
   
     settings[1] = map(this.face.sideBurnHeight, minSideBurnHeight,maxSideBurnHeight,0, 100);
    settings[2]=map(noseDirections.indexOf(this.face.noseDirection),0,noseDirections.length,0,100);
    settings[3]= map(pupilSizes.indexOf(this.face.pupilSize),0,pupilSizes.length, 0, 100);

   
    settings[4]=map(earShapes.indexOf(this.face.earShape), 0,earShapes.length, 0, 100);
    settings[5]= map(this.face.earY, minEarY, maxEarY, 0, 100);
   
    settings[6]=map(this.face.hasTeeth?1:0, 0,1, 0, 100);
    settings[7]=map(this.face.numberOfteeth, minNumberOfteeth,maxNumberOfTeeth, 0, 100);
    settings[8]=map(this.face.masculineLip?1:0, 0,1, 0, 100);
    return settings;
  }
}
