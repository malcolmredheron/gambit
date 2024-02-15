import { useState } from "react";

interface BallotProps {
  handleVote: (ballotId: string, option: "yes" | "no") => void;
  ballot: any;
  title: string;
  description: string;
  options: string[];
  ballotVotes: { [key: string]: boolean };
  ballot_no: string;
  voteSubmited: boolean;
}

const Ballot = (props: BallotProps) => {
  const {
    handleVote,
    ballot,
    title,
    description,
    options,
    ballotVotes,
    ballot_no,
    voteSubmited,
  } = props;
  const [yesChecked, setYesChecked] = useState(false);
  const [noChecked, setNoChecked] = useState(false);

  const handleYesChange = () => {
    setYesChecked(true);
    setNoChecked(false);
    handleVote(ballot, "yes");
  };

  const handleNoChange = () => {
    setYesChecked(false);
    setNoChecked(true);
    handleVote(ballot, "no");
  };

  const yesDisabled =
    voteSubmited || ballotVotes[ballot_no] == true || yesChecked || noChecked;

  const noDisabled =
    voteSubmited || ballotVotes[ballot_no] == false || yesChecked || noChecked;

  return (
    <div className="bg-slate-300 rounded-lg shadow-md p-4">
      <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">Options:</p>
          <ul className="mt-2">
            {options.map((option, index) => (
              <li key={index} className="text-sm">
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <label className="flex items-center mr-4">
          <input
            type="checkbox"
            checked={
              ballotVotes[ballot_no] == true
                ? ballotVotes[ballot_no]
                : yesChecked
            }
            onChange={handleYesChange}
            className="mr-2"
            disabled={yesDisabled}
          />
          <span>Yes</span>
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={ballotVotes[ballot_no] == false ? true : noChecked}
            onChange={handleNoChange}
            className="mr-2"
            disabled={noDisabled}
          />
          <span>No</span>
        </label>
      </div>
    </div>
  );
};

export default Ballot;
