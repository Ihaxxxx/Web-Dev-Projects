import pygame
import random

pygame.init()


width = 500
height = 500
col = 50
row = 50

WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

screen = pygame.display.set_mode((width, height))
clock = pygame.time.Clock()


def removeFromArray(arr,element):
#  removing the openSet element
 for element in arr:
  arr.remove(element)

def heuristic(a,b):
    # calculating a distcance from one path to another
    return abs(a.i - b.i) + abs(a.j - b.j)

class Spot:
    def __init__(self, i, j):
        self.i = i  # x 
        self.j = j  # y
        self.f = 0  
        self.g = 0  # edge value
        self.h = 0  # heuristic value 
        self.neighbour = [] # neighbours of the node
        self.previous = None
        self.wall = False
        if (random.random()<0.2):
            self.wall = True
      
    def show(self,color):
     if self.wall:
       color = BLACK
     W = width // col
     H = height // row  
     pygame.draw.rect(screen, color, (self.i * W, self.j * H, W - 1, H - 1))

    def addNeighbour(self,grid):
     if self.i < col - 1:
       self.neighbour.append(grid[self.i+1][self.j])
     if self.i > 0:
       self.neighbour.append(grid[self.i-1][self.j])
     if self.j < row - 1:
       self.neighbour.append(grid[self.i][self.j+1])
     if self.j > 0:
       self.neighbour.append(grid[self.i][self.j-1])
     if (self.i > 0 and self.j > 0):
       self.neighbour.append(grid[self.i-1][self.j-1])
     if (self.i < col - 1 and self.j > 0):
       self.neighbour.append(grid[self.i+1][self.j-1])
     if (self.i > 0 and self.j < row - 1):
       self.neighbour.append(grid[self.i-1][self.j+1])
     if (self.i < col - 1 and self.j < row - 1):
       self.neighbour.append(grid[self.i+1][self.j+1])
       
grid = [[Spot(i, j) for j in range(row)] for i in range(col)]

#  Add neighbour
for i in range(col):
 for j in range(row):
  grid[i][j].addNeighbour(grid)


start = grid[0][0]
end = grid[col - 1][row - 1]
start.wall = False
end.wall = False

open_set = [start]
closed_set = []

path = []

def main():
    global path
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        if open_set:
            current = min(open_set, key=lambda spot: spot.f)

            if current == end:
                print("Pathfinding complete!")
                running = False

            removeFromArray(open_set, current)
            closed_set.append(current)

            for neighbour in current.neighbour:
                if neighbour in closed_set or neighbour.wall:
                    continue

                temp_g = current.g + 1
                new_path = False

                if neighbour in open_set:
                    if temp_g < neighbour.g:
                        neighbour.g = temp_g
                        new_path = True
                else:
                    neighbour.g = temp_g
                    new_path = True
                    open_set.append(neighbour)

                if new_path:
                    neighbour.h = heuristic(neighbour, end)
                    neighbour.f = neighbour.g + neighbour.h
                    neighbour.previous = current
        else:
            print("No solution!")
            running = False

        # Draw everything
        screen.fill(BLACK)

        for i in range(col):
            for j in range(row):
                grid[i][j].show(WHITE)

        for spot in closed_set:
            spot.show(RED)

        for spot in open_set:
            spot.show(GREEN)

        path = []
        temp = current
        while temp.previous:
            path.append(temp)
            temp = temp.previous

        for spot in path:
            spot.show(BLUE)

        pygame.display.flip()
        clock.tick(30)

if __name__ == "__main__":
    main()