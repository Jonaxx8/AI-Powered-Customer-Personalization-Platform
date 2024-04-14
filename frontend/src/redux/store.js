import { configureStore } from '@reduxjs/toolkit';
import { recommendationReducer } from './reducer/recommendationReducer';


const store = configureStore({
    reducer: {
        // Add your reducers here
        userPreferences: recommendationReducer,
    },
});

export default store;