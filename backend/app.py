import os
from flask import Flask,request,jsonify
from joblib import load
import json
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from flask_cors import CORS
from scipy.sparse import csr_matrix


app = Flask(__name__)
CORS(app)

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
df_path= os.path.join(base_dir, 'model_based', 'df_final_aggregated')
df=pd.read_csv(df_path)


all_user_predicted_ratings = np.dot(np.dot(Ul, sigma), Vt)
preds_matrix = csr_matrix(all_user_predicted_ratings)




@app.route('/api/rank-based', methods=['GET'])
def recommend_products():
    recommended_products = list(top_n_products(final_rating_model, 5, 50))

    return jsonify({'recommendations': recommended_products})

# Endpoint to get recommendations
@app.route('/api/user-based', methods=['GET'])
def get_recommendations():
    try:
        
        recommended_products = recommendations(3, 5, final_ratings_matrix)

        # Return recommendations as JSON response
        return jsonify({'recommendations': recommended_products})

    except Exception as e:
        return jsonify({'error': str(e)})
@app.route('/api/model-based', methods=['GET'])
def recommend():
    try:
        user_index = 10
        recommendations = recommend_items(user_index, preds_matrix, num_recommendations=5, original_df=df)
        return jsonify({'recommendations': recommendations})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
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
# Recommendation function
def recommend_items(user_index, preds_matrix, num_recommendations, original_df):
    # Get the user's ratings from the predicted interaction matrix
    user_predictions = preds_matrix[user_index, :].toarray().reshape(-1)

    # Creating a DataFrame with predicted ratings
    temp = pd.DataFrame({'user_predictions': user_predictions})

    # Filtering the DataFrame where the user has not interacted with the product
    temp = temp[temp.user_predictions > 0]

    # Recommending products with top predicted ratings
    temp = temp.sort_values('user_predictions', ascending=False)

    # Take the top num_recommendations products
    top_recommendations = temp.head(num_recommendations)

    # Return the recommended product indices
    recommended_product_indices = top_recommendations.index.tolist()

    # Retrieve actual product IDs from the original DataFrame
    actual_product_ids = original_df.loc[original_df.index.isin(recommended_product_indices), 'prod_id'].tolist()

    return actual_product_ids

# Function to save JSON data to a file in a specified folder
def save_json_to_folder(data, file_path):
    with open(file_path, 'w') as file:
        json.dump(data, file)

if __name__ == '__main__':
    app.run(debug=True)
