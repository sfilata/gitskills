import turtle


def drawTree(length):
    if length > 10:
        turtle.forward(length)
        turtle.right(30)
        drawTree(length - 10)
        turtle.left(60)
        drawTree(length - 10)
        turtle.right(30)
        turtle.backward(length)


def main():
    turtle.left(90)
    turtle.up()
    turtle.backward(120)
    turtle.down()
    drawTree(60)
    turtle.exitonclick()


if __name__ == "__main__":
    main()