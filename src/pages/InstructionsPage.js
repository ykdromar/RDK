import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const InstructionsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const subjectInfo = location.state;
  useEffect(() => {
    if (subjectInfo == null) {
      navigate("/");
    }
  });
  return (
    <main className="w-full p-6 pt-16  flex flex-col items-start">
      <span className="text-m font-medium fixed right-6 top-16 ">
        {subjectInfo.id}
      </span>
      <h1 className="text-xl font-bold my-1">Instructions</h1>
      <h2 className="text-m font-semibold my-1">Task overview</h2>
      <ul className="list-disc list-inside my-1">
        <li className="ml-5 ">
          You will be presented with a cross on the screen to
          <strong> fixate your gaze</strong>.
        </li>
        <li className="ml-5 ">
          Then, you’ll see a <strong>Random Dot Kinematogram ( RDK )</strong>.
          Observe the motion of the dots and report the{" "}
          <strong>perceived direction at the end of RDK</strong> using the touch
          interface.
        </li>
        <li className="ml-5 ">
          Once the task ends, You’ll get a circle with an arrow at the centre.
          <strong> Drag and drop the arrow at the circumference</strong> in the
          direction of motion at the end of RDK.
        </li>
      </ul>
      <h2 className="text-m font-semibold my-1">Important Notes</h2>
      <ul className="list-disc list-inside my-1">
        <li className="ml-5">
          Try to respond as accurately as possible based on your perception of
          dot motion.
        </li>
        <li className="ml-5">
          There are no right or wrong answers in this experiment. Your honest
          perception is what we are interested in.
        </li>
        <li className="ml-5">
          Feel free to ask the experimenter for assistance if you have any
          questions or concerns during the experiment.
        </li>
        <li className="ml-5">
          Thank you for your participation! Your contribution is greatly
          appreciated. If you're ready, tap the 'Begin' button to start the
          experiment.
        </li>
      </ul>
      <button
        className="btn btn-active btn-neutral m-auto mt-10"
        onClick={() => {
          navigate("/new-experiment/experiment", { state: subjectInfo });
        }}
      >
        Begin
      </button>
    </main>
  );
};
