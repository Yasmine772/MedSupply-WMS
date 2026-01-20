import {createBrowserRouter, Navigate} from "react-router-dom";
import Signup from "../views/Authentication/Signup.jsx";
import Signin from "../views/Authentication/Signin.jsx";
import Articles from "../views/Articles/Articles.jsx";
import ShowArticle from "../views/Articles/ShowArticle.jsx";
import NotFound from "../views/NotFound.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import Dashboard from "../views/Dashboard.jsx";
import ArticleForm from "../views/Articles/ArticleForm.jsx";



const router = createBrowserRouter([
  {
    path : '/',
    element : <DefaultLayout/>,
    children : [
      {
        path: '/' ,
        element : <Navigate to="/articleList "/>
      },

      {
        path : '/articleList',
        element : <Articles/>
      },
      {
        path : '/showArticle/:id',
        element : <ShowArticle/>
      },
      {
        path : '/articleList',
        element : <Articles/>
      },
      {
        path : '/articleList/create',
        element : <ArticleForm key="userCreate"/>
      },
      {
        path : '/articleList/:id',
        element : <ArticleForm key="userUpdate"/>
      },



    ]
  },
  {
    path: '/',
    element: <GuestLayout/>,
    children: [
      {
        path: '/signup',
        element: <Signup/>
      },
      {
        path: '/signin',
        element: <Signin/>
      }

    ]
  },
  {
    path : '*',
    element : <NotFound/>
  }
]);
export default router;
