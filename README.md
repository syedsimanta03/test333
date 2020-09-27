**Description:** Social Network APP Where With Blogging 



#### #Reactjs #MongoDB #Expressjs #Nodejs





**To Install Packages:**

npm install 

**To Start The App:**

npm run dev
```
├─ .gitignore = ignore some files when push to github
├─ app.js = main file where server and database connection code lives
├─ client = front end files
│  ├─ .gitignore = ignore some files when push to github
│  ├─ package-lock.json = tracking packages
│  ├─ package.json = packages list and script
│  ├─ public
│  │  ├─ favicon.ico = tab icon
│  │  ├─ index.html = main html file
│  │  ├─ logo192.png = logo
│  │  ├─ logo512.png = logo
│  │  ├─ manifest.json = web browser setting
│  │  └─ robots.txt = search engine file
│  ├─ README.md
│  └─ src
│     ├─ App.css = style file
│     ├─ App.js = main UI contains other UI
│     │     ├─ auth = authentication file for users
│     │  ├─ index.js = sign in sign features
│     │  └─ PrivateRoute.js = private path block for not loggedin user
│     ├─ core
│     │  ├─ About.js = page
│     │  ├─ Home.js= page
│     │  └─ Menu.= page
│     │  └─ Menu.js 
│     ├─ images
│     │  ├─ a2.jpg = image
│     │  ├─ avatar.png = image
│     │  ├─ hare-4093851__340.jpg= image
│     │  ├─ love-699480__340.jpg= image
│     │  ├─ post.jpg= image
│     │  └─ yellow_nice_flowers_avatar_picture_82909.jpg= image
│     ├─ index.css = style css
│     ├─ index.js = react render file
│     ├─ logo.svg = logo
│     ├─ MainRouter.js = routing
│     ├─ post
│     │  ├─ apiPost.js = api call post
│     │  ├─ Comment.js = comment 
│     │  ├─ DeleteComment.js = delete comment 
│     │  ├─ DeletePost.js = delete post
│     │  ├─ EditPost.js = edit post
│     │  ├─ NewPost.js = new post 
│     │  ├─ post.css = post style
│     │  ├─ Posts.js = all posts page UI
│     │  └─ SinglePost.js =  one post UI
│     
│     
│     └─ user
│        ├─ apiUser.js = api call for user
│        ├─ DeleteProfile.js = delete user
│        ├─ EditProfile.js = edit user profile
│        ├─ FollowProfileButton.js = follow user
│        ├─ Profile.js = Profile UI
│        ├─ ProfileTabs.js = profile tabs UI
│        ├─ Signin.js = sign in form
│        ├─ Signup.js = sign up form
│        ├─ UnauthProfile.js = not loggedin user profile
│        └─ Users.js = all users card
├─ controllers 
│  ├─ auth.js = authentication api logic
│  ├─ post.js = post api logic
│  └─ user.js= user api logic
├─ helpers 
│  └─ index.js = validation logic for posts & users
├─ models
│  ├─ Post.js = post DB model
│  └─ User.js = user DB model
├─ package-lock.json = packages tracker
├─ package.json = package list and script
└─ routes
   ├─ auth.js = api route for auth
   ├─ post.js = api route for post 
   └─ user.js = api route for user

```