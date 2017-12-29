from random import randint

board = []
limit = 7
number = 2
round = 7

for x in range(0, limit):
  board.append(["O"] * limit)

def print_board(board):
  for row in board:
    print " ".join(row)

print_board(board)

def random_row(board):
  return randint(0, len(board) - 1)

def random_col(board):
  return randint(0, len(board[0]) - 1)

# ship_row = random_row(board)
# ship_col = random_col(board)

ship_location = []
for i in range(number):
    ship_location.append([random_row(board), random_col(board)])
    # ship_row.append(random_row(board))
    # ship_col.append(random_col(board))
# print ship_row
# print ship_col
# print ship_location

def instruction(guess_location, ship_location):
    row_idea = ''
    col_idea = ''
    result = ''
    for i in range(number):
        if (guess_location[0] > ship_location[i][0]):
            row_idea = 'North'
        if (guess_location[0] < ship_location[i][0]):
            row_idea = 'South'
        if (guess_location[1] > ship_location[i][1]):
            col_idea = 'West'
        if (guess_location[1] < ship_location[i][1]):
            col_idea = 'East'
        result += 'There is a WarShip is at Your ' + row_idea + col_idea + '\n'
    return result

for turn in range(round):
  print "Turn", turn + 1
  guess_row = int(raw_input("Guess Row: ")) - 1
  guess_col = int(raw_input("Guess Col: ")) - 1

  # Write your code below!
  guess_location = [guess_row, guess_col]
  if (guess_location in ship_location):
    number -= 1
    if (number == 0):
        board[guess_row][guess_col] = 'Y'
        print('Congratulations! You sank all of the battleships!')
        print_board(board)
        break
    else:
        print('You sank one battleship!')
        board[guess_row][guess_col] = 'Y'
        ship_location.remove(guess_location)
        print_board(board)
  else:
    if(guess_row not in range(limit) or guess_col not in range(limit)):
      print('Oops, that\'s not even in the ocean.')
    elif (board[guess_row][guess_col] == 'X'):
      print('You guessed that one already.')
    else:
      print('You missed my battleship!')
      board[guess_row][guess_col] = 'X'
      print_board(board)
    print(instruction(guess_location, ship_location))
    if(turn == 3):
      print('Game Over')

