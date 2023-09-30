with open("data.txt", "r") as file:
    contents = file.read()
    line = contents.strip()
    words = line.split()
for word in words:
     print(f"{word}\t1")