import { useEffect, useState } from "react";
import { PicAPI } from "./Api/PicReqs";
import { PicDto } from "./Dto/picDto";

function App() {
  const [respPics, setRespPics] = useState<PicDto[]>([]);

  const fetchAndSetPics = async () => {
    setRespPics(await PicAPI.getAllPics());
  };

  useEffect(() => {
    fetchAndSetPics();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      {respPics.map((pic, picIndex) => (
        <div key={picIndex}>
          <h1>{pic.title}</h1>
          <img
            src={`data:${pic.picture_file.contentType};base64,${pic.picture_file.data}`}
            alt=""
          />
        </div>
      ))}
    </div>
  );
}

export default App;
