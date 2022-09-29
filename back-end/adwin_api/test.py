import numpy as np
import matplotlib.pyplot as plt


class Box:
    def __init__(self, number: int, item: int):
        self.number: int = number
        self.item: int = item

    def __repr__(self):
        return f"{self.number} -> {self.item}"


class Prisoner:
    def __init__(self, number: int):
        self.number: int = number
        self.open_count: int = 0

    def find(self, boxes: list[Box], box: Box):
        self.open_count += 1
        # print(f"{self.open_count}: 박스 {box.number} 열었음 열어보니 {box.item} 임")
        if self.number == box.item:
            # return print(f"{box.item} 찾았으니 {box.number} 닫음")
            return self.open_count
        return self.find(boxes=boxes, box=boxes[box.item - 1])


def run_test(count: int):
    n = 0
    cases = np.array([])
    while n < count:
        numbers = list(range(1, 101))
        items = list(range(1, 101))
        np.random.shuffle(items)
        boxes = [Box(number=number, item=item) for number, item in zip(numbers, items)]
        prisoners = [Prisoner(number=number) for number in range(1, 101)]
        np.random.shuffle(prisoners)
        test_array = np.array(
            [prisoner.find(boxes=boxes, box=boxes[prisoner.number - 1])
             for prisoner in prisoners])
        test_array = test_array < 50
        unique = np.unique(test_array, return_counts=True)
        case = dict(zip(unique[0], unique[1]))
        np.append([], [(case[True] / 100)])
        n += 1
    return cases
    # print(cases.count(True) / cases.count(False))


print(run_test(1000))
# print(np.count(cases, True))
# print(cases.count(True) / cases.count(False))
