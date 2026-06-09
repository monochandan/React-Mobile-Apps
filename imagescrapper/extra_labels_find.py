from pathlib import Path

# if there is mismatch number of files in image and label folder

image_dir = Path("D:\DATASET\yolo_train\images")
label_dir = Path("D:\\DATASET\\yolo_train\\labels")

image_names = {p.stem for p in image_dir.glob("*.*")}
label_names = {p.stem for p in label_dir.glob("*.txt")}

missing_labels = image_names - label_names
extra_labels = label_names - image_names

print("Images without labels:", len(missing_labels))
print(missing_labels)

print("Labels without images:", len(extra_labels))
print(extra_labels)