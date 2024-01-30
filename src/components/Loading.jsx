import { Html, Loader, useProgress } from "@react-three/drei";

export const Loading1 = () => {
  <Loader />;
  //   const { active, progress, errors, item, loaded, total } = useProgress();
  //   console.log(progress)
  //   return (
  //     <Html center className="loading">
  //       {progress} % loaded
  //     </Html>
  //   );
};

const Loading = () => {
  return (
    <Html>
      <div className="flex justify-center items-center">
        <div className="w-20 h-20 border-2 border-opacity-20 border-blue-500 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </Html>
  );
};

export default Loading;
