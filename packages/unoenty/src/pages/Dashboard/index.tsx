import React, { useState, ReactElement } from "react"
import { useHistory, Link } from "react-router-dom"
import { Grid, Typography, Button } from "@material-ui/core"

import { Game } from "@uno-game/protocols"

import useDidMount from "@/hooks/useDidMount"
import useSocket from "@/hooks/useSocket"

import api from "@/services/api"

import { Divider, LoadingComponent } from "@/components"

import GameItem from "@/pages/Dashboard/GameItem"

import useStyles from "@/pages/Dashboard/styles"

import GameListSkeleton from "@/skeletons/GameList"

const Dashboard = (): ReactElement => {
	const [games, setGames] = useState<Game[]>([])

	const [loadingCreateGame, setLoadingCreateGame] = useState(false)
	const [loadingGetGames, setLoadingGetGames] = useState(true)

	const history = useHistory()
	const classes = useStyles()

	const socket = useSocket()

	const handleCreateNewGame = async () => {
		setLoadingCreateGame(true)

		const game = await socket.createGame()

		setLoadingCreateGame(false)

		history.push(`/${game.id}`)
	}

	const getGameList = async () => {
		const { data } = await api.get("/games")

		setGames(data.games)

		setLoadingGetGames(false)
	}

	useDidMount(() => {
		getGameList()
	})

	return (
		<LoadingComponent loading={loadingGetGames} customLoadingElement={<GameListSkeleton />}>
			<Grid
				container
				className={classes.container}
			>
				<Grid
					container
					alignItems="center"
					justify="flex-start"
				>
					<Typography
						variant="h1"
						color="textSecondary"
					>
						Games
					</Typography>

					<Divider orientation="vertical" size={5} />

					<Button
						variant="contained"
						color="primary"
						onClick={handleCreateNewGame}
						disabled={loadingCreateGame}
					>
						CREATE NEW GAME
					</Button>

					<Divider orientation="horizontal" size={4} />

					<Grid
						container
						wrap="wrap"
					>
						{games.map(game => (
							<Button
								{...({
									component: Link,
									to: `/${game.id}`,
								})}
							>
								<GameItem
									key={game.id}
									gameId={game.id}
									name={game.title}
									players={game.players}
									status={game.status}
									maxPlayers={game.maxPlayers}
								/>
							</Button>
						))}
					</Grid>
				</Grid>
			</Grid>
		</LoadingComponent>
	)
}

export default Dashboard
