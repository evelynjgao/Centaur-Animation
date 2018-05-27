# Centaur-Animation
For this code, I created my own legs and arms using cylinders and spheres. My
main components of the legs are the thighs and the calves, created with
cylinders with different top and bottom radius. They are connected with a
spherical joint, and then a hoof and hoof joint is also attached to the calf.
In my code, I chose not to move the hooves and kept them static on the calves,
however, it is very easy to have the hooves rotate like the calves. I googled
horse leg anatomy drawings, and based my leg structure off of this drawing:

    http://www.equinespot.com/images/how-to-draw-horses-front-legs-part-1.jpg

The way my legs work is that the thighs are "parented" onto the body (the 
centaur object we load) by copying the body matrix, and then applying
transformations through matrices, including translations and rotation to get it
to the position and angle that I want, for me, I wanted it to be standing
upright by default. The joint is "parented" onto the thigh,the calf to the 
joint, the hoof joint to the calf, and finally the hoof to the hoof joint. 
The two variables that I left adjustable are the rotations (in the x direction)
of the thighs and calves so that I could have the legs moving in my animations.

I created my arms in a similar manner for the upper arm and lower arm, and a
static hand.

For my keybindings, I first made the poses for 0, 1, and 2. I did this by 
altering the angles of the following components: head, thighs, calves, upper 
arms, and lower arms into the pose that I wanted. For case 0, I realized the 
code defaults to 0, but I wanted it to be separate from my standing pose, so I 
defaulted to case 6, which I did not implement. My case 0 is based off this
image of a horse walking:

    https://img00.deviantart.net/141f/i2013/186d5bay_horse_walking_1_by_venomxbaby-d6c3cly.jpg

I added some arm movements to make it more interesting. For case 1, I had the
front legs be kicked up, and for case 2, hind legs kicked up.

For my animation, or case 3, I have the horse flying into the air, as if ready
to take flight. I utilized the clock's getDelta function to animate the 
different components by incrementing each part by a timer. I have my body move 
forward and upwards, and my different leg components rotate and form poses. I 
lifted my arms straight out as when children simulate airplanes. I reset this 
animation with another keypress of 3, which resets all my parameters and runs 
the animation again.

For case 4, I want to put the camera on the hind left calf and have it look 
toward the front right calf. I had issues setting up the location of the camera
because I had unknowingly put it into the leg cylinder, and thus I could not 
see anything. I simulated the camera position with a sphere and discovered I 
had to move the camera forward in the z direction to have it on the outside of 
my leg and thus able to view. To test that my camera was indeed following the 
movements of my left leg, I animated the centaur in this case so that it is 
kicking its hind left leg back and forth, which is simulated by the camera view
as well.

Finally, I added another animation as my case 5. 
I already added my spherical joints and arms that I could animate, so when I saw 
the sphere in the scene, my instinct was to move that around too. I wanted it 
to have some kind of interaction with my centaur, so I decided to have my 
centaur jump back and forth over the sphere, which would move back and forth 
under the centaur. For this, I wanted an animation that would continue moving 
rather than stop like my third animation, and so I used the clock's 
getElapsedTime and the math sine and cosine functions to have it continuously 
moving back and forth on my screen. All moving aspects(body's forward, height, 
thighs, calves, upper arm, lower arm) are controlled by some variation of Math.
sin(t) or Math.cos(t).

Other resources I referred to throughout was the threejs website, mainly for 
Camera, Vector3, and Matrix4. I also looked at 
	
	https://stemkoski.github.io/Three.js/Keyboard.html

for inspiration with case 3.
