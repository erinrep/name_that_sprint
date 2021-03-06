const errorCodes = {
  duplicateIdea: "duplicate_name",
  gameAlreadyStarted: "game_already_started",
  gameNotFound: "game_not_found",
  ideaNotFound: "idea_not_found",
  nameInUse: "name_in_use",
  noIdeas: "no_ideas",
  noVotesLeft: "no_votes_left",
  timeout: "timeout",
  voteNotFound: "vote_not_found"
}

const prettyError = (errorCode) => {
  switch (errorCode) {
    case errorCodes.duplicateIdea: return "That idea has already been submitted."
    case errorCodes.gameAlreadyStarted: return "Game already started."
    case errorCodes.gameNotFound: return "Game does not exist."
    case errorCodes.ideaNotFound: return "That idea doesn't even exist!"
    case errorCodes.nameInUse: return "User name taken."
    case errorCodes.noIdeas: return "No ideas have been submitted."
    case errorCodes.noVotesLeft: return "You are out of votes."
    case errorCodes.timeout: return "Your request timed out."
    case errorCodes.voteNotFound: return "You haven't voted for that idea."
    default: return "Unknown error."
  }
}

const maybeAddAnS = (word, num) => {
  if (num === 1) {
    return word
  }
  return `${word}s`
}

export {
  errorCodes,
  maybeAddAnS,
  prettyError
}