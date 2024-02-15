import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Ballot from "../../components/Ballot";
import GoogleSSO from "../../components/GoogleSSO";
import { ballots } from "../../utils/constants";
import { voteAPIs } from "../../api/vote";
import { withUser } from "../../utils/auth";
import { getToken } from "../../utils/jwt";

interface Vote {
  ballot1: boolean;
  ballot2: boolean;
  ballot3: boolean;
}

const VotingPage = () => {
  const [voteSubmited, setVoteSubmitted] = useState(false);
  const [ballotVotes, setBallotVotes] = useState<{ [key: string]: boolean }>(
    {}
  );

  // Update the vote state
  const handleVote = (ballotId: string, option: "yes" | "no") => {
    setBallotVotes((prevState) => {
      const updatedVotes = { ...prevState };
      updatedVotes[ballotId] = option === "yes";
      return updatedVotes;
    });
  };

  // Fetch votes from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const votes = await voteAPIs.getVotes();
        const data = JSON.parse(votes.data["ballots"][0].value);
        if (data) {
          setVoteSubmitted(true);
        }
        setBallotVotes(data);
      } catch (error) {
        console.log("Error fetching votes", error);
      }
    };
    fetchData();
  }, [voteSubmited]);

  // Save votes to the database
  const handleSave = async () => {
    const data: { ballots: Vote } = {
      ballots: {
        ballot1: ballotVotes.ballot1,
        ballot2: ballotVotes.ballot2,
        ballot3: ballotVotes.ballot3,
      },
    };

    try {
      await voteAPIs.postVotes(data);
      setVoteSubmitted(true);
    } catch (error) {
      console.log("Error saving votes", error);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4 text-black">Voting Page</h1>
        <p className="mb-4 text-black">
          Cast your vote for the following ballot propositions:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ballots?.map((ballot, index) => (
            <Ballot
              key={index}
              handleVote={handleVote}
              ballotVotes={ballotVotes}
              voteSubmited={voteSubmited}
              title={ballot.title}
              options={ballot.options}
              ballot={ballot.ballot_no}
              ballot_no={ballot.ballot_no}
              description={ballot.description}
            />
          ))}
        </div>
        <button
          onClick={handleSave}
          className={`mt-4 ${
            voteSubmited ? "bg-gray-500" : "bg-blue-500 hover:bg-blue-700"
          } text-white font-bold py-2 px-4 rounded`}
          disabled={voteSubmited}
        >
          Submit
        </button>
        {!getToken() && (
          <>
            <p className="text-black">You are not logged in</p> <GoogleSSO />
          </>
        )}
      </div>
    </div>
  );
};

export default withUser(VotingPage);
