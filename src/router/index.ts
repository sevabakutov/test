import Tokens from "../pages/Tokens";

import FormsPage from "../pages/forms/index";

import TraidingComponent from "../pages/forms/traiding/Traiding";

import Profile from "../pages/profile/Profile";
import TradingItemPage from "../pages/traiding_item/TradingItemPage";

// import TraidingComponent from "../pages/forms/traiding/Traiding";

// import AltCoin from "../pages/forms/AltCoin";
// import TraidingIdeaItem from "../pages/TradingItemPage";
// import Crowdfunding from "../pages/forms/Crowdfunding";

// import Followers from "../pages/profile/Followers";

export const routes = [
  { path: "/", component: Tokens, exact: true },
  {
    path: "/create-idea",
    component: FormsPage,
    exact: true,
    props: {
      TraidingComponent: TraidingComponent,
    },
  },
  { path: "/profile", component: Profile, exact: true },
  { path: "/traidings/:id", component: TradingItemPage, exact: true },
];
