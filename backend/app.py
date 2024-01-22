from flask import Flask, jsonify
import joblib
import os
import json

# Get the absolute path to the current directory
#current_directory = os.path.abspath(os.path.dirname(__file__))
#model_path = os.path.join(current_directory, 'top_products_model.joblib')


app = Flask(__name__)

#change the file path of final_rating_model.joblib
final_rating_model = joblib.load('D:/react/AI-Powered-Customer-Personalization-Platform/backend/rank_based/final_rating_model.joblib') 

@app.route('/', methods=['GET'])
def recommend_products():
    recommended_products = list(top_n_products(final_rating_model, 5, 50))

    # Save JSON recommendations to a file in a specific folder
    save_json_to_folder(recommended_products, 'D:/react/AI-Powered-Customer-Personalization-Platform/frontend/src/json/rank_based_data.json')

    return jsonify({'recommendations': recommended_products})

#defining a function to get the top n products based on highest average rating and minimum interactions
def top_n_products(final_rating, n, min_interaction):

    #Finding products with minimum number of interactions
    recommendations = final_rating[final_rating['rating_count']>min_interaction]

    #Sorting values w.r.t average rating
    recommendations = recommendations.sort_values('avg_rating',ascending=False)

    return recommendations.index[:n]

# Function to save JSON data to a file in a specified folder
def save_json_to_folder(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file)

if __name__ == '__main__':
    app.run(debug=True)
