import router from "./Secondary.routes.js";

const MainRoutes = (app) =>{
app.use("/api",router)
} 

export default MainRoutes;