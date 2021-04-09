print("Training AI...")

import csv
import numpy as np
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier, plot_tree, _tree

# Set up the data
data = np.genfromtxt('data.tsv', delimiter="\t", skip_header=1)
feature_names = ['minIncome', 'maxIncome', 'minExpenses', 'maxExpenses', 'averageIncome', 'averageExpenses', 'averageNet']
class_names = ['low', 'med', 'high', 'vhigh']

# Train the AI
clf = DecisionTreeClassifier(max_depth=6).fit(data[:,:-1], data[:,-1])

# Export as a PDF
plot_tree(clf, filled=True, feature_names=feature_names, class_names=class_names)
plt.savefig('classifier.pdf', bbox_inches="tight", pad_inches=0.4)

# Export as a JavaScript function
# Derived from https://stackoverflow.com/a/39772170
def tree_to_js(tree, feature_names, class_names):
    tree_ = tree.tree_
    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]
    f = open("classifier.js", "w")
    f.write("const classify = ({{ {} }}) => {{\n".format(", ".join(feature_names)))
    def recurse(node, depth):
        indent = "  " * depth
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]
            f.write("{}if ({} <= {}) {{\n".format(indent, name, threshold))
            recurse(tree_.children_left[node], depth + 1)
            f.write("{}}} else {{ // if {} > {}\n".format(indent, name, threshold))
            recurse(tree_.children_right[node], depth + 1)
            f.write("{}}}\n".format(indent))
        else:
            value = tree_.value[node][0]
            f.write("{}return '{}'\n".format(indent, class_names[value.argmax()]))
    recurse(0, 1)
    f.write("}\n")
    f.close()
tree_to_js(clf, feature_names, class_names)

print("AI ready. See classifier.pdf and classifier.js")