import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Login from "./screens/Authentications/Login.js";
import SignUp from "./screens/Authentications/SignUp.js";
import Twowaybuttons from "./screens/Authentications/Twowaybuttons";
import CategorySelection from "./screens/Authentications/CategorySelection";
import ForgotPass from "./screens/Authentications/ForgotPass";
import EmailVerification from "./screens/Authentications/EmailVerification";
import Newpass from "./screens/Authentications/Newpass";
import BtabNavigation from "./TabNavigation/BtabNavigation.js";
import SignUpCreator from "./screens/Authentications/SignUpCreator.js";
import Edit_accounts from "./screens/Accounts/Edit_accounts.js";
import UploadGig from "./screens/Gigs/UploadGig.js";
import Buy from "./screens/Buy/Buy.js";
import Sell from "./screens/Sell/Sell.js";
import UplaodRetal from "./screens/Rental/UplaodRetal.js";
import Notification from "./screens/Notification/Notification.js";
import MyNetwork from "./screens/MyNetwork/MyNetwork.js";
import MyProfile from "./screens/MyProfile/MyProfile.js";
import Chats from "./screens/Chats/Chats.js";
import ProfileDetails from "./screens/MyProfile/ProfileDetails.js";
import CategoryListing from "./screens/CategoryListing/CategoryListing.js";
import UserListingCards from "./screens/UserListing/UserListingCards.js";
import SinglePost from "./screens/SinnglePost/SinglePost.js";
import SingleChat from "./screens/Chats/SingleChat.js";
import GigsListings from "./screens/Gigs/GigsListings.js";
import SingleGigShow from "./screens/Gigs/SingleGigShow.js";
import Accounts from "./screens/Accounts/Accounts.js";
import GetStarted from "./screens/Splashscreens/GetStarted";
import ProductListing from "./screens/ProductListing/ProductListing.js";
import SingleProduct from "./screens/SingeProduct/SingleProduct.js";
import Checkout from "./screens/Checkout/Checkout.js";
import Thankyou from "./screens/Thankyou/Thankyou.js";
import ProductCatogories from "./screens/ProductCategories/ProductCategories.js";
import HireCreator from "./screens/HireCreator/HireCreator.js";
import HiringCheckout from "./screens/HiringCheckout/HiringCheckout.js";
import GigApplicants from "./screens/Gigs/GigApplicants.js";
import ChatsRequests from "./screens/Chats/ChatsRequests.js";
import UpdateSingleProduct from "./components/UpdateSingleProduct/UpdateSingleProduct.js";
import ProductUpdateModal from "./components/ProductUpdateModal/ProductUpdateModal.js";
import MyProducts from "./screens/UserProfile/UserProfile.js";
import CreatorProfile from "./screens/CreatorProfile/CreatorProfile.js";
import CreatorProfileDetails from "./screens/CreatorProfile/CreatorProfileDetails.js";
import UserProfile from "./screens/UserProfile/UserProfile.js";
import SingleUserProfile from "./screens/SingleUserProfile/SingleUserProfile.js";
import BookMarked from "./screens/Bookmarked/BookMarked.js";
import Verification from "./screens/Verification/Verification.js";
import VerifiedUserCheckout from "./screens/Checkout/VerifiedUserCheckout.js";
import VerifyThankyou from "./screens/Thankyou/VerifyThankyou.js";
import SoldProdcutListing from "./screens/ProductListing/SoldProdcutListing.js";
import RecommendedUsers from "./screens/UserListing/RecommendedUsers.js";
import VerifiedUsers from "./screens/UserListing/VerifiedUsers.js";
import Proposals from "./screens/Proposals/Proposals.js";
import SingleProposal from "./screens/SingleProposal.js/SingleProposal.js";
import Quotation from "./screens/Quotation/Quotation.js";
import QuotationListPage from "./screens/QuotationListpage/QuotationListpage.js";
import ProposalsQuotations from "./screens/ProposalsQuotations/ProposalsQuotations.js";
import SingleQuotation from "./screens/SingleQuotation/SingleQuotation.js";
import QuotationCheckout from "./screens/Checkout/QuotationCheckout.js";
import QuotationThankyou from "./screens/Thankyou/QuotationThankyou.js";
import AcceptedProposals from "./screens/AcceptedProposals/AcceptedQuotation.js";
import AcceptedQuotationCreator from "./screens/AcceptedQuotationCreator.js/AcceptedQuotationCreator.js";
import MyQuotations from "./screens/MyQuotations/MyQuotations.js";

const RootNavigation = (props) => {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const transitionConfig = {
    animation: "spring",
    config: {
      stiffness: 500,
      damping: 50,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName={"Btabs"}
        initialRouteName={props.initRoute}
        screenOptions={{
          ...screenOptions,
          transitionSpec: {
            open: transitionConfig,
            close: transitionConfig,
          },
        }}
      >
        <Stack.Screen
          name="getstarted"
          component={GetStarted}
          options={{ title: "getstarted" }}
        />
    
        <Stack.Screen
          name="Btabs"
          component={BtabNavigation}
          options={{ title: "Btabs" }}
        />
        <Stack.Screen
          name="Accounts"
          component={Accounts}
          options={{ title: "Accounts" }}
        />
        <Stack.Screen
          name="Edit_accounts"
          component={Edit_accounts}
          options={{ title: "Edit_accounts" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login" }}
        />
        <Stack.Screen
          name="CategoryListing"
          component={CategoryListing}
          options={{ title: "CategoryListing" }}
        />
        <Stack.Screen
          name="UplaodRetal"
          component={UplaodRetal}
          options={{ title: "UplaodRetal" }}
        />
        <Stack.Screen
          name="SinglePost"
          component={SinglePost}
          options={{ title: "SinglePost" }}
        />
        <Stack.Screen 
          name="Buy"
          component={Buy} 
          options={{ title: "Buy" }} 
        />
        <Stack.Screen
          name="Sell"
          component={Sell}
          options={{ title: "Sell" }}
        />
        <Stack.Screen
          name="UploadGig"
          component={UploadGig}
          options={{ title: "UploadGig" }}
        />
        <Stack.Screen
          name="GigsListings"
          component={GigsListings}
          options={{ title: "GigsListings" }}
        />
        <Stack.Screen
          name="QuotationListPage"
          component={QuotationListPage}
          options={{ title: "QuotationListPage" }}
        />
        <Stack.Screen
          name="Proposals"
          component={Proposals}
          options={{ title: "Proposals" }}
        />
        <Stack.Screen
          name="MyQuotations"
          component={MyQuotations}
          options={{ title: "MyQuotations" }}
        />
        <Stack.Screen
          name="SingleGigShow"
          component={SingleGigShow}
          options={{ title: "SingleGigShow" }}
        />
        <Stack.Screen
          name="SingleProposal"
          component={SingleProposal}
          options={{ title: "SingleProposal" }}
        />
        <Stack.Screen
          name="Quotation"
          component={Quotation}
          options={{ title: "Quotation" }}
        />
        <Stack.Screen
          name="SingleQuotation"
          component={SingleQuotation}
          options={{ title: "SingleQuotation" }}
        />
        <Stack.Screen
          name="QuotationCheckout"
          component={QuotationCheckout}
          options={{ title: "QuotationCheckout" }}
        />
        <Stack.Screen
          name="ProposalsQuotations"
          component={ProposalsQuotations}
          options={{ title: "ProposalsQuotations" }}
        />
        <Stack.Screen
          name="AcceptedQuotation"
          component={AcceptedProposals}
          options={{ title: "AcceptedQuotation" }}
        />
        <Stack.Screen
          name="AcceptedQuotationCreator"
          component={AcceptedQuotationCreator}
          options={{ title: "AcceptedQuotationCreator" }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ title: "Notification" }}
        />
        <Stack.Screen
          name="MyProfile"
          component={MyProfile}
          options={{ title: "MyProfile" }}
        />
        <Stack.Screen
          name="ProfileDetails"
          component={ProfileDetails}
          options={{ title: "ProfileDetails" }}
        />
        <Stack.Screen
          name="MyNetwork"
          component={MyNetwork}
          options={{ title: "MyNetwork" }}
        />
        <Stack.Screen
          name="Chats"
          component={Chats}
          options={{ title: "Chats" }}
        />
        <Stack.Screen
          name="ChatsRequests"
          component={ChatsRequests}
          options={{ title: "ChatsRequests" }}
        />
        <Stack.Screen
          name="SingleChat"
          component={SingleChat}
          options={{ title: "SingleChat" }}
        />
        <Stack.Screen
          name="UserListingCards"
          component={UserListingCards}
          options={{ title: "UserListingCards" }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: "SignUp" }}
        />
        <Stack.Screen
          name="Signupcreator"
          component={SignUpCreator}
          options={{ title: "Signupcreator" }}
        />
        <Stack.Screen
          name="twowaybuttons"
          component={Twowaybuttons}
          options={{ title: "twowaybuttons" }}
        />
        <Stack.Screen
          name="categoryselection"
          component={CategorySelection}
          options={{ title: "categoryselection" }}
        />
        <Stack.Screen
          name="forgotpass"
          component={ForgotPass}
          options={{ title: "forgotpass" }}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{ title: "EmailVerification" }}
        />
        <Stack.Screen
          name="newpass"
          component={Newpass}
          options={{ title: "newpass" }}
        />
        <Stack.Screen
          name="productcategories"
          component={ProductCatogories}
          options={{ title: "productcategories" }}
        />
        <Stack.Screen
          name="productListing"
          component={ProductListing}
          options={{ title: "productListing" }}
        />
        <Stack.Screen
          name="singleProduct"
          component={SingleProduct}
          options={{ title: "singleProduct" }}
        />
        <Stack.Screen
          name="checkout"
          component={Checkout}
          options={{ title: "checkout" }}
        />
       
        <Stack.Screen
          name="verifyusercheckout"
          component={VerifiedUserCheckout}
          options={{ title: "verifyusercheckout" }}
        />
        <Stack.Screen
          name="thankyou"
          component={Thankyou}
          options={{ title: "thankyou" }}
        />
        <Stack.Screen
          name="QuotationThankyou"
          component={QuotationThankyou}
          options={{ title: "QuotationThankyou" }}
        />
        <Stack.Screen
          name="verifythankyou"
          component={VerifyThankyou}
          options={{ title: "thankyou" }}
        />
        <Stack.Screen
          name="hireCreator"
          component={HireCreator}
          options={{ title: "hireCreator" }}
        />
        <Stack.Screen
          name="hiringCheckout"
          component={HiringCheckout}
          options={{ title: "hiringCheckout" }}
        />
        <Stack.Screen
          name="gigApplicants"
          component={GigApplicants}
          options={{ title: "gigApplicants" }}
        />
        <Stack.Screen
          name="updateSingleProduct"
          component={UpdateSingleProduct}
          options={{ title: "updateSingleProduct" }}
        />
        <Stack.Screen
          name="updateSingleModal"
          component={ProductUpdateModal}
          options={{ title: "updateSingleModal" }}
        />
        <Stack.Screen
          name="CreatorProfile"
          component={CreatorProfile}
          options={{ title: "CreatorProfile" }}
        />
        <Stack.Screen
          name="CreatorProfileDetails"
          component={CreatorProfileDetails}
          options={{ title: "CreatorProfileDetails" }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={{ title: "UserProfile" }}
        />
        <Stack.Screen
          name="SingleUserProfile"
          component={SingleUserProfile}
          options={{ title: "SingleUserProfile" }}
        />
        <Stack.Screen
          name="BookMarked"
          component={BookMarked}
          options={{ title: "BookMarked" }}
        />
        <Stack.Screen
          name="VarificationApply"
          component={Verification}
          options={{ title: "VarificationApply" }}
        />
        <Stack.Screen
          name="SoldProdcutListing"
          component={SoldProdcutListing}
          options={{ title: "SoldProdcutListing" }}
        />
        <Stack.Screen
          name="RecommendedUsers"
          component={RecommendedUsers}
          options={{ title: "RecommendedUsers" }}
        />
        <Stack.Screen
          name="VerifiedUsers"
          component={VerifiedUsers}
          options={{ title: "VerifiedUsers" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
