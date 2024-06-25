import "./App.css";
import ImageGallery from "./components/ImageGallery";
import DeleteButton from "./components/DeleteButton";

function App() {
  return (
    <>
      <h1>Image Gallery</h1>

      <div className="card">
        {/* <DeleteButton /> */}
        {/* <Image /> */}
        <ImageGallery />
        {/* <button onClick={onDelete}>Delete</button> */}
      </div>
    </>
  );
}

export default App;
