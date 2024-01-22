import os
from flask import Flask,request,jsonify
from joblib import load
import json
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


app = Flask(__name__)

base_dir = os.path.abspath(os.path.dirname(__file__))
final_rating_model_path = os.path.join(base_dir, 'models/rank_based', 'final_rating_model.joblib')
final_rating_model = load(final_rating_model_path)
# Load collaborative filtering model components
# final_ratings_matrix = pd.read_pickle('C:/Users/Admin/Desktop/AI-Powered-Customer-Personalization-Platform/backend/final_ratings_matrix.pkl')
pkl_file_path = os.path.join(base_dir, 'final_ratings_matrix.pkl')
final_ratings_matrix = pd.read_pickle(pkl_file_path)
U_model_path = os.path.join(base_dir, 'model_based', 'U.joblib')
Ul = load(U_model_path)
sigma_model_path = os.path.join(base_dir, 'model_based', 'sigma.joblib')
sigma = load(sigma_model_path)
Vt_model_path = os.path.join(base_dir, 'model_based', 'Vt.joblib')
Vt = load(Vt_model_path)



@app.route('/rank-based', methods=['GET'])
def recommend_products():
    recommended_products = list(top_n_products(final_rating_model, 5, 50))

    # Save JSON recommendations to a file in a specific folder
    # save_json_to_folder(recommended_products, 'C:/Users/Admin/Desktop/AI-Powered-Customer-Personalization-Platform/frontend/src/json/rank_based_data.json')

    return jsonify({'recommendations': recommended_products})

# Endpoint to get recommendations
@app.route('/user-based', methods=['GET'])
def get_recommendations():
    try:
        # Get user_index from the request
        

        # Use collaborative filtering model to get recommendations
        recommended_products = recommendations(3, 5, final_ratings_matrix)

        # Return recommendations as JSON response
        return jsonify({'recommendations': recommended_products})

    except Exception as e:
        return jsonify({'error': str(e)})
@app.route('/model-based', methods=['GET'])
def recommend():
    try:
        # Get user input (you might need to adjust this based on your input format)
        user_index = 3
        num_recommendations =5

        # Generate recommendations using the loaded model
        all_user_predicted_ratings = np.dot(np.dot(Ul, sigma), Vt)
        preds_df = pd.DataFrame(abs(all_user_predicted_ratings))

        # Get recommendations for the specified user_index
        user_predictions = preds_df.iloc[user_index, :]
        recommended_products = user_predictions.sort_values(ascending=False).head(num_recommendations).index.tolist()

        # Return recommendations as JSON
        response = {'user_index': user_index, 'recommendations': recommended_products}
        return jsonify(response)

    except Exception as e:
        return jsonify({'error': str(e)})

#defining a function to get the top n products based on highest average rating and minimum interactions
def top_n_products(final_rating, n, min_interaction):

    #Finding products with minimum number of interactions
    recommendations = final_rating[final_rating['rating_count']>min_interaction]

    #Sorting values w.r.t average rating
    recommendations = recommendations.sort_values('avg_rating',ascending=False)

    return recommendations.index[:n]
def recommendations(user_index, num_of_products, interactions_matrix):

    #Saving similar users using the function similar_users defined above
    most_similar_users = similar_users(user_index, interactions_matrix)[0]

    #Finding product IDs with which the user_id has interacted
    prod_ids = set(list(interactions_matrix.columns[np.where(interactions_matrix.loc[user_index] > 0)]))
    recommendations = []

    observed_interactions = prod_ids.copy()
    for similar_user in most_similar_users:
        if len(recommendations) < num_of_products:

            #Finding 'n' products which have been rated by similar users but not by the user_id
            similar_user_prod_ids = set(list(interactions_matrix.columns[np.where(interactions_matrix.loc[similar_user] > 0)]))
            recommendations.extend(list(similar_user_prod_ids.difference(observed_interactions)))
            observed_interactions = observed_interactions.union(similar_user_prod_ids)
        else:
            break

    return recommendations[:num_of_products]
# defining a function to get similar users
def similar_users(user_index, interactions_matrix):
    similarity = []
    for user in range(0, interactions_matrix.shape[0]): #  .shape[0] gives number of rows

        #finding cosine similarity between the user_id and each user
        sim = cosine_similarity([interactions_matrix.loc[user_index]], [interactions_matrix.loc[user]])

        #Appending the user and the corresponding similarity score with user_id as a tuple
        similarity.append((user,sim))

    similarity.sort(key=lambda x: x[1], reverse=True)
    most_similar_users = [tup[0] for tup in similarity] #Extract the user from each tuple in the sorted list
    similarity_score = [tup[1] for tup in similarity] ##Extracting the similarity score from each tuple in the sorted list

    #Remove the original user and its similarity score and keep only other similar users
    most_similar_users.remove(user_index)
    similarity_score.remove(similarity_score[0])

    return most_similar_users, similarity_score

# Function to save JSON data to a file in a specified folder
def save_json_to_folder(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file)

if __name__ == '__main__':
    app.run(debug=True)
