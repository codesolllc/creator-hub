import { userSlice } from "./Reducers/UserReducer.js";
import { postSlice } from "./Reducers/PostReducer.js";
import { gigsSlice } from "./Reducers/GigsReducer.js";
import { commentsSlice } from "./Reducers/CommentsReducer.js";
import { product_Category_Slice } from "./Reducers/Product_CategoryReducer.js";
import { ReviewSlice } from "./Reducers/ReviewReducer.js";
import { RatingsSlice } from "./Reducers/RatingsReducer.js";
import { UserCategoriesSlice } from "./Reducers/UserCategoriesReducer.js";
import { productSlice } from "./Reducers/ProductReducer.js";
import { requestSlice } from "./Reducers/Request.js";
import { chatSlice } from "./Reducers/Chat.js";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { communitySlice } from "./Reducers/CommunityReducer.js";
import { bookmarkSlice } from "./Reducers/BookMarkedReducer.js";
import { notificationSlice } from "./Reducers/Notification.js";
import { hireSlice } from "./Reducers/HireReducer.js";

const store = configureStore({
  reducer: {
    [userSlice.reducerPath]: userSlice.reducer,
    [postSlice.reducerPath]: postSlice.reducer,
    [gigsSlice.reducerPath]: gigsSlice.reducer,
    [commentsSlice.reducerPath]: commentsSlice.reducer,
    [product_Category_Slice.reducerPath]: product_Category_Slice.reducer,
    [ReviewSlice.reducerPath]: ReviewSlice.reducer,
    [RatingsSlice.reducerPath]: RatingsSlice.reducer,
    [UserCategoriesSlice.reducerPath]: UserCategoriesSlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [chatSlice.reducerPath]: chatSlice.reducer,
    [requestSlice.reducerPath]: requestSlice.reducer,
    [communitySlice.reducerPath]: communitySlice.reducer,
    [bookmarkSlice.reducerPath]: bookmarkSlice.reducer,
    [notificationSlice.reducerPath]: notificationSlice.reducer,
    [hireSlice.reducerPath]: hireSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
      .concat(userSlice.middleware)
      .concat(commentsSlice.middleware)
      .concat(postSlice.middleware)
      .concat(gigsSlice.middleware)
      .concat(requestSlice.middleware)
      .concat(chatSlice.middleware)
      .concat(product_Category_Slice.middleware)
      .concat(ReviewSlice.middleware)
      .concat(RatingsSlice.middleware)
      .concat(productSlice.middleware)
      .concat(UserCategoriesSlice.middleware)
      .concat(bookmarkSlice.middleware)
      .concat(communitySlice.middleware)
      .concat(hireSlice.middleware)
      .concat(notificationSlice.middleware),
});

setupListeners(store.dispatch);

export default store;
