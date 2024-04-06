import React from "react";

export const InstructionsPage = ({ next }) => {
  return (
    <main className="flex flex-col items-start w-8/12 pb-5">
      <h1 className="text-xl font-bold my-1">Instructions</h1>
      <p className="my-1">
        Welcome to the Random Dot Kinematogram (RDK) Experiment! Your
        participation is invaluable in helping us understand how individuals
        perceive motion direction. Please carefully read and follow the
        instructions below.
      </p>
      <h2 className="text-m font-semibold my-1">Task overview</h2>
      <p className="my-1">
        In this experiment, you will be presented with a series of random dot
        patterns on the screen. Your task is to observe the motion of the dots
        and report the perceived final direction using the touch interface on
        the iPad.
      </p>
      <h2 className="text-m font-semibold my-1">Preparation</h2>
      <p className="my-1">
        Ensure that you are in a quiet environment with minimal distractions.
        Sit comfortably in front of the iPad screen.
      </p>
      <h2 className="text-m font-semibold my-1">Experiment Start</h2>
      <p className="my-1">
        Once you're ready, start the experiment by tapping the 'Begin' button on
        the screen.
      </p>
      <h2 className="text-m font-semibold my-1">Dot Motion Observation</h2>
      <ul className="list-disc list-inside my-1">
        <li className="ml-5 ">
          You will see a series of random dot patterns displayed on the screen.
        </li>
        <li className="ml-5 ">
          During the first half of each trial, the dots will move consistently
          towards a certain direction and then may change.
        </li>
        <li className="ml-5 ">
          Pay close attention to the motion direction of the dots.
        </li>
      </ul>
      <h2 className="text-m font-semibold my-1">Direction Report</h2>
      <ul className="list-disc list-inside my-1">
        <li className="ml-5 ">
          After the dots stop moving, a circular dial will appear at the center
          of the screen.
        </li>
        <li className="ml-5">
          Touch and drag from the center of the dial towards the direction that
          you perceive the dots to have moved in the second half of the trial.
        </li>
        <li className="ml-5">
          The direction you drag your finger on the dial represents your
          perceived final direction of motion.
        </li>
        <li className="ml-5">
          <strong>Trial Completion:</strong> Once you've selected your perceived
          final direction, release your touch on the dial.
        </li>
        <li className="ml-5">
          The trial will end, and the next trial will begin shortly.
        </li>
        <li className="ml-5">
          <strong>Repeat:</strong> The experiment consists of 400 trials each of
          1s so the total time would be 400s(~7 minutes) each with different dot
          motion patterns.Repeat steps 3 to 5 for each trial until the
          experiment is completed.
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
          If you have any questions or concerns during the experiment, feel free
          to ask the experimenter for assistance.
        </li>
        <li className="ml-5">
          Thank you for your participation! Your contribution is greatly
          appreciated. If you're ready to begin, tap the 'Begin' button to start
          the experiment.
        </li>
      </ul>
      <button className="btn btn-active btn-neutral m-auto" onClick={next}>
        Begin
      </button>
    </main>
  );
};
