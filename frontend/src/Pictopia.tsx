import Grid from "./Picture/Grids/Grid";
import Header from "./Menus/Header";
  
function App() {
  return (
    <div className="min-h-screen flex flex-col space-y-3 bg-soft-black">
      <Header />
      <Grid />
    </div>
  );
}

export default App;
