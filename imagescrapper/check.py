# check the txt file , if the file does not contain bounding dox then 
# delete/mode to the destination folder,  the label txt file and corresponding image file

import os
from pathlib import Path
import shutil

label_folder = "D:\\DATASET\\yolo_valid\\labels"
image_folder = "D:\\DATASET\\yolo_valid\\images"

dest_folder = "D:\\DATASET\\image_download\\missmatch_data_valid"

image_dir = Path(image_folder) # path object
label_dir = Path(label_folder)

dest_path = Path(dest_folder) # txt and img will be copied into this folder

dest_path.mkdir(parents=True, exist_ok=True)
# convert to path
print(image_dir)
print(label_dir)
no_content_files = []
no_bounding_box_files = []

for label_file in label_dir.glob("*.txt"):
    print(f"Checking {label_file.name}...")
    with open(label_file, "r") as f:
        content = f.read().strip()
        if not content:
            # img_file_path = image_dir / f"{label_file.stem}.jpg"  # Assuming images are .jpg
            # if os.path.exists(img_file_path):
            #     os.remove(img_file_path)
            no_content_files.append(label_file)
        else:
            lines = content.splitlines()
            if all(len(line.strip().split()) != 5 for line in lines):
                no_bounding_box_files.append(label_file)

print(f"Found {len(no_content_files)} empty label files.")
print(no_content_files)
print("*"*20)
print(f"Found {len(no_bounding_box_files)} label files without bounding boxes.")
print(no_bounding_box_files)



for label_file in no_content_files + no_bounding_box_files:
    try:
        # Move the label file, txt,  to the destination folder
        print(f"Moving {label_file.name} to {dest_path}...")
        shutil.move(str(label_file), str(dest_path / label_file.name))
        image_file = image_dir / f"{label_file.stem}.jpg"  # Assuming images are .jpg

        # if image file exist, move the image file to the destination folder
        
        if image_file.exists():
            print(f"Moving {image_file.name} to {dest_path}...")
            shutil.move(str(image_file), str(dest_path / image_file.name))
        # other wise continue to next file, print the file name
        else:
            print(f"Image file not found for {label_file.name}")
            # continue
    except Exception as e:
        print(f"Error processing {label_file.name}: {e}")
        continue