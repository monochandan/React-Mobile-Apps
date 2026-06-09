import os

# folder_path = r"D:\DATASET\oid_dataset\vegitable\dataset\validation\bell_pepper\labels"
# item0 = "chicken_breast"
# item1 = "chicken_leg"
# item2 = "chicken_quater"
# item3 = "chicken_thigh"
# item4 = "chicken_wings"
# item = "bell_pepper"

# with open(r"C:\Users\looka\OneDrive\Documents\myPhoto\image_download\label_studio\project-2-at-2026-05-21-00-36-b9215f02\classes.txt") as f:
#     content = [line.strip() for line in f.readlines() if line.strip()]
#     labels = [i for i in range(len(content))]
# correct_index = content.index(item)
# print(f"Replacing class index with: {correct_index}")

def labeling(folder_path, correct_index):
    for filename in os.listdir(folder_path):
        if filename.endswith(".txt"):
            filepath = os.path.join(folder_path, filename)
            with open(filepath, "r") as f:
                lines = f.readlines()
            new_lines = []
            for line in lines:
                parts = line.strip().split()
                if parts:
                    # if parts[0] == "0":
                    #     correct_index = content.index(item0)
                    # elif parts[0] == "1":
                    #     correct_index = content.index(item1)
                    # elif parts[0] == "2":
                    #     correct_index = content.index(item2)
                    # elif parts[0] == "3":
                    #     correct_index = content.index(item3)
                    # elif parts[0] == "4":
                    #     correct_index = content.index(item4)
                    parts[0] = str(correct_index)
                    new_lines.append(" ".join(parts) + "\n")
            with open(filepath, "w") as f:
                f.writelines(new_lines)
            print(f"Updated: {filename}")


dataset = ['train', 'validation', 'test']
# items = ["bell_pepper","broccoli", "cabbage", "carrot", "cucumber", 
#          "asparagus", "mushroom", "potato", "pumpkin", "radish", 
#          "squash", "tomato", "zucchini"]
items = ["apple", "banana", "coconut", "grape", "grapefruit", "lemon", "mango", "orange",
         "peach", "pear", "pineapple", "pomegranate", "strawberry", "watermelon"]

items_fish = ["crab", "fish", "lobster", "oyster", "seafood", "shellfish", "shrimp", "squid"]


# items_fastfood = ["bagel", "bread", "burrito", "cake", "cookie", "croissant", "dessert", "doughnut", "fast_food"]

items_fastfood = ["fast_food","french_fries","hamburger","ice_cream","muffin","pancake"
                    ,"pastry"
                    ,"pizza"
                    ,"popcorn"
                    ,"pretzel"
                    ,"sandwich"
                    ,"submarine_sandwich"
                    ,"sushi"
                    ,"taco"
                    ]

items_drinks = ["beer", "coffee", "juice"]

items_dairyProducts = ["cheese", "dairy_product", "milk"]


for item in items_fastfood:
    with open(r"C:\Users\looka\OneDrive\Documents\myPhoto\image_download\label_studio\project-2-at-2026-05-21-00-36-b9215f02\classes.txt") as f:
        content = [line.strip() for line in f.readlines() if line.strip()]
        labels = [i for i in range(len(content))]
    correct_index = content.index(item)
    for ds in dataset:
        folder_path = rf"D:\DATASET\oid_dataset\fastfood\{ds}\{item}\labels"
        labeling(folder_path, correct_index)