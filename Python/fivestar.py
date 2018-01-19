import turtle


def main():
    # turtle.forward(120)
    distance = 60
    step = 60
    amount = 4
    turtle.up()
    turtle.backward(200)
    turtle.down()
    turtle.pensize(2)
    turtle.color('blue')
    for j in range(amount):
        for i in range(5):
            turtle.forward(distance)
            turtle.right(144)
        distance += step
    turtle.exitonclick()


if __name__ == '__main__':
    main()


