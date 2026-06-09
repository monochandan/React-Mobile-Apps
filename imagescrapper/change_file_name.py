import os

os.getcwd()

# '''File hase wiered names, so chainging into serialized name'''

image_collection = "D:\\DATASET\\image_download\\image_download\\final_dataset\\images\\test"
label_collection = "D:\\DATASET\\image_download\\image_download\\final_dataset\\labels\\test"

print(image_collection)
print(label_collection)

val = 60673

from pathlib import Path

image_dir = Path(image_collection)
label_dir = Path(label_collection)

# find matched pairs (same stem name)
pairs = []
for img in sorted(image_dir.glob("*.*")):
    lbl = label_dir / f"{img.stem}.txt"
    if lbl.exists():
        pairs.append((img, lbl))
    else:
        print(f"No matching label for: {img.name}")

print(f"Found {len(pairs)} matched pairs")

# rename to temp first to avoid conflicts
for i, (img, lbl) in enumerate(pairs):
    print(f"renaiming {img.name} and {lbl.name} to temp_{i}")
    img.rename(img.parent / f"temp_{i}{img.suffix}")
    lbl.rename(lbl.parent / f"temp_{i}.txt")

# rename to final names
for i, (img, lbl) in enumerate(pairs):
    print(f"renaming {img.name} and {lbl.name} to file_{i+1}")
    ext = img.suffix
    (img.parent / f"temp_{i}{ext}").rename(img.parent / f"file_{i+val}{ext}")
    (lbl.parent / f"temp_{i}.txt").rename(lbl.parent / f"file_{i+val}.txt")

print("Done renaming.")