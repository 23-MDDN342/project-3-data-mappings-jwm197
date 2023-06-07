const ease = new p5.Ease();
const groundY=canvasHeight/2;
let frameNo=0;

function draw_one_frame(cur_frac) {
	angleMode(DEGREES);
	frameNo=map(cur_frac,0,1,0,24);//convert cur frac to a number between 0 and 24 to make it eaiser to  do keyframing 
	fill(255);
	rectMode(CORNER);
	rect(0,0,width,height);//background
	push(); 
	
	translate(0, canvasHeight/6);
	drawTree();
	drawShip(cur_frac);
	drawGround();
	pop();
	drawCloud();
}
/**Draw the clouds */
function drawCloud(){
	let numOfClouds=4;
	let cloudY=canvasHeight/4;
	fill(150);
	noStroke();
	let cloudScale;
	let maxScale=1.1;
	let minScale=0.9
	if(frameNo<12){
		cloudScale=map(frameNo,0,12,minScale,maxScale);
	}
	else{
		cloudScale=map(frameNo,12,24,maxScale,minScale);
	}
	
	for(let i=-1;i<numOfClouds;i++){
		let cloudX=map(frameNo,0,24,canvasWidth/numOfClouds+i*canvasWidth/numOfClouds,+i*canvasWidth/numOfClouds);
		push();
		translate(cloudX,cloudY);
		scale(1.5);
		scale(cloudScale);
		ellipse(+width/40,-canvasHeight/200,canvasHeight/30);
		ellipse(+width/75,-canvasHeight/200,canvasHeight/40);
		rect(0,0,width/25,canvasHeight/35,20);
		pop();
	}
	

}
/**draw the ship */
function drawShip(cur_frac){
	//keyframes for the ship to change on height:
	const jumpStart=9;
	const jumpEnd=18;
	const jumpTop=(jumpStart+jumpEnd)/2-1;

	let shipY=groundY-canvasHeight/10;
	const jumpHeight=canvasHeight/4;//max ship height
	const shipRiseEase = ease.circularInOut(cur_frac*1.5);
	rectMode(CENTER);
	//work out ship height:
	if(frameNo>=jumpStart&&frameNo<=jumpTop){//rising in height
		shipY=map(shipRiseEase, 0, 1, groundY-canvasHeight/10, jumpHeight);
	}
	else if(frameNo>=jumpTop&&frameNo<=jumpEnd){//lowering in height
		shipY=map(frameNo, jumpTop, jumpEnd,jumpHeight, groundY-(canvasHeight/10));
	}
	else{//default "on the ground" height
		shipY=groundY-(canvasHeight/10);
	}
	
	
	
	let shipX=width/5;
	let shipWidth=width/10;
	let lightDomewidth=width/50;
	noStroke();
	//inner light
	fill(242, 226, 5,200);
	beginShape();
	vertex(shipX-lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+width/30,shipY+height/4);
	vertex(shipX-width/30,shipY+height/4);
	endShape(CLOSE);
	//wider light
	fill(242, 226, 5,100);
	vertex(shipX-lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+lightDomewidth/2,shipY+canvasHeight/50);
	vertex(shipX+width/20,shipY+height/4);
	vertex(shipX-width/20,shipY+height/4);
	endShape(CLOSE);

	//draw the ship
	stroke(0);
	strokeWeight(width/500);
	fill(255);
	ellipse(shipX,shipY+canvasHeight/50,lightDomewidth,width/60);//bottom dome
	ellipse(shipX,shipY,shipWidth,canvasHeight/30);//main body
	arc(shipX,shipY-canvasHeight/60,width/30,width/30,160,20,CHORD);//top dome
	
	//small circles on the body:
	let smallCircleWidth=width/150;
	ellipse(shipX,shipY+canvasHeight/180,smallCircleWidth);// centre small circle
	ellipse(shipX-width/40,shipY,smallCircleWidth);//left
	ellipse(shipX+width/40,shipY,smallCircleWidth);//right
}
/**Draws the ground */
function drawGround(){
	//draws the voronoi pattern
	let voronoiSegments=70;
	smooth();
	voronoiCellStrokeWeight(width/800);
	voronoiCellStroke(0);
	voronoiSiteFlag(false);
	randomSeed(6);
	//code adapted from the in class noise example 
	let noiseColor;
	let pixelSize = width/100;
	rectMode(CORNER);
	let x=0;
	let y=0;
	for (let i = 0; i < voronoiSegments; i++) {
		x=random(0, width);
		y=random(0,canvasHeight-groundY+canvasHeight/20);
		noiseColor = getNoiseValue(pixelSize*x,pixelSize*y, 0.8, "noiseColor",0,1, width/5 );
		noiseLerp = lerpColor(color(255),color(200),noiseColor);
		voronoiSite(x,y,noiseLerp);
	}
	
	voronoi(width, canvasHeight-groundY-canvasHeight/6, false);
	voronoiDraw(0, groundY, true, false);
	
	
	//drawn ground line:
	stroke(0);
	strokeWeight(width/800);
	line(0, groundY, width, groundY);
	
}
/**
 * Draws the trees 
 */
function drawTree(){
	rectMode(CENTER);
	let trunkHeight=canvasHeight/30;
	let treeX=map(frameNo,0,24,canvasWidth/2,0-canvasWidth/20);
	strokeWeight(width/500);
	stroke(0);
	//draw left tree
	line(treeX,groundY,treeX,groundY-trunkHeight);
	push();
	translate(treeX,groundY);
	drawBranch(trunkHeight,0);
	pop();
	push();
	//draw right tree
	translate(width/2+canvasWidth/20,0);
	line(treeX,groundY,treeX,groundY-trunkHeight);
	push();
	translate(treeX,groundY);
	drawBranch(trunkHeight,0);
	pop();
	pop();
}
/** draw a trees branch*/
function drawBranch(branchLength,numOfBranches){
	let angle=340;
	line(0,0,0,-branchLength);
	translate(0,-branchLength);
	if(numOfBranches<4){
		push();
		rotate(angle);
		drawBranch(branchLength*.8,numOfBranches+1);
		pop();
		push();
		rotate(-angle);
		drawBranch(branchLength*.8,numOfBranches+1);
		pop();
	}
}

