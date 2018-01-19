import turtle  
import time  
  
# 同时设置pencolor=color1, fillcolor=color2  
turtle.color("red", "yellow")  
  
turtle.begin_fill()  
for _ in range(24):  
    turtle.forward(200)  
    turtle.left(140)  
turtle.end_fill()  
  
turtle.mainloop()