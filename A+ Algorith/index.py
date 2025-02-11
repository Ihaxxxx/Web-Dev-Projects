import pygame
import random

# Initialize Pygame
pygame.init()

# Screen dimensions
WIDTH = 400
HEIGHT = 400
COLS = 55
ROWS = 50
W = WIDTH // COLS
H = HEIGHT // ROWS

# Colors
WHITE = (255, 255, 255)
BLACK = (0, 0, 0)
RED = (255, 0, 0)
GREEN = (0, 255, 0)
BLUE = (0, 0, 255)

# Pygame setup
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("A* Pathfinding")
clock = pygame.time.Clock()

# Heuristic function (Manhattan distance)
def heuristic(a, b):
    return abs(a.i - b.i) + abs(a.j - b.j)

# Remove element from a list
def remove_from_array(arr, element):
    if element in arr:
        arr.remove(element)

# Spot class
class Spot:
    def __init__(self, i, j):
        self.i = i
        self.j = j
        self.f = 0
        self.g = 0
        self.h = 0
        self.neighbours = []
        self.previous = None
        self.wall = random.random() < 0.2

    def show(self, color):
        if self.wall:
            color = BLACK
        pygame.draw.rect(screen, color, (self.i * W, self.j * H, W - 1, H - 1))

    def add_neighbours(self, grid):
        if self.i < COLS - 1:
            self.neighbours.append(grid[self.i + 1][self.j])
        if self.i > 0:
            self.neighbours.append(grid[self.i - 1][self.j])
        if self.j < ROWS - 1:
            self.neighbours.append(grid[self.i][self.j + 1])
        if self.j > 0:
            self.neighbours.append(grid[self.i][self.j - 1])

# Create grid
grid = [[Spot(i, j) for j in range(ROWS)] for i in range(COLS)]

# Add neighbours
for i in range(COLS):
    for j in range(ROWS):
        grid[i][j].add_neighbours(grid)

# Define start and end points
start = grid[0][0]
end = grid[COLS - 1][ROWS - 1]
start.wall = False
end.wall = False

# Open and closed sets
open_set = [start]
closed_set = []

# Path list
path = []

def main():
    global path
    running = True
    while running:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        if open_set:
            # Find the node with the lowest f score
            current = min(open_set, key=lambda spot: spot.f)

            if current == end:
                print("Pathfinding complete!")
                running = False

            remove_from_array(open_set, current)
            closed_set.append(current)

            for neighbour in current.neighbours:
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

        for i in range(COLS):
            for j in range(ROWS):
                grid[i][j].show(WHITE)

        for spot in closed_set:
            spot.show(RED)

        for spot in open_set:
            spot.show(GREEN)

        # Reconstruct path
        path = []
        temp = current
        while temp.previous:
            path.append(temp)
            temp = temp.previous

        for spot in path:
            spot.show(BLUE)

        pygame.display.flip()
        clock.tick(30)

    pygame.quit()

if __name__ == "__main__":
    main()