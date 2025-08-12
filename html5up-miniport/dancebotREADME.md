## Demo & Music Video

### Demo
Example of Dancebot's functionality: 

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/p9QbDhW3kTY/0.jpg)](https://www.youtube.com/watch?v=p9QbDhW3kTY)

### Music Video
Inspired by Dylan Glas, we created a music video featuring Dancebot. Special shoutout and many thanks to Danny (Turtlebot Nanny) for his constant help debugging the TBs! 

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/dN4DkEUt5Js/0.jpg)](https://www.youtube.com/watch?v=dN4DkEUt5Js)

## Project Description
### Goals, Interesting Features, Execution  
Our project, **Dancebot**, is meant to allow users to interact with turtlebots via computer vision to instruct the turtlebots to complete a sequential dance routine. The project is interesting because of how it is centered around a Human Robot Interaction between a person and the turtlebot; the order and number of dance moves are entirely determined by the user, and the turtlebot is capable of executing them in sequence. The project also involves the creation of a trained computer vision model which allows a turtlebot to be able to recognize and process human hand gestures – the model we trained is capable of significantly expanding functionality beyond the scope of our project due to its large scale, and our image preprocessing scripts can be used to add more data (for example, with varying backgrounds) if needed. At the end of our project, we were able to program 5 specific dance moves (The Wave, The Chop, The Spin, The Point, and The Whip/Nae Nae) and a computer vision model capable of recognizing the 24 static signs of American Sign Language according to the Sign Language MNIST dataset. We then were able to choose 5 specific signs to correspond with our five dance moves, and we were able to use the turtlebot camera to have the robot to be able to witness a sequence of signs and execute the corresponding dance moves. This shows the integration of the model and dances: the prediction from the model determines the identity of the dance move.  
### Components and Functionalities
**DanceBot** has 2 main components: the computer vision model and the dance moves. The model is trained in `train.py` and the program is executed from `dance.py`. We programmed the computer vision model using Keras, a package from the TensorFlow library. We searched online for a model that would be able to recognize distinct hand positions and eventually decided on using the Sign Language MNIST data set and choosing a distinct subset of recognizable gestures; since the quality of the turtlebot camera is low (28 by 28 pixels), we wanted to ensure that the symbols we chose to associate with dance moves would not be easily confused during the resizing of the images. We also collected additional images of our chosen signs (A, B, C, F, and Y) directly from the turtlebot camera to add to both the training and testing data. We trained our model for 32 epochs, which resulted in a model with 98% accuracy when run on our testing dataset. The model was trained to identify 24 classes of letters (excluding J and Z which require motion) using 27,455 images from the pre-existing training data and 7,172 from the pre-existing testing data, as well as our additional 6000 images, 1000 for training and 5000 for testing.  
The second component, the dance moves, are programmed via the turtlebot wheels and with the turtlebot OpenManipulator arm. We chose our five distinct signs and attempted to associate them with common dance moves: The Wave with Sign A, The Whip/Nae Nae with Sign B, The Chop with Sign C, The Spin with Sign F, and The Point with Sign Y. We then integrated these moves to correspond with predictions from our model in order to program responses to the observed signs; if the model predicts that an observed sign is an A, the execute_dance() method in our class calls the dance move for A (The Wave). 

## System Architecture

### Robotics Algorithm: Computer Vision Model
The main robotics algorithm we implemented in this project was a computer vision model that uses a neural network to recognize sign-language signs as perceived through the turtlebot's camera. We trained our model with Keras (from TensorFlow) on 41127 images, including 34582 from the pre-existing MNIST sign-language dataset and 6546 images that we took using our hands on the turtlebot's camera. We used the `image.py` and `preprocess.py` files in our repository to take and format the images for data training. We used 60% of the images for Training, 20% for Validation, and 20% for Testing. We trained the model over 32 epochs (until it converged), and the model's accuracy is 98%.

The code for the CV model is in *train.py* in our GitHub. We trained the model on NoMachine in order to ensure compatibility between the model output and the functinoality available on NoMachine for reading in the model. We access the model in *dance.py* by calling `self.model = keras.models.load_model(path_prefix + '/model0_nomachine.keras')`. 

### Secondary Components: Dance Moves and User Input
We incorporated a couple smaller components in order to fulfill the functionality of Dancebot. We programmed 5 unique dance moves for the turtlebot, which can be seen in *dance.py* as the functions `action_A`, `action_B`, `action_C`, `action_F`, and `action_Y`. Each of these functions uses a combination of cmd_vel messages and OpenManipulator arm commands in order to direct the robot to execute a given sequence of dance moves. 

Another secondary component we integrated was a simple TUI to allow the user to choose how many dance moves the turtlebot will execute. At the beginning of the program, the user is prompted to input an integer. The user then displays as many signs as they chose, and then the robot performs the corresponding dance moves in order. 

## ROS Node Diagram
![alt text](https://github.com/Intro-Robotics-UChicago-Spring-2024/dancebot/blob/main/rosnodes.png)

## Execution
Our code requires $7$ terminals to run correctly. Begin by calling `git pull` on the `dancebot` repository.  
In the first terminal, run the following command to allow for communication via ROS nodes.  
```
roscore 
```
In the second terminal, run the following commands to connect to the turtlebot. 
```
ssh pi@IP_OF_TURTLEBOT
set_ip LAST_THREE_DIGITS
bringup
```
In the third terminal, run the following commands to connect to the turtlebot camera.
```
ssh pi@IP_OF_TURTLEBOT
set_ip LAST_THREE_DIGITS
bringup_cam
```
In the fourth terminal, run the following command to decompress the turtlebot images:
```
rosrun image_transport republish compressed in:=raspicam_node/image raw out:=camera/rgb/image_raw
```
In the fifth terminal, run the following command to bring up the turtlebot OpenManipulator arm:
```
roslaunch turtlebot3_manipulation_bringup turtlebot3_manipulation_bringup.launch
```
In the sixth terminal, run the following command to launch MoveIt to manipulate the turtlebot arm: 
```
roslaunch turtlebot3_manipulation_moveit_config move_group.launch
```
Finally, in the seventh terminal, run the `dance.py` script with the following command: 
```
rosrun dancebot dance.py
```


## Challenges, Future Work, and Takeaways

### Challenges
Given that this was our first time working with a neural network for image recognition (except for briefly in Lab), we faced a lot of technical difficulties with TensorFlow. We repeatedly faced an error that “Tensor RT” was not found, and eventually worked around this by changing our version installations. We found out that there were different versions of TensorFlow on our local computers, which we tested on, as compared to NoMachine, which we had to run our final code on. As a result, we had to retrain our model on NoMachine, so that the output would be of a format compatible with loading the model from a file executed in NoMachine. Beyond our difficulties with TensorFlow, we also faced difficulties programming the robot’s movement. Given the Turtlebot’s inherently limited range of motion, we knew it would be challenging to evoke dance moves. However, we were reminded that robots work differently in reality than in theory when the TB would abort dance moves if we didn’t include enough sleep statements between them. As a result, our dance moves are slower and clunkier than ideal. Despite the challenges we faced, we were able to work through them as a team and end up with a project we are proud of!

### Future Work
We were not able to reach our stretch goal for this project, which was to implement an inverse kinematics algorithm in addition to our computer vision component. So, with more time, we would like to experiment with how this would augment our dancebot. Our original idea was to use inverse kinematics to have the turtlebot recreate human movementments, and we still think this would be a neat implementation. We would also add in another GUI if possible, for example allowing the human user to select a specific song for the bot to dance to. While a dancing turtlebot is not the most practical robotics project, there is certainly value in this project to the extent that it can be used to get people excited about and engaged with robots. 

### Takeaways
One takewaway from this project is that the turtlebot's camera is actually not terrible at training an image model. When we started the project, we initially thought we would have to use a different camera--either a depth-sensing one or our webcams--in order to get images that would be clear enough to train a computer vision model. However, given that the model we modified consisted of images that were highly pixelated (28 by 28), the grainy quality of the turtlebot did not cause any disadvantages. However, we did learn that using the TB camera results in an awkward angle to display sign language gestures at. Another takeaway we had is that it is hard to achieve optimal and smooth timing using ROS. Our project integrates multiple components of the TB: camera input, cmd_vel messages, and arm movements. When working with a real-life robot, there are often lags and errors with all of these components, so writing code in a way that controls for that and allows the program to be executed regardless proved challenging. We learned that it is important how we integrate our callback and publishing functions as well as the necessity of incorporating certain sleep messages. Overall, Dancebot was a fun project, and we learned a lot!

