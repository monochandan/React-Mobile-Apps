# serializing all image from different folders into one folder
import os
os.getcwd()
collection = "C:\\Users\\looka\\OneDrive\\Documents\\myPhoto\\image_download\\spinach"

print(collection)

add = 314
# print(os.listdir(collection))

files = os.listdir(collection)
# first rename all to temp names to avoid conflicts
for i, filename in enumerate(files):
    os.rename(os.path.join(collection, filename), os.path.join(collection, f"temp_{i+add}.jpg"))

# then rename temp names to final 0, 1, 2, 3...
for i, filename in enumerate(os.listdir(collection)):
    os.rename(os.path.join(collection, filename), os.path.join(collection, str(i+add) + ".jpg"))