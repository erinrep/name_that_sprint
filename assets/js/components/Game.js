import React, { useContext, useEffect, useState } from "react"
import { GameChannelContext } from "../contexts/GameChannel"
import { maybeAddAnS } from "../helpers"
import LeaderActions from "./LeaderActions"
import {
  Box,
  Button,
  Chip,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Toolbar,
  Typography
} from "@mui/material"
import PersonIcon from "@mui/icons-material/Person"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import HowToRegIcon from "@mui/icons-material/HowToReg"
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents"
import SettingsDrawerContext from "../contexts/SettingsDrawer"
import PhoenixLogo from "./PhoenixLogo"

const MAX_VOTES = 3

const Game = () => {
  const [idea, setIdea] = useState("")
  const { 
    userName,
    sendIdea,
    topic = "",
    players,
    ideas = [],
    votingMode,
    sendVote,
    getSuggestion,
    winner
  } = useContext(GameChannelContext)
  const { mobileOpen, setToggleVisibility, toggleDrawer } = useContext(SettingsDrawerContext)
  const roomCode = topic.split(":")[1]
  const drawerWidth = 240
  const playerVotes = getPlayerVotes(players, ideas)
  const votesRemaining = MAX_VOTES - playerVotes[userName]

  useEffect(() => {
    setToggleVisibility(true)

    return () => {
      setToggleVisibility(false)
    }
  }, [])

  return (
    <Box sx={{ display: "flex" }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Container maxWidth="sm" sx={{ marginLeft: { "sm": `${drawerWidth}px`, "xs": "0px" }}}>
          <Toolbar />
          <Stack spacing={2}>
            <Typography variant="h5" component="h2">
              Room Code: {roomCode}
            </Typography>

            {winner ? (
              <Box>
                <Typography variant="h4" component="h3">Results</Typography>
                <List>
                  {ideas
                    .sort((a, b) => b.votes.length - a.votes.length)
                    .map(({name, votes}, index) => {
                      const numVotes = votes.length
                      return (
                        <ListItem 
                          key={name}
                        >
                          {index === 0 && (
                            <ListItemIcon>
                              <EmojiEventsIcon color="secondary" fontSize="large" />
                            </ListItemIcon>
                          )}
                          
                          <ListItemText
                            inset={index !== 0}
                            primary={<Typography variant="h6" component="span">{name}</Typography>}
                            secondary={<>{numVotes} {maybeAddAnS("vote", numVotes)}</>}
                          />
                        </ListItem>
                      )
                    })}
                </List>
              </Box>
            ) : (
              <>
                <Box>
                  {votingMode ? (
                    <p>Vote for your favorites! You have {votesRemaining} {maybeAddAnS("vote", votesRemaining)} remaining.</p>
                  ) : (
                    <>
                      <p>
                        Submit ideas for the name of the sprint.
                      </p>
                      <form onSubmit={(ev) => {
                        ev.preventDefault()
                        sendIdea(idea)
                        setIdea("")
                      }}>
                        <Stack spacing={2}>
                          <TextField
                            id="idea"
                            label="idea"
                            variant="outlined"
                            value={idea}
                            onChange={(ev) => {
                              setIdea(ev.currentTarget.value)
                            }}
                            required
                          />
                          <Button variant="contained" type="submit">Submit Idea</Button>
                          <Button variant="outlined" onClick={() => {
                            getSuggestion((suggestion) => {
                              setIdea(suggestion)
                            })
                          }}>Get Suggestion</Button>
                        </Stack>
                      </form>
                    </> 
                  )}
                </Box>
                <Box>
                  <Typography variant="h4" component="h3">Ideas</Typography>
                  <List>
                    {ideas.map(({name, votes}) => {
                      return (
                        <ListItem 
                          key={name}
                          secondaryAction={votingMode ?
                            <>
                              {votes.includes(userName) && 
                                <IconButton edge="end" aria-label={`Remove vote for ${name}`} onClick={() => sendVote(name, false)}>
                                  < RemoveCircleOutlineIcon />
                                </IconButton>}
                              <IconButton edge="end" aria-label={`Add vote for ${name}`} onClick={() => sendVote(name)}>
                                <AddCircleOutlineIcon />
                              </IconButton>
                            </> : null
                          }
                        >
                          <ListItemIcon>
                            <LightbulbIcon color="secondary" fontSize="large" />
                          </ListItemIcon>
                          <ListItemText
                            disableTypography
                            primary={<Typography aria-hidden="true" variant="h6" component="span">{name}</Typography>}
                            secondary={
                              <List sx={{
                                display: "flex",
                                padding: "0px",
                                flexWrap: "wrap"
                              }}>
                                {votes.map((user, index) => (
                                  <ListItem 
                                    key={`${name}:${user}:${index}`}
                                    sx={{
                                      width: "auto",
                                      padding: "0 0 5px 5px"
                                  }}>
                                    <Chip key={`${name}:${user}:${index}`} label={user} color="primary" size="small" />
                                  </ListItem>
                                ))}
                              </List>}/>
                        </ListItem>
                      )
                    })}
                  </List>
                </Box>
              </>
            )}
          </Stack>
        </Container>
      </Box>
      <Drawer
        anchor="left"
        open={mobileOpen}
        ModalProps={{
          keepMounted: true,
        }}
        onClose={toggleDrawer}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <GameSettings/>
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "block" },
          ["& .MuiDrawer-paper"]: { width: drawerWidth, boxSizing: "border-box" },
        }}
      >
        <GameSettings/>
      </Drawer>
    </Box>
  )
}

const getPlayerVotes = (players, ideas) => {
  return players.reduce((map, player) => {
    map[player] = ideas.reduce((total, current) => {
      const votes = current.votes.filter(name => name === player).length
      return total += votes
    }, 0)
    return map
  }, {})
}

const GameSettings = () => {
  const { 
    players = [],
    ideas = [],
    userName,
    leader,
    votingMode,
    setVotingMode,
    declareWinner,
    winner
  } = useContext(GameChannelContext)
  const playerVotes = getPlayerVotes(players, ideas)

  return (
    <>
      <Toolbar />
      <Box sx={{ overflow: "auto",  bgcolor: "action.selected", padding: "20px" }}>
        <Stack spacing={2}>
          <Typography variant="h5" component="h3">Players</Typography>
          <Paper>
            <List>
              {players.map((player) => {
                const voted = playerVotes[player] >= MAX_VOTES
                return (
                  <ListItem key={player}>
                    <ListItemIcon>
                      {voted ? <HowToRegIcon color="secondary"/> : <PersonIcon color="secondary" />}
                    </ListItemIcon>
                    <ListItemText
                      sx={{overflowWrap: "break-word"}}
                      primary={player === leader ? `${player} (leader)` : player} />
                    {voted && <span className="sr-only">has voted</span>}
                  </ListItem>
                )
              })}
            </List>
          </Paper>
          {leader === userName &&
            <>
              <Typography variant="h5" component="h3">Settings</Typography>
              {!winner && <LeaderActions
                ideas={ideas}
                votingMode={votingMode}
                setVotingMode={setVotingMode}
                declareWinner={declareWinner}
              />}
            </> 
          }
          <PhoenixLogo />
        </Stack>
      </Box>
    </>
  )
}

export default Game
