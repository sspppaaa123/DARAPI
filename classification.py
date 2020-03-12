import pandas as pd
from sklearn.svm import LinearSVC
from sklearn.model_selection import train_test_split
from pymongo import MongoClient
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier 
from sklearn.ensemble import AdaBoostClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

       
def main(collection,imp_features,target,inputType):
    client = MongoClient("mongodb://127.0.0.1:27017") #host uri  
    db = client["test"]   #Select the database  
    col = db[collection]  #Select the collection
    data = pd.DataFrame(list(col.find()))
    data.drop(data.columns[[0]], axis = 1, inplace = True) 
    df=data
    cat_features = []

    for key in inputType:
        if(inputType[key]=="1"):
            if(key!=target):
                cat_features.append(key)


    df = pd.get_dummies(df, columns=cat_features, drop_first=True)

    sc= StandardScaler()
    pca = PCA()
    
    X = pd.DataFrame()
    y = pd.DataFrame()
    result = pd.DataFrame(columns=['Test_Score'])
 
    X = df[imp_features]
    print(X.columns)

    y[target] = data[target]

    X_train, X_test, y_train, y_test = train_test_split(X, y,test_size=0.1, random_state = 0)

    #Applying StandardScaler on it
    X_train = sc.fit_transform(X_train)
    X_test = sc.transform(X_test)

    #Applying PCA on it
    X_train = pca.fit_transform(X_train)
    X_test = pca.transform(X_test)
    
    #Linear Support Vector Classifier
    print("Linear Support Vector Classifier")
    svc = LinearSVC(max_iter= 1000, C = 70)
    svc.fit(X_train,y_train)
    print("Test set score: {:.2f}".format(svc.score(X_test, y_test)))
    result.at['Linear_SVM']=svc.score(X_test, y_test)
    
    #RandomForest Classifier
    print("RandomForest Classifier")
    rf = RandomForestClassifier(n_estimators= 20, criterion = 'entropy', random_state = 0)
    rf.fit(X_train,y_train)
    print("Test set score: {:.2f}".format(rf.score(X_test, y_test)))
    result.at['Randomforest']=rf.score(X_test, y_test)
    
    #DecisionTree Classifier
    print("DecisionTree Classifier")
    clf_gini = DecisionTreeClassifier(criterion = "gini", random_state = 100,max_depth=3, min_samples_leaf=5) 
    clf_gini.fit(X_train, y_train) 
    print("Test set score: {:.2f}".format(clf_gini.score(X_test, y_test)))
    result.at['DecisionTree']=clf_gini.score(X_test, y_test)
    
    #Adaptive Gradient Boosting Classifier
    print("Adaptive Gradient Boosting Classifier")
    abc = AdaBoostClassifier(n_estimators=50,learning_rate=1)
    model = abc.fit(X_train, y_train)
    print("Test set score: {:.2f}".format(model.score(X_test, y_test)))
    result.at['Adaptive_GB']=model.score(X_test, y_test)

    return result



    








