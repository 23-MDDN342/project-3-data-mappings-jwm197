For this project, I have used a face system previously developed by me for a past assignment and have reworked it so that it could be used to create a digital mask to put on faces. Each face will look unique as an ai is trained on a set of faces and the results of the model generate the face. The colour scheme of these faces is inspired by the De Stijl movement. 
Due to the house-like design of the faces I included some sample images that are real estate related as I thought it would be funny to have houses selling houses. 
The training parameters used are:
Sideburn style: square if long hair, triangle if short hair, none if the person is bald.
Sideburn height: The length of their hair is as best matched as it can be to either overlap the ear the amount it does or stop at the top of it if the ear is visible.  If an ear isn’t visible match the length of the hair as best as it can.
Nose direction: “both” (front-facing) if the face is looking straight on, “left” if the face is a profile shot of the left side of the face and “right” if it is a profile shot of the right side of the face. 
Pupil size: Represents the hair colour of black, brown, red, blonde or grey/bald. If it is brown it is set to “wide”, black if “small”, red if “tall”, blonde if “large” and grey or bald if “tiny”.
Ear shape: “none” if neither ear is visible, “square” if one ear is visible, “circle” if 2 ears are visible and “triangle” if they are wearing something in/on their ear (earrings, earpiece etc) regardless of how many ears are shown.  
Inner ear y: The y position of the centre of their ear.  
Number of teeth: The number of teeth they are showing. Only does anything if has teeth is true. This is roughly mapped 1 to 1 but not exactly.  
Lip colour: red if masculine face and pink if feminine face.  
