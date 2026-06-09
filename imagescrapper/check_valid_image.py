from pathlib import Path

# During training find out some images are not in yolo format,
#  so checking the label files for the format (how many are in yolo format and how many are in pixel format)

count_yolo = 0
count_pixel = 0

image_folder = "D:\\DATASET\\yolo_train\\images"
label_folder = "D:\\DATASET\\yolo_train\\labels"


image_dir = Path(image_folder)
label_dir = Path(label_folder)

for f in label_dir.glob("*.txt"):
    # label = label_dir / f"{image.stem}.txt"
    # if not label.exists():
    #     print(f"No label for image: {image.name}")
    # else:
    print(f"Checking {f.name}...")
    with open(f, "r") as fp:
        for line in fp:
            vals = line.strip().split()

            if len(vals) != 5:
                continue

            coords = list(map(float, vals[1:]))

            if max(coords) <= 1:
                count_yolo += 1
            else:
                count_pixel += 1

print("YOLO:", count_yolo)
print("Pixel:", count_pixel)