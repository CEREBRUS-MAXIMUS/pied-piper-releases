import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import axios from "axios";

export default function Hero() {
  const [downloadFunction, setDownloadFunction] = useState(() => {});
  const [osName, setOsName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getReleases = async () => {
    try {
      return await axios.get(
        "https://api.github.com/repos/CEREBRUS-MAXIMUS/Second-Releases/releases"
      );
    } catch (error) {
      console.error(`Error getting releases: ${error}`);
    }
  };

  const getLatestArmMacRelease = async () => {
    setIsLoading(true);
    try {
      const releases = await getReleases();
      const macReleases = releases.data
        .filter((release) =>
          release.assets.some((asset) => asset.name.includes("arm64.dmg"))
        )
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      if (macReleases.length)
        window.location.href = macReleases[0].assets.find((asset) =>
          asset.name.includes("arm64.dmg")
        ).browser_download_url;
    } catch (error) {
      console.error(`Error getting latest Arm Mac release: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestIntelMacRelease = async () => {
    setIsLoading(true);
    try {
      const releases = await getReleases();
      const macReleases = releases.data
        .filter((release) =>
          release.assets.some((asset) => asset.name.includes(".dmg") && !asset.name.includes("arm64.dmg"))
        )
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      if (macReleases.length)
        window.location.href = macReleases[0].assets.find((asset) =>
          asset.name.includes(".dmg") && !asset.name.includes("arm64.dmg")
        ).browser_download_url;
    } catch (error) {
      console.error(`Error getting latest Intel Mac release: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getLatestWindowsRelease = async () => {
    setIsLoading(true);
    try {
      const releases = await getReleases();
      const windowsReleases = releases.data
        .filter((release) =>
          release.assets.some((asset) => asset.name.includes(".exe"))
        )
        .sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
      if (windowsReleases.length)
        window.location.href = windowsReleases[0].assets.find((asset) =>
          asset.name.includes(".exe")
        ).browser_download_url;
    } catch (error) {
      console.error(`Error getting latest Windows release: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();

    if (userAgent.indexOf("win") > -1) {
      setDownloadFunction(() => getLatestWindowsRelease);
      setOsName("Windows");
    } else if (userAgent.indexOf("mac") > -1) {
      if (platform === "macintosh" || platform === "macintel") {
        setDownloadFunction(() => getLatestIntelMacRelease);
        setOsName("Mac (Intel)");
      } else if (platform === "arm" || platform === "arm64") {
        setDownloadFunction(() => getLatestArmMacRelease);
        setOsName("Mac (Apple Silicon)");
      }
    } else {
      setDownloadFunction(() => () => window.location.href = "https://github.com/CEREBRUS-MAXIMUS/Second-Releases/releases/latest");
      setOsName("your device");
    }
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/kZvzZul4rA8?autoplay=1&mute=1&controls=0&loop=1&playlist=kZvzZul4rA8&showinfo=0&rel=0&modestbranding=1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2"
            title="Background video"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-20 text-center px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 text-white">
          A web browser that fills out your forms automatically
        </h1>
        <p className="text-xl sm:text-2xl mb-8 text-gray-200">
          Authenticated, Local, Lightning-fast, Private webscraping
        </p>
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex items-center"
            onClick={downloadFunction}
            disabled={isLoading}
          >
            {isLoading ? "Fetching..." : `Download for ${osName}`} <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center space-x-4 p-4 text-sm text-white z-20">
        <a href="#" className="hover:text-primary transition-colors">Full Demo</a>
        <a href="#" className="hover:text-primary transition-colors">Discord</a>
        <a href="#" className="hover:text-primary transition-colors">API Docs</a>
      </div>
    </section>
  );
}