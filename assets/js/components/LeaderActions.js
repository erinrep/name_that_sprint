import React, { useContext, useState } from "react"
import { Button, FormLabel, FormControlLabel, Paper, Radio, RadioGroup, Stack } from "@mui/material"

const LeaderActions = ({
  ideas,
  votingMode,
  setVotingMode,
  declareWinner
}) => {
  return (
    <form>
      <Paper sx={{
        padding: "16px"
      }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <FormLabel id="mode-label">Mode</FormLabel>
            <RadioGroup
              aria-labelledby="mode-label"
              name="mode"
            >
              <FormControlLabel
                value="entry"
                control={
                  <Radio checked={!votingMode} onChange={(ev) => {
                    ev.preventDefault()
                    setVotingMode(false)
                  }} />
                }
                label="Entry Mode" />
              <FormControlLabel
                value="voting"
                control={
                  <Radio checked={votingMode} onChange={(ev) => {
                    ev.preventDefault()
                    setVotingMode(true)
                  }} />
                } 
                label="Voting Mode" />
            </RadioGroup>
          </Stack>
          {!!ideas.find(idea => idea.votes.length) && (
            <Button variant="contained" onClick={(ev) => {
              ev.preventDefault()
              declareWinner()
            }}>Declare Winner</Button>
          )}
        </Stack>
      </Paper>
    </form>
  )
}

export default LeaderActions
