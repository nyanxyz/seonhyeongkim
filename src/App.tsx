import { useEffect, useState } from "react";
import { HungarianDance } from "./components/HungarianDance";
import {
  brahmsSpinFrames,
  hungarianGirlFrames,
  hungarianManFrames,
  manConductorFrames,
  redRunningmanFrames,
  runningManFrames,
} from "./constants/frames";

function preloadImages(urls: string[]) {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = url;
        })
    )
  );
}

const imageUrls = [
  "/background-gradient.png",
  "/brahms_frame/brahms_frame.png",
  "/hungarian_man_shadow/hungarian_man_shadow.png",
  "/runningtrack_circle/runningtrack_circle.png",
  brahmsSpinFrames,
  hungarianGirlFrames,
  hungarianManFrames,
  manConductorFrames,
  redRunningmanFrames,
  runningManFrames,
].flat();

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await preloadImages(imageUrls);
      setIsLoaded(true);
    };
    init();
  }, []);

  if (!isLoaded) {
    return null;
  }

  return <HungarianDance />;
}

export default App;
